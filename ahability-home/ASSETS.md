# Image assets to generate

Brief for whoever runs the image model (Codex / GPT image generation).
Save each file into `ahability-home/img/` with the exact name below, then commit and push to this branch.

## Palette (use these, nothing else)

| Role | Hex |
| --- | --- |
| Cream background | `#FAF5EE` |
| Forest green | `#1E4232` |
| Mid green | `#3F6B41` |
| Sage | `#E9EEDC` |
| Peach | `#EDAE88` |
| Soft peach | `#FBE3D2` |

Mood: warm, calm, natural, professional. A clinical psychologist's site for adults. No people, no text in any image.

## 1. Hero picture: `hero.webp`

- Size 1600 x 1500 px, WebP, under 250 KB.
- Prompt: "Soft editorial still-life photograph. A matte cream ceramic vase holding a few olive branches, standing on a pale stone ledge beside two stacked linen-covered books. Warm morning sunlight falls diagonally across a plain cream plaster wall, with soft window shadows. Muted palette of cream, warm beige and sage green. Subject on the right half, the left third almost empty wall. Shallow depth of field, calm, minimal, no text, no people."
- The left edge must fade into plain `#FAF5EE` so it blends into the page background.

## 2. Logo mark: `logo-mark.svg` (and `logo-mark.png`, 512 x 512, transparent)

- Prompt: "Minimal logo mark. A single slender sprig with a gently curved stem and three small leaves, drawn as flat filled shapes in warm peach-tan (#D99B72), slightly hand-drawn, elegant, balanced. Transparent background. No text, no circle, no gradient."
- Must stay readable at 32 px tall.
- Deliver a light version for the dark footer too: `logo-mark-light.svg`, same shape in `#EDAE88`.

## 3. Watercolour splashes: `splash-1.webp` to `splash-6.webp`

- Each 400 x 400 px, transparent background, under 25 KB.
- Prompt for each: "Small abstract watercolour wash, two overlapping soft organic blobs, one soft peach (#FBE3D2) and one pale sage green (#D5DFC2), subtle paper grain, uneven soft edges, transparent background, no outline, no text."
- Make all six visibly different in shape and arrangement. They sit behind line icons, so keep them pale.

## 4. Section background wash (optional): `wash-wide.webp`

- 2000 x 600 px, transparent background, under 60 KB.
- Prompt: "Very pale, wide watercolour wave in sage green (#E9EEDC) fading to transparent at the top, soft uneven edge, subtle paper grain, no text."

## Not to generate

Liana's portrait. It must be a real photograph of her.
