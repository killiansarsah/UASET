class HexParser {
  static bufferToHex(buffer) {
    const hex = [];
    for (let i = 0; i < buffer.length; i++) {
      hex.push(buffer[i].toString(16).padStart(2, '0').toUpperCase());
    }
    return hex.join(' ');
  }
  static parseAscii(buffer) {
    let ascii = '';
    for (let i = 0; i < buffer.length; i++) {
      const code = buffer[i];
      ascii += (code >= 32 && code <= 126) ? String.fromCharCode(code) : '.';
    }
    return ascii;
  }
}
module.exports = { HexParser };
