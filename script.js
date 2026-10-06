// ── Select elements ─────────────────────────────────────
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const clearAllBtn = document.querySelector("#clear-all-btn");

// ── State ───────────────────────────────────────────────
let notes = [];

// ── Load from localStorage ──────────────────────────────
function loadNotes() {
  const stored = localStorage.getItem("quicknotes");
  if (stored) {
    notes = JSON.parse(stored);
  }
}

// ── Save to localStorage ────────────────────────────────
function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

// ── Render the notes list ───────────────────────────────
function render(filter = "") {
  notesList.innerHTML = "";

  const filtered = filter
    ? notes.filter((note) =>
        note.text.toLowerCase().includes(filter.toLowerCase())
      )
    : notes;

  // Update count (always show total, not filtered count)
  updateCount();

  // Show "Clear All" only when there are notes
  clearAllBtn.style.display = notes.length > 0 ? "inline-block" : "none";

  if (filtered.length === 0 && filter) {
    const li = document.createElement("li");
    li.classList.add("no-results");
    li.textContent = "No notes match your search.";
    notesList.appendChild(li);
    return;
  }

  if (filtered.length === 0 && !filter) {
    return; // empty list, no message needed
  }

  filtered.forEach((note) => {
    const li = document.createElement("li");

    // Category badge
    const categorySpan = document.createElement("span");
    categorySpan.classList.add("note-category", `category-${note.category}`);
    categorySpan.textContent = note.category;

    // Date
    const dateSpan = document.createElement("span");
    dateSpan.classList.add("note-meta");
    dateSpan.textContent = note.createdAt;

    // Note text
    const textP = document.createElement("p");
    textP.classList.add("note-text");
    textP.textContent = note.text;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    // Build content container
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("note-content");
    contentDiv.appendChild(textP);

    const metaDiv = document.createElement("div");
    metaDiv.classList.add("note-meta");
    metaDiv.appendChild(categorySpan);
    metaDiv.appendChild(document.createTextNode("  "));
    metaDiv.appendChild(dateSpan);
    contentDiv.appendChild(metaDiv);

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

// ── Update count message ────────────────────────────────
function updateCount() {
  const count = notes.length;
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// ── Add a note ──────────────────────────────────────────
function addNote(text, category) {
  const note = {
    id: Date.now(),
    text: text.trim(),
    category: category,
    createdAt: new Date().toLocaleString(),
  };
  notes.unshift(note); // add to the top
  saveNotes();
  render(searchInput.value);
}

// ── Delete a note ───────────────────────────────────────
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render(searchInput.value);
}

// ── Clear all notes ─────────────────────────────────────
function clearAll() {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render("");
    searchInput.value = "";
  }
}

// ── Validation ──────────────────────────────────────────
function validate(text) {
  if (text.trim() === "") {
    errorMessage.textContent = "Please type a note first.";
    return false;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return false;
  }
  errorMessage.textContent = "";
  return true;
}

// ── Event listeners ─────────────────────────────────────

// Form submit
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value;

  if (!validate(text)) return;

  addNote(text, noteCategory.value);
  noteInput.value = ""; // clear input
});

// Search
searchInput.addEventListener("input", () => {
  render(searchInput.value);
});

// Clear all
clearAllBtn.addEventListener("click", clearAll);

// ── On page load ────────────────────────────────────────
loadNotes();
render();
