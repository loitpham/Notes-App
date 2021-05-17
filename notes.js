const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "Your notes...";
}

const readNote = (title) => {
    const notes = loadNotes();
    const result = notes.find(note => note.title === title);
    if (result) {
        console.log(chalk.blue(result.title));
        console.log(chalk.yellow(result.body));
    } else {
        console.log(chalk.red('No note with that title found.'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length > 0) {
        console.log(chalk.green.bold('Your notes...'));
        notes.forEach((note, idx) => {
            console.log(chalk.blue(`${idx + 1}. ${note.title}`));
            console.log(chalk.yellow(note.body));
        })
    } else {
        console.log(chalk.red('You have no notes yet.'));
    }
};

const addNote = (title, body) => {
    const notes = loadNotes();
    // Stop as soon as one found. Otherwise, return 'undefined'.
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({title: title, body: body});
        saveNotes(notes);
        console.log(chalk.bgGreen('New note added!'));
    } else {
        console.log(chalk.bgRed('Note title taken!'));
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const updateNote = (title, body) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title);
    if (filteredNotes.length < notes.length) {
        filteredNotes.push({title, body});
        saveNotes(filteredNotes);
        console.log(chalk.green('Note updated successfully!'));
    } else {
        console.log(chalk.red('No note with that title found.'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title);
    if (filteredNotes.length < notes.length) {
        console.log(chalk.bgGreen('Note removed: ', title));
        saveNotes(filteredNotes);
    } else {
        console.log(chalk.bgRed('No note found!'));
    }
}

module.exports = {
    readNote,
    listNotes,
    addNote,
    updateNote,
    removeNote
};