const fs = require('fs');
const { diffLines } = require('diff');
const colors = require('colors');

let file1, file2;
const fileVersion1Path = 'calculator/src/main.rs';
const fileVersion2Path = 'calculator/src/main-v2.rs';

try {
    file1 = fs.readFileSync(fileVersion1Path, 'utf8');
    file2 = fs.readFileSync(fileVersion2Path, 'utf8');
} catch (error) {
    console.error('Error reading file:', error.message);
    return null;
}

if (file1 === null || file2 === null) {
    process.exit(1);
}

const differences = diffLines(file1, file2);

let addedLines = '', removedLines = '';
let addCount = 0, removeCount = 0;

// Print the differences
differences.forEach((part) => {
  if (part.added) {
    addedLines += part.value;
    addCount += part.value.split(/\r?\n/).length;
    } 
    else if (part.removed) {
        removedLines += part.value;
        removeCount += part.value.split(/\r?\n/).length;
    }
});

console.log(`Added-------> ${addCount} lines\n ${addedLines}` .green);
console.log(`Removed-------> ${removeCount} lines\n ${removedLines}` .red);