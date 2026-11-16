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
