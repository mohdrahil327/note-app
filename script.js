alert("notes app made by Rahil");
const addBtn = document.getElementById("add-btn");
const input = document.getElementById("note-input");
const container = document.getElementById("notes-container");
const search = document.getElementById("search");
const themeBtn = document.getElementById("theme-btn");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let dark = true;

// Load notes
renderNotes();

// Add note
addBtn.onclick = () => {
  if (!input.value.trim()) return;

  notes.push({
    text: input.value,
    date: new Date().toLocaleString()
  });

  save();
  input.value = "";
  renderNotes();
};

// Render
function renderNotes(filter = "") {
  container.innerHTML = "";

  notes
    .filter(n => n.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((note, i) => {
      const div = document.createElement("div");
      div.className = "note";

      div.innerHTML = `
        <textarea disabled>${note.text}</textarea>
        <small>${note.date}</small>
        <div class="actions">
          <button onclick="editNote(${i})">✏️</button>
          <button onclick="deleteNote(${i})">🗑️</button>
        </div>
      `;

      container.appendChild(div);
    });
}

// Edit
function editNote(i) {
  const box = container.children[i];
  const textarea = box.querySelector("textarea");

  textarea.disabled = false;
  textarea.focus();

  textarea.onblur = () => {
    notes[i].text = textarea.value;
    textarea.disabled = true;
    save();
  };
}

// Delete
function deleteNote(i) {
  notes.splice(i, 1);
  save();
  renderNotes(search.value);
}

// Save
function save() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Search
search.oninput = () => renderNotes(search.value);

// Theme toggle
themeBtn.onclick = () => {
  document.body.classList.toggle("light");
};

// Dark mode
if (dark) {
  document.body.classList.add("light");
}