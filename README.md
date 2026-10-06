# QuickNotes

QuickNotes is a simple, browser-based note-taking app that lets you create, organize, search, and delete notes. Notes are categorized into Personal, Work, or Study, and are automatically saved to your browser's local storage so nothing is lost when you refresh.

## Features

- **Add notes** with a text input and category selection (Personal, Work, Study)
- **Delete individual notes** with a per-note delete button
- **Clear all notes** at once with a confirmation prompt
- **Search notes** in real-time as you type
- **Persistent storage** — notes survive page refreshes via `localStorage`
- **Input validation** — prevents empty notes and limits text to 200 characters
- **Responsive design** — works on desktop and mobile screens
- **Category styling** — each category has its own color-coded badge and left border

## How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. That's it — no server or build step required.

Alternatively, run a local server:

```bash
# Python
python3 -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server
