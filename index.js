const fs = require('fs');

function countSLOC(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split(/\r?\n/);

  let slocCount = 0;
  let insideMultilineComment = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('/*')) {
      insideMultilineComment = true;
      if (!trimmedLine.endsWith('*/')) {
        continue;
      }
    }

    if (insideMultilineComment) {
      if (trimmedLine.endsWith('*/')) {
        insideMultilineComment = false;
      }
      continue;
    }

    // Exclude empty lines and lines containing only single-line comments
    if (trimmedLine !== '' && !trimmedLine.startsWith('//')) {
      slocCount++;
    }
  }

  return slocCount;
}

const rustFilePath = 'calculator/src/main.rs';
const slocCount = countSLOC(rustFilePath);
console.log('SLOC count:', slocCount);
