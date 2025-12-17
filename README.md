Hotel landing page demo

Files created:
- `index.html`
- `css/styles.css`
- `js/main.js`
- `assets/hero-illustration.svg`
- `assets/promo-phone.svg`
- `results.html`
- `assets/mock-availability.json`
- `server.js` (Express mock API)

How to run (recommended - runs mock API and serves files):

1) Install dependencies:

```bash
cd "d:/Personal Projects/Dont-TrustMe"
npm install
```

2) Start the server:

```bash
npm start
# opens at http://localhost:3000
```

You can also open `index.html` directly in the browser, but the mock API will only work when the server is running.

Notes:
- The mock availability endpoint is `GET /api/availability?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&guests=2`.
- Example room photos use Unsplash source links (free for non-compiled demo use).
