const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes');

// Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // required
            type: 'string' // to guard against default boolean
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        console.log('Title: ' + argv.title);
        console.log('Body: ' + argv.body);
        notes.addNote(argv.title, argv.body);
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        console.log('Title: ', argv.title);
        notes.removeNote(argv.title);
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler () {
        notes.listNotes();
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler () {
        console.log('Reading a note');
    }
});

yargs.parse();