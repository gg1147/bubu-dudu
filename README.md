# Manisha & Gagan — Wedding Invitation 💍

A single-page, interactive wedding invitation website for the wedding of **Manisha & Gagan**, celebrated at **Sahib Farms & Resorts** on **20 November 2026**.

Built as a lightweight static site — pure HTML, CSS, and vanilla JavaScript with no build step or framework. RSVPs are collected straight into a Google Sheet via a Google Apps Script web app.

## Features

- **Scratch-to-reveal save-the-date** — guests scratch a canvas overlay to uncover the wedding date.
- **Live countdown** to the ceremony (20 Nov 2026, 3:00 PM IST).
- **Falling petals** ambient animation and looping **background music** (toggleable).
- **Bilingual** — full English / Hindi (हिंदी) toggle, powered by an in-page `data-i18n` dictionary.
- **Our Story**, photo gallery, and venue section with a "View on Maps" link.
- **Festivities timeline** — Haldi (12:00 PM), Sangeet Night (7:00 PM), and the Wedding (3:00 PM), each with dress code and color notes.
- **RSVP form** capturing name, phone, attendance, party size, events attending, a song request, and marriage advice — submitted to Google Sheets.
- Scroll-reveal animations, contacts section, and responsive mobile-first layout.

## Project structure

```
.
├── index.html             # All page markup and sections
├── index.css              # Styles (theme variables, layout, animations)
├── index.js               # Countdown, scratch reveal, petals, i18n, RSVP submit
├── google-apps-script.gs  # Server-side RSVP handler (deploy to Google Apps Script)
├── assets/                # Photos, background music, video, Ganesha image
├── fonts/                 # Distrela.ttf (display font)
└── LICENSE
```

## Running locally

It's a static site — no install or build required. Serve the folder with any static server so that the audio, fonts, and assets load over HTTP:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

## Setting up RSVP collection

The RSVP form posts to a Google Apps Script web app that appends each submission as a row in a Google Sheet.

1. Create a Google Sheet and add these headers in row 1:
   `Timestamp | Name | Phone | Attending | Party Size | Events | Song | Advice`
2. In the sheet, go to **Extensions → Apps Script**, paste the contents of [`google-apps-script.gs`](google-apps-script.gs), and **Save**.
3. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone** (not "Anyone with Google Account")
4. Authorize when prompted, then copy the Web App URL (`https://script.google.com/macros/s/.../exec`).
5. Paste that URL into `SHEET_ENDPOINT` in [`index.js`](index.js).

Until `SHEET_ENDPOINT` is set, the form still shows the thank-you confirmation but does not record submissions. Every edit to the Apps Script requires a **new deployment** (or a new version of the existing one) to take effect.

## Customizing

- **Wedding date / countdown** — `WEDDING_DATE` in `index.js`.
- **Text & translations** — the `i18n` object (`en` / `hi`) in `index.js`.
- **Photos & media** — replace files in `assets/`.
- **Colors & fonts** — CSS variables and `@font-face` near the top of `index.css`.

## License

See [LICENSE](LICENSE).
