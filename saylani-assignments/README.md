# Saylani JavaScript Assignments — Chapters 1–67

**Syed Hamza Hussain** · 160 completed exercises · 19 chapter groups

Original solutions for every actual exercise in the [assigned source folder](https://github.com/nadir-786/saylani-complete-javascript/tree/master/Chapter%201%20to%2067%20(JS)/).

## Run

Open `index.html` in a modern browser. Choose a chapter, then a question. Each exercise has its own `index.html` and `app.js`. No build, paid service, framework, or external CDN is needed. Images are local.

Optional local server (from this folder):

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. A local server also gives the page-visit counter a consistent storage origin. Some browsers restrict localStorage when opening local files directly; the exercise handles that case.

Prompt-based exercises accept the example value if you cancel or leave the input empty. The explicit password and username validation exercises follow their own rules. Use **Run again** to repeat any exercise. Use **View JavaScript** to inspect its solution. Questions are independent, so you do not have to dismiss every alert in a chapter.

## Coverage

| Chapters | Topic | Exercises | Folder |
| --- | --- | ---: | --- |
| 1 | Alerts | 7 | [chapter-01](chapter-01/index.html) |
| 2 | Variables for strings | 9 | [chapter-02](chapter-02/index.html) |
| 3 | Variables for numbers | 4 | [chapter-03](chapter-03/index.html) |
| 4 | Legal and illegal variable names | 3 | [chapter-04](chapter-04/index.html) |
| 5 | Math expressions | 13 | [chapter-05](chapter-05/index.html) |
| 6–9 | Math expressions and user input | 5 | [chapters-06-09](chapters-06-09/index.html) |
| 9–11 | Input and conditional statements | 11 | [chapters-09-11](chapters-09-11/index.html) |
| 12–13 | If, else and else if | 7 | [chapters-12-13](chapters-12-13/index.html) |
| 14–16 | Arrays | 15 | [chapters-14-16](chapters-14-16/index.html) |
| 17–20 | Arrays and loops | 10 | [chapters-17-20](chapters-17-20/index.html) |
| 21–25 | String methods | 18 | [chapters-21-25](chapters-21-25/index.html) |
| 26–30 | Math methods | 8 | [chapters-26-30](chapters-26-30/index.html) |
| 31–34 | Date methods | 14 | [chapters-31-34](chapters-31-34/index.html) |
| 35–38 | Functions | 14 | [chapters-35-38](chapters-35-38/index.html) |
| 38–42 | Functions, switch and while loops | 10 | [chapters-38-42](chapters-38-42/index.html) |
| 43–48 | Browser events | 5 | [chapters-43-48](chapters-43-48/index.html) |
| 49–52 | Forms and editable tables | 3 | [chapters-49-52](chapters-49-52/index.html) |
| 53–57 | Image modal and paragraph zoom | 2 | [chapters-53-57](chapters-53-57/index.html) |
| 58–67 | Document Object Model | 2 | [chapters-58-67](chapters-58-67/index.html) |
| **Total** | | **160** | |

## Source notes

- Chapters 6–9 leave numbered entries 4 and 7 blank. They have no question text or screenshot. The five real tasks keep source numbers 1, 2, 3, 5 and 6.
- Chapters 26–30, question 1 says “integer” while its screenshot uses 3.45214. Positive decimals are accepted to demonstrate round, floor and ceil.
- The `chapters38-42.pdf` header says 38–44. All ten tasks in that file are completed in `chapters-38-42`.
- The modal assignment sits under `chapter52-57`, its DOCX filename is `chapters53-58.docx`, and its header says 53–57. Both tasks are in `chapters-53-57`; the provided `modal.html` behavior is adapted for the image gallery.
- Heron’s formula includes the square root omitted in the triangle task’s printed formula. The date task computes seconds from the assigned reference date instead of copying the incorrect example total. The vowel-pair exercise counts all adjacent vowel pairs, including `io` in “application”.
- Historical exercise rates, the Rs. 12 overtime rate, and the June 18, 2015 Ramadan date remain fixed assignment data. Date/time tasks otherwise use the browser’s current date and local timezone. Birth year from age is an estimate because the birthday is not supplied.
- Shared helpers in `shared/helpers.js` handle safe text output, tables and numeric input. They are loaded before every question; the assignment logic is in each `app.js`. The requested `document.write()` exercises use that method while HTML is being parsed.
- Chapter 31–34, question 6 intentionally assigns an undeclared variable because the source explicitly requests it; its comment explains why normal code should declare variables.
- The zoom-out example stops at 10px to prevent zero or negative font sizes. Signup form output masks the password. Forms and student tables are local demonstrations with no backend.

## Checks

```sh
npm test
```

This dependency-free check verifies all 160 scripts, chapter/question coverage, and local file references.

The DOM suite executes every solution and checks calculations, branches, dialogs, forms, table edits, image events, modal closing, zoom and DOM navigation:

```sh
npm install --no-save happy-dom
npm run test:dom
```

The static and DOM checks passed for the completed collection. DOM tests simulate the document environment; they do not verify visual rendering or HTML parser timing. A Chromium suite is included for those browser checks. It could not be run here because native browser launch is restricted:

```sh
npm install --no-save playwright
npx playwright install chromium
npm run test:browser
```

## Credits

Assignment prompts and sample images: [nadir-786/saylani-complete-javascript](https://github.com/nadir-786/saylani-complete-javascript). JavaScript solutions, organization, browser pages and tests were prepared for Syed Hamza Hussain. The earlier exercises elsewhere in this repository are preserved.
