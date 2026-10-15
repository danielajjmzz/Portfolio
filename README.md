# Daniela Jimenez — Portfolio

Personal UI/UX design portfolio for Daniela Jimenez, Computer Science student at Illinois Tech in Chicago.

Built with [TanStack Start](https://tanstack.com/start), React, TypeScript, and Tailwind CSS.

## Pages

| Route             | Page                                 |
| ----------------- | ------------------------------------ |
| `/`               | Home                                 |
| `/projects`       | Projects index                       |
| `/projects/:slug` | Featured project page (one template) |
| `/contact`        | Contact                              |

Project content lives in `src/data/projects.js` and `src/data/designs.js`. Adding a project means adding one object to the array — the detail page is generated from its `slug`.

## Development

Requires [Bun](https://bun.sh) (the lockfile is `bun.lock`).

```sh
bun install --frozen-lockfile   # install exact locked versions
bun run dev                     # start dev server on http://localhost:8080
bun run build                   # production build into .output/
NITRO_PRESET=node-server bun run build && node .output/server/index.mjs   # run the production build locally
```

## Deployment

`bun run build` outputs a Cloudflare Workers bundle by default (`.output/`), deployable with `npx wrangler deploy` from `.output/server`.

To target another host, set `NITRO_PRESET` at build time, e.g.:

```sh
NITRO_PRESET=vercel bun run build
NITRO_PRESET=netlify bun run build
NITRO_PRESET=node-server bun run build
```

## Social preview image

The `og:image` and `twitter:image` tags point to `/og-image.png`. Add a 1200×630 image at `public/og-image.png`.
