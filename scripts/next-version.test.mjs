/**
 * Tests for scripts/next-version.mjs.   node --test scripts/next-version.test.mjs
 *
 * Each test builds a throwaway git repository in the temp directory — this suite never
 * reads or writes the real repo or its tags — so the rules are demonstrated against real
 * `git log` and `git tag` output rather than against a mock of them. They are the written
 * form of the numbering rules; change a rule and change its test with it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const SCRIPT = resolve('scripts/next-version.mjs');

function repo() {
    const dir = mkdtempSync(join(tmpdir(), 'next-version-'));
    const git = (...args) => execFileSync(
        'git',
        ['-c', 'user.name=t', '-c', 'user.email=t@example.com', '-c', 'commit.gpgsign=false', '-c', 'tag.gpgsign=false', ...args],
        { cwd: dir, encoding: 'utf8' },
    ).trim();
    git('init', '-q', '-b', 'main');
    let n = 0;
    return {
        git,
        commit(subject, body = '') {
            writeFileSync(join(dir, 'f.txt'), String(++n));
            git('add', '.');
            git('commit', '-q', '-m', body ? `${subject}\n\n${body}` : subject);
        },
        tag: (name) => git('tag', name),
        /** Runs the script; returns what it wrote to GITHUB_OUTPUT and the notes file. */
        run(args = [], env = {}) {
            const out = join(dir, 'gh-output.txt');
            const notes = join(dir, 'notes.md');
            writeFileSync(out, '');
            const r = spawnSync('node', [SCRIPT, '--github-output', out, '--notes', notes, ...args], {
                cwd: dir, encoding: 'utf8', env: { ...process.env, GITHUB_REF: '', GITHUB_REPOSITORY: '', ...env },
            });
            const outputs = Object.fromEntries(readFileSync(out, 'utf8').split('\n').filter(Boolean).map((l) => l.split(/=(.*)/s).slice(0, 2)));
            let text = '';
            try { text = readFileSync(notes, 'utf8'); } catch { /* the script failed before writing */ }
            return { status: r.status, stderr: r.stderr, stdout: r.stdout, ...outputs, notes: text };
        },
    };
}

test('no tags yet: starts from the baseline and steps up, rather than repeating v1.0.0', () => {
    const r = repo();
    r.commit('chore: scaffold');
    r.commit('feat(pricing): a slider');
    const out = r.run();
    assert.equal(out.version, 'v1.1.0');
    assert.equal(out.release, 'true');
    assert.equal(out.previous, '');
});

test('only fixes since the last release: a patch', () => {
    const r = repo();
    r.commit('feat: first');
    r.tag('v1.1.0');
    r.commit('fix(seo): a favicon');
    r.commit('chore: tidy');
    assert.equal(r.run().version, 'v1.1.1');
});

test('a feature since the last release: a minor, and the patch resets', () => {
    const r = repo();
    r.commit('feat: first');
    r.tag('v1.1.4');
    r.commit('fix: one');
    r.commit('feat(logo): the real logo');
    assert.equal(r.run().version, 'v1.2.0');
});

test('a breaking change: a major, by "!" or by a BREAKING CHANGE line', () => {
    const a = repo();
    a.commit('feat: first'); a.tag('v1.2.3'); a.commit('feat(api)!: drop the old form');
    assert.equal(a.run().version, 'v2.0.0');

    const b = repo();
    b.commit('feat: first'); b.tag('v1.2.3');
    b.commit('refactor: rework pricing', 'It reads differently now.\n\nBREAKING CHANGE: the rate table moved.');
    assert.equal(b.run().version, 'v2.0.0');
});

test('versions are compared as numbers: v1.10.0 is newer than v1.9.0', () => {
    const r = repo();
    r.commit('feat: a'); r.tag('v1.9.0');
    r.commit('feat: b'); r.tag('v1.10.0');
    r.commit('fix: c');
    assert.equal(r.run().version, 'v1.10.1');
});

test('tags that are not releases are ignored', () => {
    const r = repo();
    r.commit('feat: a'); r.tag('v1.2.0');
    r.commit('fix: b');
    r.tag('v9.0.0-rc1'); r.tag('v2'); r.tag('test-v8.0.0'); r.tag('v3.0');
    assert.equal(r.run().version, 'v1.2.1');
});

test('annotated tags work as well as lightweight ones', () => {
    const r = repo();
    r.commit('feat: a');
    r.git('tag', '-a', 'v1.0.5', '-m', 'release');
    r.commit('fix: b');
    assert.equal(r.run().version, 'v1.0.6');
});

test('re-running on a commit that is already released reuses its version and publishes nothing', () => {
    const r = repo();
    r.commit('feat: a'); r.tag('v1.3.0');
    const out = r.run();
    assert.equal(out.version, 'v1.3.0');
    assert.equal(out.release, 'false');
});

test('an older commit than the latest release is refused rather than given a bogus higher number', () => {
    const r = repo();
    r.commit('feat: a');
    const old = r.git('rev-parse', 'HEAD');
    r.commit('feat: b'); r.tag('v1.4.0');
    r.git('checkout', '-q', old);
    const out = r.run();
    assert.notEqual(out.status, 0);
    assert.match(out.stderr, /older than v1\.4\.0/);
});

test('--bump overrides the commits', () => {
    const r = repo();
    r.commit('feat: a'); r.tag('v1.2.0');
    r.commit('fix: b');
    assert.equal(r.run(['--bump', 'minor']).version, 'v1.3.0');
    assert.equal(r.run(['--bump', 'major']).version, 'v2.0.0');
    assert.equal(r.run(['--bump', 'patch']).version, 'v1.2.1');
});

test('an explicit version is used, with or without the v', () => {
    const r = repo();
    r.commit('feat: a'); r.tag('v1.2.0');
    r.commit('fix: b');
    assert.equal(r.run(['--version', '3.1.4']).version, 'v3.1.4');
    assert.equal(r.run(['--version', 'v3.1.4']).version, 'v3.1.4');
});

test('an explicit version that already belongs to another commit is refused', () => {
    const r = repo();
    r.commit('feat: a'); r.tag('v1.2.0');
    r.commit('fix: b');
    const out = r.run(['--version', 'v1.2.0']);
    assert.notEqual(out.status, 0);
    assert.match(out.stderr, /already exists/);
});

test('a malformed version is refused, and shell metacharacters in it never reach a shell', () => {
    const r = repo();
    r.commit('feat: a');
    for (const bad of ['banana', '1.2', 'v1.2.3; touch /tmp/pwned-by-next-version', '$(id)']) {
        const out = r.run(['--version', bad]);
        assert.notEqual(out.status, 0, `"${bad}" should have been refused`);
        assert.match(out.stderr, /not a version/);
    }
});

test('a pushed tag is the version; the base is the release before it', () => {
    const r = repo();
    r.commit('feat: a'); r.tag('v1.1.0');
    r.commit('fix: b');
    r.commit('feat: c');
    r.tag('v1.2.0');
    const out = r.run([], { GITHUB_REF: 'refs/tags/v1.2.0' });
    assert.equal(out.version, 'v1.2.0');
    assert.equal(out.previous, 'v1.1.0');
    assert.equal(out.commits, '2');
});

test('notes group by type, name the scope, and link the full changelog', () => {
    const r = repo();
    r.commit('feat: a'); r.tag('v1.0.0');
    r.commit('feat(logo): use the official logo');
    r.commit('fix(seo): a square favicon');
    r.commit('chore: tidy the lockfile');
    const out = r.run([], { GITHUB_REPOSITORY: 'someone/repo' });
    assert.match(out.notes, /## What's changed since v1\.0\.0/);
    assert.match(out.notes, /### Features\n- \*\*logo:\*\* use the official logo/);
    assert.match(out.notes, /### Fixes\n- \*\*seo:\*\* a square favicon/);
    assert.match(out.notes, /### Other changes\n- tidy the lockfile/);
    assert.match(out.notes, /compare\/v1\.0\.0\.\.\.v1\.1\.0/);
});

test('a long history is capped, newest first, and says how much it left out', () => {
    const r = repo();
    for (let i = 1; i <= 75; i++) r.commit(`fix: change ${i}`);
    const out = r.run();
    assert.match(out.notes, /change 75/);
    assert.doesNotMatch(out.notes, /change 1\b/);
    assert.match(out.notes, /…and 15 earlier changes/);
});
