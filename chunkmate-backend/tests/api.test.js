jest.mock('../db', () => ({
  query: jest.fn(),
}));

const db = require('../db');
const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('../routes/documents');
const request = require('supertest');

jest.setTimeout(10000); // Extend timeout if needed

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use('/', routes);

describe('API /documents', () => {
  beforeEach(() => {
    db.query.mockReset();
  });

  it('should return documents list', async () => {
    db.query.mockResolvedValueOnce({
      rows: [
        { id: 1, name: 'test.md', upload_date: '2024-01-01' }
      ]
    });

    const res = await request(app).get('/documents');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('test.md');
  });

  it('should return chunks for a document', async () => {
    db.query.mockResolvedValueOnce({
      rows: [
        { chunk_number: 1, content: 'Chunk 1 content' },
        { chunk_number: 2, content: 'Chunk 2 content' }
      ]
    });

    const res = await request(app).get('/documents/1/chunks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[1].content).toContain('Chunk 2 content');
  });

  it('should return error for upload with no file', async () => {
    const res = await request(app).post('/upload');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/No file uploaded/i);
  });
});
