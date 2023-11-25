document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('noteInput');
    const noteList = document.getElementById('noteList');

    function addNote() {
        const noteText = noteInput.value.trim();

        if (noteText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${noteText}</span>
                <button onclick="deleteNote(this)">Delete</button>
            `;
            noteList.appendChild(li);

            // Save note to local storage
            saveNotesToLocalStorage();

            noteInput.value = '';
        }
    }

    function deleteNote(button) {
        const li = button.parentNode;
        noteList.removeChild(li);

        // Save notes to local storage after deletion
        saveNotesToLocalStorage();
    }

    function saveNotesToLocalStorage() {
        const notes = [];
        const noteElements = noteList.querySelectorAll('li span');

        noteElements.forEach(function(noteElement) {
            notes.push(noteElement.textContent);
        });

        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotesFromLocalStorage() {
        const savedNotes = JSON.parse(localStorage.getItem('notes'));

        if (savedNotes) {
            savedNotes.forEach(function(noteText) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${noteText}</span>
                    <button onclick="deleteNote(this)">Delete</button>
                `;
                noteList.appendChild(li);
            });
        }
    }

    // Load notes from local storage on page load
    loadNotesFromLocalStorage();
});
