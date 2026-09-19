# Harry T. Paclibar — portfolio

A static personal portfolio built for the existing `My-Portfolio` GitHub Pages site. HTML, CSS, and a tiny JavaScript file; no build step or paid hosting.

The three service cards open interactive dialogs with examples tailored to a visitor's chosen need. The spreadsheet dialog includes an illustrative estimate of time currently spent on a repeated task; it does not promise time savings. The **Ask me about this** button takes the visitor to the contact form and drafts a topic without submitting anything.

The three project cards open sample interfaces: a filterable request queue with status changes, a resident service guide with a preparation checklist, and a monthly payment view with checkboxes and running totals. These are illustrative portfolio previews built from invented data, not the original project screens or live government services. None of the sample interactions submit or store information.

Each project now has a separate, shareable case study in `case-studies/`. They summarize the project details already published in your previous portfolio and link back to the interactive samples. Specific responsibilities or measured results have not been invented. The homepage and each case study have their own 1200 × 630 PNG sharing image and Open Graph / X card metadata.

The second project is titled **Municipal E-Services**. Its case study lives at `case-studies/municipal.html`; the previous `case-studies/anilao.html` link redirects there for compatibility.

## Put the rebuild on GitHub Pages

1. In your existing `hxrryp/My-Portfolio` repository, back up the current files if you want to keep a copy.
2. Upload the **contents** of this folder to the publishing root, replacing the old `index.html` and related site files. Upload the complete `assets` and `case-studies` folders as well as the CSS and JavaScript files. GitHub Pages must be set to publish from the same branch and folder as before (typically `main` and `/(root)`).
3. Visit `https://hxrryp.github.io/My-Portfolio/` after the deploy completes and refresh the page. All site files use relative paths, so the repository name works as it is.
4. Submit the contact form once yourself with a test message. FormSubmit will email `iam.hxrry14@gmail.com` an activation link for this form; follow it. **Until you confirm, visitor messages are not delivered.** Then send another test and verify it arrives. FormSubmit may show a verification challenge and uses its own thank-you page.

The share preview URLs use the current `https://hxrryp.github.io/My-Portfolio/` address. They will resolve only after you publish the new image files. Some social platforms keep a cached preview for a while after you update a page.

The contact form sends through [FormSubmit](https://formsubmit.co/), an independent service; visitor name, email, and message are processed there. The page also offers direct `mailto:` and phone links. No client-side API keys or passwords are needed.

## Included material

- Projects and employment information were adapted from your existing live site. The payment tracker is labeled personal work with illustrative numbers.
- The landing view uses `assets/harry-portrait-cutout.webp`, a transparent-background edit of your supplied illustration. The homepage share preview uses that cutout too.
- The palette is `#FFF2E0`, `#C0C9EE`, `#A2AADB`, `#898AC4` from your Color Hunt reference, with dark ink for legibility.
- No character references' private contact details are included; references are available on request.

## Local preview

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000/`. The form's email delivery only works after the form has been activated and a visitor actually submits it.
