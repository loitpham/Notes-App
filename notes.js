const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...'
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push({title: title, body: body});
        saveNotes(notes);
        console.log(chalk.bgGreen('New note added!'));
    } else {
        console.log(chalk.bgRed('Note title taken!'));
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

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
    getNotes,
    addNote,
    removeNote
};