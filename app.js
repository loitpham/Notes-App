const chalk = require('chalk');
const validator = require('validator');
const getNotes = require('./notes');

console.log(chalk.bgRed('ERROR'));
console.log(chalk.yellow.bold('Success!'));
console.log(chalk`{green.bold.inverse ${'Success!'}}`);

console.log(getNotes());
console.log(validator.isEmail('loitpham@gmail.com'));
console.log(validator.isURL('https://loipham.com'));