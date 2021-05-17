const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "Your notes...";
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
        console.log(chalk.green.bold('You have no notes yet.'));
    }
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
    listNotes,
    addNote,
    removeNote
};