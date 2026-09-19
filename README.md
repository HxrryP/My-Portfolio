# Harry T. Paclibar — portfolio

A static personal portfolio built for the existing `My-Portfolio` GitHub Pages site. HTML, CSS, and a tiny JavaScript file; no build step or paid hosting.

## Put the rebuild on GitHub Pages

1. In your existing `hxrryp/My-Portfolio` repository, back up the current files if you want to keep a copy.
2. Upload the **contents** of this folder to the publishing root, replacing the old `index.html` and related site files. Keep the `assets` folder and `harry-portrait.jpg` inside it. GitHub Pages must be set to publish from the same branch and folder as before (typically `main` and `/(root)`).
3. Visit `https://hxrryp.github.io/My-Portfolio/` after the deploy completes and refresh the page. All site files use relative paths, so the repository name works as it is.
4. Submit the contact form once yourself with a test message. FormSubmit will email `iam.hxrry14@gmail.com` an activation link for this form; follow it. **Until you confirm, visitor messages are not delivered.** Then send another test and verify it arrives. FormSubmit may show a verification challenge and uses its own thank-you page.

The contact form sends through [FormSubmit](https://formsubmit.co/), an independent service; visitor name, email, and message are processed there. The page also offers direct `mailto:` and phone links. No client-side API keys or passwords are needed.

## Included material

- Projects and employment information were adapted from your existing live site. The payment tracker is labeled personal work with illustrative numbers.
- The image in `assets/harry-portrait.jpg` is your supplied illustration.
- The palette is `#FFF2E0`, `#C0C9EE`, `#A2AADB`, `#898AC4` from your Color Hunt reference, with dark ink for legibility.
- No character references' private contact details are included; references are available on request.

## Local preview

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000/`. The form's email delivery only works after the form has been activated and a visitor actually submits it.
