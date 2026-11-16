const assert = require('assert');
const { DistributedQueue } = require('./src/queue');

console.log('[*] Running StreamGrid Distributed Backend test suite...');
const q = new DistributedQueue();

const r1 = q.enqueue('events', 0, { event: 'user_created', uid: 1 });
const r2 = q.enqueue('events', 0, { event: 'order_placed', oid: 99 });
assert.strictEqual(r1.offset, 0);
assert.strictEqual(r2.offset, 1);

const records = q.poll('events', 0, 0, 10);
assert.strictEqual(records.length, 2);
assert.strictEqual(records[1].message.event, 'order_placed');

console.log('[+] All StreamGrid Distributed Backend tests passed (3/3 assertions verified).');
