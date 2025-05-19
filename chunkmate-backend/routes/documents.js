const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('../db');
const { chunkMarkdown } = require('../utils/chunkMarkdown');

const router = express.Router();

router.post('/upload', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const file = req.files.file;
  if (!file.name.endsWith('.md')) {
    return res.status(400).json({ error: 'Only .md files supported' });
  }

  const uploadPath = path.join(__dirname, '..', 'uploads', file.name);
  await file.mv(uploadPath);
  const content = fs.readFileSync(uploadPath, 'utf8');

  try {
    const chunks = chunkMarkdown(content);
    console.log(`Chunked ${chunks.length} sections`);
    console.log(JSON.stringify(chunks, null, 2));

    const docResult = await db.query(
      'INSERT INTO documents (name) VALUES ($1) RETURNING id',
      [file.name]
    );
    const documentId = docResult.rows[0].id;

    for (let i = 0; i < chunks.length; i++) {
      const { content: chunkContent, links } = chunks[i];
      console.log(`Inserting chunk ${i + 1}:\n`, chunkContent);

      const chunkRes = await db.query(
        'INSERT INTO chunks (document_id, chunk_number, content) VALUES ($1, $2, $3) RETURNING id',
        [documentId, i + 1, chunkContent]
      );

      const chunkId = chunkRes.rows[0].id;

      for (const url of links) {
        await db.query(
          'INSERT INTO hyperlinks (document_id, chunk_id, url) VALUES ($1, $2, $3)',
          [documentId, chunkId, url]
        );
      }
      console.log(`Inserted ${links.length} links for chunk ${i + 1}`);
    }

    console.log("Finished upload for:", file.name);
    res.json({ message: 'Document uploaded and chunked.' });
  } catch (err) {
    console.error('Error processing upload:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/documents', async (_, res) => {
  try {
    const result = await db.query('SELECT * FROM documents ORDER BY upload_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ error: 'Could not fetch documents' });
  }
});

router.get('/documents/:id/chunks', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT chunk_number, content FROM chunks WHERE document_id = $1 ORDER BY chunk_number',
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching chunks:', err);
    res.status(500).json({ error: 'Could not fetch chunks' });
  }
});

module.exports = router;
