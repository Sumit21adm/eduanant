#!/usr/bin/env node
/**
 * Works out the version number for a website release, and writes its release notes.
 *
 *   node scripts/next-version.mjs [--bump auto|patch|minor|major] [--version v1.2.3]
 *                                 [--github-output FILE] [--notes FILE]
 *
 * Why this exists. The deploy workflow used to take its version from a pushed tag, then
 * from a box on the "Run workflow" form, then from package.json. Releases are made with
 * the button and the box is left empty, so every deploy since April was stamped
 * "v1.0.0" — the number package.json has carried since the first commit — and no tag
 * or GitHub Release was ever created. The footer was reporting what it was told.
 *
 * Now the button works the number out. The latest release tag is the base, and the
 * commits since it decide the bump, using the conventional-commit prefixes this
 * repository already writes:
 *
 *     breaking change  (`feat!:` or a BREAKING CHANGE: line)   -> major
 *     feat                                                     -> minor
 *     anything else (fix, chore, refactor, docs, ...)          -> patch
 *
 * The tag is the only source of truth: nothing is committed back to the repository, and
 * package.json's version is not consulted. With no tag at all the base is BASELINE, the
 * number the site has displayed since April, so the first release is a deliberate step up
 * from it rather than a repeat of it.
 *
 * Re-running on a commit that is already released reuses its version and publishes
 * nothing, so a redeploy cannot invent a number for code that has one.
 *
 * It uses git and node built-ins only, so the workflow needs no install step.
 */
import { execFileSync } from 'node:child_process';
import { appendFileSync, writeFileSync } from 'node:fs';

/** Strict: v1.2.3. Pre-releases ("v1.2.3-rc1") and short forms ("v2") are not releases. */
const SEMVER = /^v(\d+)\.(\d+)\.(\d+)$/;

/** What the footer has said since April; the base when there is no release tag yet. */
const BASELINE = 'v1.0.0';

/** GitHub caps a release body at 125,000 characters; this stays far below it. */
const MAX_NOTES = 60;

function fail(message) {
    // ::error:: surfaces on the run's summary page, not only buried in the log.
    console.error(process.env.GITHUB_ACTIONS ? `::error title=Release version::${message}` : `next-version: ${message}`);
    process.exit(1);
}

function parseArgs(argv) {
    const args = { bump: 'auto', version: '', githubOutput: '', notes: '' };
    for (let i = 0; i < argv.length; i++) {
        const flag = argv[i];
        const value = () => {
            const v = argv[i + 1];
            if (v === undefined || v.startsWith('--')) fail(`${flag} needs a value`);
            i++;
            return v;
        };
        if (flag === '--bump') args.bump = value();
        else if (flag === '--version') args.version = value();
        else if (flag === '--github-output') args.githubOutput = value();
        else if (flag === '--notes') args.notes = value();
        else fail(`unknown option ${flag}`);
    }
    if (!['auto', 'patch', 'minor', 'major'].includes(args.bump)) {
        fail(`--bump must be auto, patch, minor or major (got "${args.bump}")`);
    }
    return args;
}

const git = (...args) =>
    execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

const parse = (tag) => {
    const m = SEMVER.exec(tag);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
};
const compare = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
const format = ([major, minor, patch]) => `v${major}.${minor}.${patch}`;

/** Numeric, not alphabetical: v1.10.0 is newer than v1.9.0. */
function releaseTags(rev) {
    return git('tag', '--merged', rev, '--list', 'v*')
        .split('\n')
        .filter((t) => parse(t))
        .sort((a, b) => compare(parse(b), parse(a)));
}

/**
 * Releases newer than this commit: tags whose commit contains it. releaseTags() cannot
 * answer this, because it only sees tags reachable *from* the commit — so redeploying an
 * old commit after v1.4.0 exists would look like a repository with no releases at all,
 * and be numbered v1.1.0. A release at the commit itself does not count.
 */
const releasesNewerThan = (head) =>
    git('tag', '--contains', head, '--list', 'v*')
        .split('\n')
        .filter((t) => parse(t) && tagCommit(t) !== head);

const tagExists = (tag) => git('tag', '--list', tag) === tag;
/** Dereferences annotated tags, so lightweight and annotated ones compare alike. */
const tagCommit = (tag) => git('rev-list', '-n', '1', tag);

function normalise(version) {
    const m = /^v?(\d+)\.(\d+)\.(\d+)$/.exec(version.trim());
    if (!m) fail(`"${version}" is not a version. Use the form v1.2.3.`);
    return `v${m[1]}.${m[2]}.${m[3]}`;
}

const HEADER = /^(\w+)(?:\(([^)]+)\))?(!)?:\s+(.+)$/;

function commitsSince(base, head) {
    const range = base ? `${base}..${head}` : head;
    const raw = git('log', '--no-merges', '--format=%H%x1f%s%x1f%b%x1e', range);
    return raw
        .split('\x1e')
        .map((record) => record.trim())
        .filter(Boolean)
        .map((record) => {
            const [sha, subject, body = ''] = record.split('\x1f');
            const m = HEADER.exec(subject);
            return {
                sha,
                subject,
                body,
                type: m ? m[1].toLowerCase() : '',
                scope: m ? m[2] || '' : '',
                description: m ? m[4] : subject,
                breaking: Boolean(m && m[3]) || /^BREAKING[ -]CHANGE:/m.test(body),
            };
        });
}

function autoBump(commits) {
    if (commits.some((c) => c.breaking)) return 'major';
    if (commits.some((c) => c.type === 'feat')) return 'minor';
    return 'patch';
}

function bump(from, kind) {
    const [major, minor, patch] = from;
    if (kind === 'major') return [major + 1, 0, 0];
    if (kind === 'minor') return [major, minor + 1, 0];
    return [major, minor, patch + 1];
}

function buildNotes({ commits, base, version, repo }) {
    const shown = commits.slice(0, MAX_NOTES); // git log is newest first
    const groups = { 'Breaking changes': [], Features: [], Fixes: [], 'Other changes': [] };
    for (const c of shown) {
        const group = c.breaking ? 'Breaking changes'
            : c.type === 'feat' ? 'Features'
                : c.type === 'fix' ? 'Fixes'
                    : 'Other changes';
        const text = c.type && c.scope ? `**${c.scope}:** ${c.description}` : c.description;
        groups[group].push(`- ${text} (\`${c.sha.slice(0, 7)}\`)`);
    }

    const lines = [base ? `## What's changed since ${base}` : '## First tracked release', ''];
    for (const [name, items] of Object.entries(groups)) {
        if (items.length) lines.push(`### ${name}`, ...items, '');
    }
    if (commits.length > shown.length) lines.push(`…and ${commits.length - shown.length} earlier changes.`, '');
    if (repo && base) lines.push(`**Full changelog:** https://github.com/${repo}/compare/${base}...${version}`);
    return lines.join('\n').trimEnd() + '\n';
}

function main() {
    const args = parseArgs(process.argv.slice(2));
    const ref = process.env.GITHUB_REF || '';
    const pushedTag = ref.startsWith('refs/tags/') ? ref.slice('refs/tags/'.length) : '';
    const repo = process.env.GITHUB_REPOSITORY || '';
    const head = git('rev-parse', 'HEAD');

    let version;
    let base;
    let commits;
    let release = true;
    let why;

    if (pushedTag) {
        // Someone tagged a release by hand: that name is the version, whatever it is.
        version = pushedTag;
        const mine = parse(pushedTag);
        base = releaseTags(head).find((t) => t !== pushedTag && (!mine || compare(parse(t), mine) < 0)) ?? null;
        commits = commitsSince(base, head);
        why = `pushed tag ${pushedTag}`;
    } else {
        const latest = releaseTags(head)[0] ?? null;
        base = latest;
        commits = commitsSince(latest, head);

        if (args.version) {
            version = normalise(args.version);
            if (tagExists(version)) {
                if (tagCommit(version) !== head) {
                    fail(`${version} already exists and points at a different commit (${tagCommit(version).slice(0, 7)}). Choose another version.`);
                }
                release = false;
                why = `${version} is already released at this commit`;
            } else {
                why = 'version given explicitly';
            }
        } else if (latest && tagCommit(latest) === head) {
            version = latest;
            release = false;
            commits = [];
            why = `this commit is already released as ${latest}, so there is nothing new to number`;
        } else if (releasesNewerThan(head).length) {
            fail(`this commit is older than ${releasesNewerThan(head)[0]}, which is already released. Numbering it would put old code after newer code. Pass an explicit version to release it anyway.`);
        } else if (latest && commits.length === 0) {
            fail(`there is nothing to release since ${latest}. Pass an explicit version to release it anyway.`);
        } else {
            const kind = args.bump === 'auto' ? autoBump(commits) : args.bump;
            version = format(bump(parse(latest ?? BASELINE), kind));
            if (tagExists(version)) {
                fail(`${version} already exists on another branch. Pass an explicit version.`);
            }
            const feats = commits.filter((c) => c.type === 'feat').length;
            why = `${kind} bump from ${latest ?? `${BASELINE} (baseline, no release tag yet)`}` +
                (args.bump === 'auto' ? ` — ${feats} feature${feats === 1 ? '' : 's'} in ${commits.length} commit${commits.length === 1 ? '' : 's'}` : ' — chosen explicitly');
        }
    }

    const notes = buildNotes({ commits, base, version, repo });
    if (args.notes) writeFileSync(args.notes, notes);
    if (args.githubOutput) {
        appendFileSync(args.githubOutput, [
            `version=${version}`,
            `previous=${base ?? ''}`,
            `release=${release}`,
            `commits=${commits.length}`,
        ].join('\n') + '\n');
    }

    console.log([
        `version   ${version}`,
        `previous  ${base ?? '(none)'}`,
        `commits   ${commits.length}`,
        `publish   ${release ? 'yes — tag and GitHub Release after the deploy succeeds' : 'no'}`,
        `why       ${why}`,
    ].join('\n'));
}

main();
