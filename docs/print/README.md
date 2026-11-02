# EduAnant print kit

Everything we put on paper. One brand, one build, no hand-typed prices.

```bash
npm run print          # build every piece: dist/*.html + dist/*.pdf
npm run print:check    # measure every page for clipped content, then stop
npm run print leaflet  # build one piece, by file stem
node docs/print/build.mjs --html   # skip the PDF pass while working on layout
```

Needs Chrome (or `CHROME_PATH`). Google Fonts are fetched at render time, so build with a connection.

## Why it is a build and not a folder of files

The first brochure was a hand-written HTML file. It drifted: it advertised *"first 25 schools, 20% off"*
for weeks after the offer had become *first 10, 50%*, and nothing caught it, because the website's
price guard only checks that the per-student rates appear *somewhere* in the text.

So no piece types a number. Rates, bands, worked examples, GST, founding terms, module names, the
release count and the months-live figure are read out of `src/data/*.ts` at build time — the same
files the website renders from. Repricing is one edit in `src/data/pricing.ts`, then `npm run print`.

Two guards run on every build:

- **Unknown rates.** Anything shaped like a per-student rate must be one `pricing.ts` publishes.
- **Unknown tokens.** A `{{TOKEN}}` with no value fails the build rather than printing as literal text.

And `--check` renders each page and measures whether content collides with its footer, because a
fixed-size page clips silently and what gets clipped is always the bottom — the price, the phone
number, the signature block.

The brochure additionally overwrites `docs/brochure-source.html` and `public/eduanant-school-overview.pdf`,
so the download the website serves can never fall behind this build.

## The pieces

| File | Size | What it is for |
|---|---|---|
| `00-brand-sheet` | A4 ×2 | The standard. Logo, lockups, clear space, palette, type, voice. |
| `01-brochure` | A4 landscape ×2 | The PDF we email and send on WhatsApp. Not a handout — it is dense. |
| `02-leaflet-bifold` | A4 duplex, folded to A5 | **The physical leave-behind.** Bilingual. One sheet, folded once. |
| `03-price-card` | A5 ×2 | The one page a rep may leave without talking through it. |
| `04-visiting-card` | 90×54 mm +3 mm bleed | Founder's card, plus a blank template for each rep. |
| `05-case-sheet` | A4 | Reference-school before/after. **Prints a DRAFT stamp until the figures are real.** |
| `06-order-form` | A4 ×2 | Order on the front, the terms it commits us to on the back. |
| `07-authorisation-letter` | A4 | Letterhead that lets a school verify a rep in ten seconds. |
| `08-deck` | 16:9 ×29 | 12-slide core, then one slide per module as a flip-to appendix. |

## The brand rules, in short

The full version is `dist/00-brand-sheet.pdf`. The three that get broken most:

1. **The mark never appears alone on paper.** It is an infinity drawn as an open book wearing a
   graduation cap, and it does not say "EduAnant". On screen the name is in the address bar; on paper
   there is nothing. Always use a lockup — mark + name.
2. **The name is `EduAnant`.** One word, capital E, capital A. Not Eduanant, EDUANANT, Edu Anant or
   Edu-Anant. In Devanagari, एडुअनंत.
3. **White mark on dark, colour mark on light.** `public/eduanant-logo.svg` is the colour artwork,
   `public/Logo/Logo_logo1.svg` is the white one. Retire `public/logo.png` — it is an older,
   differently coloured rendering. Minimum printed mark height is 7 mm.

Amber text on white must be `#B45309`, never `#F59E0B`: at 9 pt the brighter amber fails contrast.

> **A trap worth knowing.** An inline `<svg>`'s `<style>` block is not scoped to that SVG — the
> browser hoists it into the document. Both logo files colour their artwork through the same generic
> `.st0` class, so putting both on one page made the white mark's `fill:#fff` win on cascade order
> and erase the colour mark wherever it sat on white paper. `build.mjs` now scopes each variant's
> rules and renames its gradients. If you ever inline these SVGs by hand, you will hit this.

## Before anything goes to a press

- [ ] `npm run print:check` passes.
- [ ] Hindi read by a native speaker. It is written for a reader, not translated.
- [ ] No screenshot containing a real student name or phone number. `public/screenshots/students.webp`
      is stale (release v0.0.3) and shows both — it must not be printed.
- [ ] The reference school has approved its name, logo, figures and quotation **in writing**.
- [ ] The case sheet's DRAFT stamp is gone, which means its numbers are measured and not estimated.
- [ ] Proof one copy of each piece before paying for a run.

## Where the sales strategy lives

Not here. `Branding and Marketing/` holds the playbook, the field kit, objection handling and
discount authority, and it is in `.gitignore` because this repository is public. This folder holds
only what a school is allowed to see anyway.
