const fs = require('fs');

function complexity(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split(/\r?\n/);

    for (let i=0; i<lines.length; i++) {
        if (lines[i].includes('if') || lines[i].includes('else') || lines[i].includes('for') || lines[i].includes('while'))
            console.log(lines[i]);
    }
}

const rustFilePath = 'complexity-code.rs';
const complexityCount = complexity(rustFilePath);