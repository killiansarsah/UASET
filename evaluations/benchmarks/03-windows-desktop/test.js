const assert = require('assert');
const { HexParser } = require('./src/hex_parser');

console.log('[*] Running HexViewer Desktop test suite...');
const buf = Buffer.from('UASET 2026');
const hex = HexParser.bufferToHex(buf);
const ascii = HexParser.parseAscii(buf);

assert.strictEqual(hex, '55 41 53 45 54 20 32 30 32 36');
assert.strictEqual(ascii, 'UASET 2026');

console.log('[+] All HexViewer Desktop tests passed (2/2 assertions verified).');
