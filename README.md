# 🧠 Chunk Mate

**Chunk Mate** is a web-based tool designed for AI/LLM workflows that lets you upload `.md` (Markdown) files, chunk them into logical sections (paragraphs, table rows), and store them in a PostgreSQL database for downstream processing.

---

## 📦 Features

- 📝 Upload Markdown (`.md`) documents
- ✂️ Automatically chunk paragraphs and tables
- 🔗 Extract and store hyperlinks
- 📄 View documents and chunks in the frontend
- 📥 Copy/download chunks
- 🌐 Built with React + Express + PostgreSQL

---

## 🛠 Tech Stack

| Layer     | Tech                         |
|-----------|------------------------------|
| Frontend  | React + Vite + Styled CSS    |
| Backend   | Node.js + Express + marked   |
| Database  | PostgreSQL                   |
| Other     | express-fileupload, pg       |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Nishaanth419/ChunkMate.git
cd ChunkMate
```

---

### 2. Setup PostgreSQL16 Database

1. Install **pgAdmin4** v.9.0 https://www.pgadmin.org/download/pgadmin-4-windows/.
2. Create a new database (e.g., `chunkmate`).
3. Run the SQL in `backend/schema.sql` or:

```sql
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  upload_date TIMESTAMP DEFAULT NOW()
);
```
```sql
CREATE TABLE chunks (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
  chunk_number INTEGER NOT NULL,
  content TEXT NOT NULL
);
```

```sql
CREATE TABLE hyperlinks (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
  chunk_id INTEGER REFERENCES chunks(id) ON DELETE CASCADE,
  url TEXT NOT NULL
);
```

---

### 3. Configure Environment Variables

In `chunkmate-backend/`, create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD="Your pgadmin password"
DB_DATABASE="Database Name"
```

---

### 4. Run the Backend

```bash
cd chunkmate-backend
npm install
node index.js
```

It should show:
```
Server started on http://localhost:5000
```

---

### 5. Run the Frontend

```bash
cd ../chunkmate-frontend
npm install
npm install axios
npm run dev
```

Frontend should run at:
```
http://localhost:3000
```

---

## 📂 Directory Structure

```
chunk-mate/
├── chunkmate-frontend/    # React frontend
├── chunkmate-backend/     # Express backend
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── .env
└── README.md
```

---

## 📌 Notes

- Only `.md` files are accepted.
- Paragraphs are separated based on empty lines.
- Each table row becomes a separate chunk.
- All links (even inside tables) are extracted and stored.

---

## 📷 UI Highlights

- 📄 Left Sidebar: list of uploaded documents  
- 🔍 Main Panel: chunks with copy/download  
- ⭐ Highlights selected chunk  
- 🔗 Links stored in DB 

---



## 🧪 Sample Test File

```md
# Heading 1
This is a paragraph.

Another paragraph.

| Feature | Description | Link |
|---------|-------------|------|
| Login   | [auth](https://login.com) | OK |
```

---




## 📦 Install Dependencies

### 🔧 Backend

```bash
cd chunkmate-backend
npm install express pg dotenv marked express-fileupload cors
```

### 🔧 Frontend

```bash
cd chunkmate-frontend
npm install
npm install axios
```

---

## 📄 Sample package.json

### ✅ Backend (chunkmate-backend/package.json)

```json
{
  "name": "chunkmate-backend",
  "version": "1.0.0",
  "main": "index.js",
  "type": "commonjs",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-fileupload": "^1.4.0",
    "marked": "^9.0.3",
    "pg": "^8.11.1"
  }
}
```

### ✅ Frontend (chunkmate-frontend/package.json)

```json
{
  "name": "chunkmate-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.1.0",
    "vite": "^5.0.0"
  }
}
```
# Testing Chunking and API Calls 
## Refer TESTING.md file 
