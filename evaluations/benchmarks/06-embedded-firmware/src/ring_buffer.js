class RingBuffer {
  constructor(capacity = 8) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }
  push(val) {
    if (this.size === this.capacity) throw new Error('RingBuffer overflow');
    this.buffer[this.head] = val;
    this.head = (this.head + 1) % this.capacity;
    this.size++;
  }
  pop() {
    if (this.size === 0) throw new Error('RingBuffer underflow');
    const val = this.buffer[this.tail];
    this.tail = (this.tail + 1) % this.capacity;
    this.size--;
    return val;
  }
}
module.exports = { RingBuffer };
