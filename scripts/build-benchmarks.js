/**
 * UASET Benchmark Suite Builder
 * Builds 6 representative, functional software engineering projects with runnable tests
 */

const fs = require('fs');
const path = require('path');

const BENCHMARKS_DIR = path.join(__dirname, '..', 'evaluations', 'benchmarks');

const PROJECTS = [
  // 1. Full-Stack SaaS
  {
    id: '01-fullstack-saas',
    name: 'CloudPulse SaaS Platform',
    domain: 'Full-stack SaaS',
    files: {
      'package.json': JSON.stringify({
        name: 'cloudpulse-saas',
        version: '1.0.0',
        scripts: { test: 'node test.js' }
      }, null, 2),
      'next.config.js': 'module.exports = { reactStrictMode: true };',
      'app/layout.tsx': '// Next.js App Router root layout\nexport default function RootLayout({ children }) { return children; }',
      'src/auth.js': `
class AuthService {
  constructor() {
    this.users = new Map();
  }
  register(email, password) {
    if (!email || !email.includes('@')) throw new Error('Invalid email');
    if (!password || password.length < 8) throw new Error('Password must be at least 8 chars');
    if (this.users.has(email)) throw new Error('User already exists');
    const user = { id: 'usr_' + Math.random().toString(36).substr(2, 9), email, role: 'member' };
    this.users.set(email, user);
    return user;
  }
  authenticate(email, password) {
    const user = this.users.get(email);
    if (!user) throw new Error('Authentication failed');
    return { token: 'jwt_' + Buffer.from(email).toString('base64'), user };
  }
}
module.exports = { AuthService };
`,
      'test.js': `
const assert = require('assert');
const { AuthService } = require('./src/auth');

console.log('[*] Running CloudPulse SaaS test suite...');
const auth = new AuthService();

// Test registration
const user = auth.register('alice@example.com', 'securePassword123');
assert.strictEqual(user.email, 'alice@example.com');
assert.strictEqual(user.role, 'member');

// Test password length constraint
assert.throws(() => auth.register('bob@example.com', 'short'), /Password must be at least 8 chars/);

// Test auth
const session = auth.authenticate('alice@example.com', 'securePassword123');
assert(session.token.startsWith('jwt_'));

console.log('[+] All CloudPulse SaaS tests passed (3/3 assertions verified).');
`,
      'PRD.md': '# CloudPulse SaaS PRD\nApproved Gate G0.',
      'ARCHITECTURE.md': '# CloudPulse Architecture\nApproved Gate G1.',
      'SECURITY.md': '# CloudPulse Security\nApproved Gate G6.'
    }
  },

  // 2. Mobile Application
  {
    id: '02-mobile-app',
    name: 'FitTrack Mobile',
    domain: 'Mobile Application',
    files: {
      'package.json': JSON.stringify({
        name: 'fittrack-mobile',
        version: '1.0.0',
        scripts: { test: 'node test.js' }
      }, null, 2),
      'app.json': JSON.stringify({ expo: { name: 'FitTrack', slug: 'fittrack' } }, null, 2),
      'src/tracker.js': `
class WorkoutTracker {
  constructor() {
    this.workouts = [];
  }
  logWorkout(type, durationMins, calories) {
    if (durationMins <= 0) throw new Error('Duration must be positive');
    const entry = { id: this.workouts.length + 1, type, durationMins, calories, timestamp: Date.now() };
    this.workouts.push(entry);
    return entry;
  }
  getTotalCalories() {
    return this.workouts.reduce((sum, w) => sum + w.calories, 0);
  }
}
module.exports = { WorkoutTracker };
`,
      'test.js': `
const assert = require('assert');
const { WorkoutTracker } = require('./src/tracker');

console.log('[*] Running FitTrack Mobile test suite...');
const tracker = new WorkoutTracker();

tracker.logWorkout('Running', 30, 320);
tracker.logWorkout('Cycling', 45, 450);

assert.strictEqual(tracker.workouts.length, 2);
assert.strictEqual(tracker.getTotalCalories(), 770);
assert.throws(() => tracker.logWorkout('Swimming', -10, 100), /Duration must be positive/);

console.log('[+] All FitTrack Mobile tests passed (3/3 assertions verified).');
`,
      'PRD.md': '# FitTrack Mobile PRD\nApproved Gate G0.',
      'DESIGN.md': '# FitTrack Mobile Design & Tokens\nApproved Gate G2.'
    }
  },

  // 3. Windows Desktop Application
  {
    id: '03-windows-desktop',
    name: 'HexViewer Pro Desktop',
    domain: 'Windows / Desktop Application',
    files: {
      'package.json': JSON.stringify({
        name: 'hexviewer-desktop',
        version: '1.0.0',
        scripts: { test: 'node test.js' }
      }, null, 2),
      'tauri.conf.json': JSON.stringify({ package: { productName: 'HexViewer' } }, null, 2),
      'src/hex_parser.js': `
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
`,
      'test.js': `
const assert = require('assert');
const { HexParser } = require('./src/hex_parser');

console.log('[*] Running HexViewer Desktop test suite...');
const buf = Buffer.from('UASET 2026');
const hex = HexParser.bufferToHex(buf);
const ascii = HexParser.parseAscii(buf);

assert.strictEqual(hex, '55 41 53 45 54 20 32 30 32 36');
assert.strictEqual(ascii, 'UASET 2026');

console.log('[+] All HexViewer Desktop tests passed (2/2 assertions verified).');
`,
      'PRD.md': '# HexViewer PRD\nApproved Gate G0.',
      'ARCHITECTURE.md': '# HexViewer Architecture\nApproved Gate G1.'
    }
  },

  // 4. AI / Generative System
  {
    id: '04-ai-application',
    name: 'AgenticRAG AI Engine',
    domain: 'AI / Generative System',
    files: {
      'package.json': JSON.stringify({
        name: 'agentic-rag-engine',
        version: '1.0.0',
        scripts: { test: 'node test.js' }
      }, null, 2),
      'langchain.config.js': 'module.exports = { version: "0.2" };',
      'src/rag_pipeline.js': `
class VectorMemory {
  constructor() {
    this.documents = [];
  }
  addDocument(id, text, metadata = {}) {
    this.documents.push({ id, text, metadata });
  }
  similaritySearch(query, topK = 2) {
    const queryTerms = query.toLowerCase().split(/\\s+/);
    const scored = this.documents.map(doc => {
      let score = 0;
      queryTerms.forEach(t => { if (doc.text.toLowerCase().includes(t)) score++; });
      return { ...doc, score };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, topK);
  }
}
module.exports = { VectorMemory };
`,
      'test.js': `
const assert = require('assert');
const { VectorMemory } = require('./src/rag_pipeline');

console.log('[*] Running AgenticRAG AI test suite...');
const memory = new VectorMemory();

memory.addDocument('doc1', 'Antigravity multi-agent systems coordinate software engineering.');
memory.addDocument('doc2', 'JavaScript engines execute async event loops efficiently.');
memory.addDocument('doc3', 'Quality gates enforce strict security and test verifications in Antigravity.');

const results = memory.similaritySearch('Antigravity quality verification', 2);
assert.strictEqual(results.length, 2);
assert(results[0].text.includes('Antigravity'));

console.log('[+] All AgenticRAG AI tests passed (2/2 assertions verified).');
`,
      'PRD.md': '# AgenticRAG PRD\nApproved Gate G0.',
      'ARCHITECTURE.md': '# AgenticRAG Architecture\nApproved Gate G1.'
    }
  },

  // 5. Distributed Backend System
  {
    id: '05-distributed-backend',
    name: 'StreamGrid Distributed Queue',
    domain: 'Distributed Backend / Microservices',
    files: {
      'package.json': JSON.stringify({
        name: 'streamgrid-queue',
        version: '1.0.0',
        scripts: { test: 'node test.js' }
      }, null, 2),
      'docker-compose.yml': 'version: "3.8"\nservices:\n  streamgrid:\n    build: .\n    ports:\n      - "8080:8080"',
      'src/queue.js': `
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
`,
      'test.js': `
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
`,
      'PRD.md': '# StreamGrid PRD\nApproved Gate G0.',
      'ARCHITECTURE.md': '# StreamGrid Architecture\nApproved Gate G1.'
    }
  },

  // 6. Embedded Firmware Application
  {
    id: '06-embedded-firmware',
    name: 'NanoSensor RTOS Firmware',
    domain: 'Embedded / Firmware System',
    files: {
      'package.json': JSON.stringify({
        name: 'nanosensor-firmware',
        version: '1.0.0',
        scripts: { test: 'node test.js' }
      }, null, 2),
      'platformio.ini': '[env:stm32]\nplatform = ststm32\nframework = freertos',
      'src/ring_buffer.js': `
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
`,
      'test.js': `
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
`,
      'PRD.md': '# NanoSensor Firmware PRD\nApproved Gate G0.',
      'ARCHITECTURE.md': '# NanoSensor Architecture\nApproved Gate G1.'
    }
  }
];

let created = 0;
for (const proj of PROJECTS) {
  const projDir = path.join(BENCHMARKS_DIR, proj.id);
  fs.mkdirSync(projDir, { recursive: true });

  for (const [fileRel, content] of Object.entries(proj.files)) {
    const fullPath = path.join(projDir, fileRel);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  }
  created++;
}

console.log(`Successfully built ${created} benchmark projects in ${BENCHMARKS_DIR}.`);
