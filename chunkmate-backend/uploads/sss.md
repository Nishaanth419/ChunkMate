# 📚 Chunk Mate

**Chunk Mate** is a web-based tool for uploading and processing Markdown documents by breaking them into logical chunks, including support for headings, paragraphs, tables, and references. It's designed to assist Generative AI workflows by making documents easier to analyze.

---

## 🚀 Features

- Upload Markdown `.md` files via a drag-and-drop UI
- View a sidebar with all uploaded documents
- Automatically chunks documents by:
  - Paragraphs (with heading context)
  - Tables (each row as a separate chunk)
  - Extracts and stores hyperlinks separately
- Highlight and view chunks with chunk numbers
- Responsive UI built with React + Vite
- Backend using Express.js and PostgreSQL

---

## 🧱 Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React + Vite | Node.js + Express | PostgreSQL |

---

## 📁 Project Structure

```
chunk-mate/
├── chunkmate-frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── api.js
│   │   └── ...
│   └── index.html
├── chunkmate-backend/
│   ├── uploads/
│   ├── routes/
│   ├── models/
│   ├── db.js
│   └── server.js
├── README.md
└── .env
```

---

## ⚙️ Setup Instructions

### 🖥️ 1. Clone the repository

```bash
git clone https://github.com/your-username/chunk-mate.git
cd chunk-mate
```

---

### 🗃️ 2. Setup the Backend

```bash
cd chunkmate-backend
npm install
```

- Create a `.env` file:

```env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/chunkmate
```

- Start the server:

```bash
node server.js
```

---

### 🖼️ 3. Setup the Frontend

```bash
cd chunkmate-frontend
npm install
npm run dev
```

Open in your browser at: [http://localhost:3000](http://localhost:3000)

---

## 🗃️ Database Schema

- **documents**: stores uploaded file info
- **chunks**: stores segmented text
- **references**: stores extracted hyperlinks with reference to chunks

Make sure the tables are initialized before use.

---

## 📦 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET`  | `/api/documents` | Get all documents |
| `POST` | `/api/documents/upload` | Upload `.md` file |
| `GET`  | `/api/documents/:id/chunks` | Get chunks of a document |

---

## 📝 To Do / Improvements

- Add search and filter support
- Add Markdown rendering
- Support for PDF/docx input
- Download or copy individual chunks

---

## 📃 License

MIT License © 2025

---

## 💬 Author

Built with ❤️ by [Your Name]
