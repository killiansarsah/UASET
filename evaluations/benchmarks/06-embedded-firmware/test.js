const assert = require('assert');
const { RingBuffer } = require('./src/ring_buffer');

console.log('[*] Running NanoSensor Firmware test suite...');
const rb = new RingBuffer(4);

rb.push(10);
rb.push(20);
rb.push(30);

assert.strictEqual(rb.pop(), 10);
assert.strictEqual(rb.pop(), 20);
rb.push(40);
rb.push(50);
rb.push(60);

assert.strictEqual(rb.size, 4);
assert.throws(() => rb.push(70), /RingBuffer overflow/);

console.log('[+] All NanoSensor Firmware tests passed (4/4 assertions verified).');
