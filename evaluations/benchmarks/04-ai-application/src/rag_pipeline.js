class VectorMemory {
  constructor() {
    this.documents = [];
  }
  addDocument(id, text, metadata = {}) {
    this.documents.push({ id, text, metadata });
  }
  similaritySearch(query, topK = 2) {
    const queryTerms = query.toLowerCase().split(/\s+/);
    const scored = this.documents.map(doc => {
      let score = 0;
      queryTerms.forEach(t => { if (doc.text.toLowerCase().includes(t)) score++; });
      return { ...doc, score };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, topK);
  }
}
module.exports = { VectorMemory };
