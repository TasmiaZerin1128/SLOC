const fs = require('fs');
const path = require('path');
const { diffLines } = require('diff');
const colors = require('colors');

function compareFolders(folder1Path, folder2Path) {
  const filelist1 = fs.readdirSync(folder1Path);
  const filelist2 = fs.readdirSync(folder2Path);

  const filelistLength = filelist1.length;

  for (let i = 0; i < filelistLength; i++) {
    const file1Path = path.join(folder1Path, filelist1[i]);
    const stat1 = fs.statSync(file1Path);
    const file2Path = path.join(folder2Path, filelist2[i]);
    // const stats2 = fs.statSync(file2Path);

    if (stat1.isDirectory()) {
      // Recursively traverse subfolders
      compareFolders(file1Path, file2Path);
    } else if (stat1.isFile()) {
      // Handle file processing here (e.g., print file path)
      compareFiles(file1Path, file2Path);
    }
  }
}


function compareFiles(fileVersion1Path, fileVersion2Path) {

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

console.log("Changes in File " + fileVersion1Path + "\n");
console.log(`Added-------> ${addCount} lines\n ${addedLines}` .green);
console.log(`Removed-------> ${removeCount} lines\n ${removedLines}` .red);
}

const folder1Path = 'tztail-v1/src';
const folder2Path = 'tztail-v2/src';
compareFolders(folder1Path, folder2Path);
