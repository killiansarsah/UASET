class DistributedQueue {
  constructor() {
    this.partitions = new Map();
  }
  enqueue(topic, partitionId, message) {
    const key = topic + ':' + partitionId;
    if (!this.partitions.has(key)) this.partitions.set(key, []);
    const queue = this.partitions.get(key);
    const offset = queue.length;
    const record = { offset, topic, partitionId, message, timestamp: Date.now() };
    queue.push(record);
    return record;
  }
  poll(topic, partitionId, fromOffset = 0, limit = 10) {
    const key = topic + ':' + partitionId;
    const queue = this.partitions.get(key) || [];
    return queue.slice(fromOffset, fromOffset + limit);
  }
}
module.exports = { DistributedQueue };
