# Releasing the website

The footer reads `Site v1.4.2`. That number is the **website's** version — not EduAnant the
product, whose release (`PRODUCT_VERSION`, currently in `src/lib/version.ts`) is a separate
number that appears in copy and print.

## To release

1. `git push origin main`
2. GitHub → **Actions** → *Application-Website Build and Deploy* → **Run workflow**, branch `main`.
3. Leave **bump** on `auto` and the **version** box blank. Press the button.

The workflow works out the number, deploys, and — only if the deploy succeeded — creates the
tag and a GitHub Release with notes built from the commit history. Then check the footer.

## How the number is chosen

`scripts/next-version.mjs` starts from the latest `vX.Y.Z` tag and reads the commits since it.
The repository already writes conventional commits, so:

| Commits since the last release contain | Bump | Example |
|---|---|---|
| a breaking change — `feat!:` or a `BREAKING CHANGE:` line | major | v1.4.2 → v2.0.0 |
| a `feat:` | minor | v1.4.2 → v1.5.0 |
| only `fix:`, `chore:`, `refactor:`, `docs:`… | patch | v1.4.2 → v1.4.3 |

Override it from the form: pick **minor** or **major** from *bump*, or type an exact version
(`v2.0.0`) in the *version* box. With no tag yet, the base is `v1.0.0`, the number the footer
had shown since April — so the first release is **v1.1.0**.

`package.json`'s `version` is **not** used and nothing updates it; the tag is the only source of
truth. A local `npm run build` shows `Site dev`.

## Things it deliberately does

- **Redeploying a commit that already has a release** reuses its number and publishes nothing.
- **Deploying an older commit than the latest release** is refused rather than numbered as if
  it were newer. Type an exact version if you really mean it.
- **A failed deploy uses up no number**: the tag is created after the deploy, not before.
- **Two runs at once queue** rather than racing for the same number.
- **Tagging by hand still works**: `git tag v1.5.0 && git push origin v1.5.0`.

## If a release run goes red after the site is already live

The tag and Release are the last step. If that step fails the site is deployed but unnumbered in
GitHub, and the footer is still right. Re-run the workflow: the commit has no release yet, so it
computes the same number and creates it.

## Changing the rules

The rules are `scripts/next-version.mjs`; their written form is `scripts/next-version.test.mjs`.

```bash
node --test scripts/next-version.test.mjs
```
