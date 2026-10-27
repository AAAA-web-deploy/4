# Ethereum Four — Fast Static Website

A complete **HTML + CSS + JavaScript** landing page. No build tools, Node, frameworks, install steps, or runtime dependencies.

## 1. Customize it first (REQUIRED)

Open **`config.js`** in Notepad, VS Code, or Cursor and change:

- `contractAddress`: **YOUR OWN** Ethereum ERC-20 contract address, exactly `0x` + 40 hexadecimal characters. The source site's token CA is intentionally not included.
- `twitterUrl`: your real official `https://x.com/...` URL.
- `telegramUrl`: your real official `https://t.me/...` URL.
- `tokenName`, `ticker`: update only if needed.
- `totalSupply`, `tax`, `liquidity`, `ownership`: enter ONLY facts you have independently confirmed. Defaults display **NOT ANNOUNCED** instead of making potentially false claims.

The buy link automatically opens Uniswap on **Ethereum mainnet**, using the configured CA. Until the CA is set to a valid address, the buy buttons stay disabled. Community buttons remain disabled until URLs are configured.

Do not forget to verify that the Uniswap route resolves correctly once the new token exists and the pool is live.

## 2. Preview locally

You can double-click `index.html` to open it in a browser. Some clipboard features only work on secure origins (HTTPS or localhost); a fallback is included.

For an accurate local preview, from the unzipped folder:

```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## 3. Deploy in minutes

**GitHub Pages** (recommended if you already use GitHub):
1. Create a new public GitHub repository.
2. Upload all files **inside** `Ethereum_Four_Static_Site` to the **repository root** — `index.html` must be at the top level.
3. Go to Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save.
4. Open the URL shown under Pages after GitHub publishes it.

**Netlify**: log in to Netlify and drag and drop the unzipped website directory into the site's manual deploy area. There is nothing to compile.

**Cloudflare Pages**: create a Pages project and upload the website folder as static assets.

## 4. Change artwork

- Header logo: `assets/branding/logo-circle.png`
- Link preview / banner: `assets/branding/banner-3x1.jpg`
- Hero person: `assets/images/hero-four-fingers.webp`
- Gallery: six files under `assets/images/gallery-*.webp`
- Extra hero/scene files are included for easy replacement.

Use the same filenames when swapping artwork or change the image references in `index.html`.

## 5. Structure

```
index.html              Site markup and all section content
styles.css              All desktop and mobile styling; Ethereum palette
script.js               Mobile nav, image viewer, contract copy, Uniswap links
config.js               Main settings / CA / social URLs / verified token data
assets/branding/        Logo and banner
assets/images/          Original generated Ethereum-themed artwork
```

## Notes

The site mirrors the **one-page flow and major sections** of vitalikfour.site with new design execution and newly generated artwork, rather than copying the original site's files or claiming a pixel-perfect match. It includes hero, joke history, tokenomics, four how-to-buy steps, gallery/lightbox, community, and risk disclosure.

The person in the generated artwork is a **stylized fictional illustration**, not an authentic photograph. **Do not claim endorsement or involvement** from Vitalik Buterin or the Ethereum Foundation. You must verify all on-chain claims and tokens/addresses before making your site live.

Fonts rely on local system fonts; no external font or JavaScript network requests are needed. External Uniswap/X/Telegram links are optional and are created only from `config.js`.
