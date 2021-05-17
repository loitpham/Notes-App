# Notes-App

Usage

```bash
node app.js list
node app.js add --title='New note title' --body='note content'
node app.js read --title='Some existing note title'
node app.js update --title='Some existing note title' --body='New note content'
node app.js remove --title='Some existing note title'
```

A waring is returned when adding a title that has already been taken or reading/updating/removing a note that doesn't 
exist.
