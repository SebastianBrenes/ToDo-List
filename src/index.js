import './style.css';


function createFolderElement(name) {
    const folder = document.createElement('li');
    folder.className = 'folder';
    folder.innerHTML = `
        <span>${name}</span>
        <span class="folder-menu">⋮</span>
        <div class="folder-options">
            <div class="rename-folder">Renombrar</div>
            <div class="delete-folder">Eliminar</div>
        </div>
    `;
    
    const folderMenu = folder.querySelector('.folder-menu');
    const folderOptions = folder.querySelector('.folder-options');
    
    folderMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        folderOptions.style.display = folderOptions.style.display === 'block' ? 'none' : 'block';
    });

    folder.querySelector('.rename-folder').addEventListener('click', function(e) {
        e.stopPropagation();
        const folderName = folder.querySelector('span:first-child');
        const newName = prompt('Ingrese el nuevo nombre de la carpeta:', folderName.textContent);
        if (newName) {
            folderName.textContent = newName;
        }
        folderOptions.style.display = 'none';
    });

    folder.querySelector('.delete-folder').addEventListener('click', function(e) {
        e.stopPropagation();
        if (confirm('¿Está seguro de que desea eliminar esta carpeta?')) {
            folder.remove();
        }
        folderOptions.style.display = 'none';
    });

    return folder;
}

function createNoteDialog(noteContent) {
    const dialog = document.createElement('div');
    dialog.className = 'dialog-overlay';
    dialog.innerHTML = `
        <div class="dialog-content">
            <div class="dialog-header">
                <button class="dialog-close">&times;</button>
            </div>
            <div class="dialog-body">
                <textarea class="dialog-textarea">${noteContent}</textarea>
            </div>
        </div>
    `;

    const closeButton = dialog.querySelector('.dialog-close');
    closeButton.addEventListener('click', () => {
        dialog.remove();
    });

    return dialog;
}

document.getElementById('add-folder').addEventListener('click', function() {
    const folderName = prompt('Ingrese el nombre de la nueva carpeta:');
    if (folderName) {
        const newFolder = createFolderElement(folderName);
        document.getElementById('folders').appendChild(newFolder);
    }
});

document.getElementById('add-note').addEventListener('click', function() {
    const notesContainer = document.getElementById('notes-container');
    const newNote = document.createElement('div');
    newNote.className = 'note';
    newNote.innerHTML = `
        <div class="note-menu">⋮</div>
        <div class="note-options">
            <div>Descargar</div>
            <div>Enviar</div>
            <div>Eliminar</div>
        </div>
        <textarea placeholder="Escribe tu nota aquí..."></textarea>
    `;
    notesContainer.appendChild(newNote);

    const noteMenu = newNote.querySelector('.note-menu');
    const noteOptions = newNote.querySelector('.note-options');
    const noteTextarea = newNote.querySelector('textarea');

    noteMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        noteOptions.style.display = noteOptions.style.display === 'block' ? 'none' : 'block';
    });

    newNote.addEventListener('click', function(e) {
        if (e.target !== noteMenu && e.target !== noteOptions && !noteOptions.contains(e.target)) {
            const dialog = createNoteDialog(noteTextarea.value);
            document.body.appendChild(dialog);

            const dialogTextarea = dialog.querySelector('.dialog-textarea');
            dialogTextarea.addEventListener('input', () => {
                noteTextarea.value = dialogTextarea.value;
            });
        }
    });
});

document.querySelectorAll('.folder').forEach(folder => {
    const folderMenu = folder.querySelector('.folder-menu');
    const folderOptions = folder.querySelector('.folder-options');
    
    folderMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        folderOptions.style.display = folderOptions.style.display === 'block' ? 'none' : 'block';
    });

    folder.querySelector('.rename-folder').addEventListener('click', function(e) {
        e.stopPropagation();
        const folderName = folder.querySelector('span:first-child');
        const newName = prompt('Ingrese el nuevo nombre de la carpeta:', folderName.textContent);
        if (newName) {
            folderName.textContent = newName;
        }
        folderOptions.style.display = 'none';
    });

    folder.querySelector('.delete-folder').addEventListener('click', function(e) {
        e.stopPropagation();
        if (confirm('¿Está seguro de que desea eliminar esta carpeta?')) {
            folder.remove();
        }
        folderOptions.style.display = 'none';
    });
});

document.addEventListener('click', function() {
    document.querySelectorAll('.note-options, .folder-options').forEach(options => {
        options.style.display = 'none';
    });
});
