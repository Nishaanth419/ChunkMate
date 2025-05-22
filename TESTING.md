# ✅ Running Tests for Chunk Mate

This guide explains how to run all available test cases for the Chunk Mate backend, including:

- Unit tests for chunking logic (`chunkMarkdown`)
- API tests for Express routes

---

## 🧪 1. Setup for Testing

### 🔧 Install Dev Dependencies

Make sure you're in the `chunkmate-backend` directory:

```bash
cd chunkmate-backend
npm install --save-dev jest supertest
```

---

## 🧪 2. Unit Tests: Markdown Chunking

File: `tests/chunkMarkdown.test.js`

### ✅ Covers:

- Paragraph and heading chunking
- Table row chunking
- Link extraction

### ▶ Run:

```bash
npm test
```

---

## 🌐 3. API Route Tests

File: `tests/api.test.js`

### ✅ Covers:

- `GET /documents`
- `GET /documents/:id/chunks`
- `POST /upload` (no file scenario)

Mocks PostgreSQL using `jest.mock`.

---

## 🧪 4. Running All Tests

Run all test suites from the root of the backend:

```bash
npm test
```

Jest will automatically find all `.test.js` files under `/tests`.

---

## ✅ Notes

- Test timeout is increased to handle async API calls.
- Database access is mocked using `jest.mock('../db')`.
- Supertest is used to simulate HTTP requests.

---

## 📂 Test File Structure

```
chunkmate-backend/
├── tests/
│   ├── chunkMarkdown.test.js
│   └── api.test.js
```

---

## 📌 Tip: Watching Tests

For active development, use:

```bash
npx jest --watch
```

---

## 🏁 Output Example

```
PASS  tests/chunkMarkdown.test.js
PASS  tests/api.test.js
Test Suites: 2 passed
Tests:       7 passed
```


