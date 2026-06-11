const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\Pulse Mais\\OneDrive\\Project Grace Hooper\\grace-hopper-web\\app\\api\\interview\\start\\route.ts', 'utf8');

let braces = 0;
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  // Strip strings and comments to avoid false positives
  let cleanLine = line.replace(/("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`|\/\/.*|\/\*[\s\S]*?\*\/)/g, '');
  
  for (let char of cleanLine) {
    if (char === '{') {
      braces++;
      console.log(`Line ${i + 1}: { opened (count: ${braces}) -> ${line.trim()}`);
    } else if (char === '}') {
      braces--;
      console.log(`Line ${i + 1}: } closed (count: ${braces}) -> ${line.trim()}`);
    }
  }
}
console.log(`Final brace count: ${braces}`);
