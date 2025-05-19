import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ChunkViewer from './ChunkViewer';
import { fetchDocuments, fetchChunks, uploadFile } from './api';
import './App.css';

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [selectedDocName, setSelectedDocName] = useState('');
  const [chunks, setChunks] = useState([]);
  const [message, setMessage] = useState(null); // ✅ message state

  const loadDocuments = async () => {
    const docs = await fetchDocuments();
    setDocuments(docs);
    if (docs.length > 0) {
      selectDocument(docs[0]);
    }
  };

  const selectDocument = async (doc) => {
    setSelectedDocId(doc.id);
    setSelectedDocName(doc.name);
    const chunkData = await fetchChunks(doc.id);
    setChunks(chunkData);
  };

  const handleUpload = async (file) => {
    try {
      const res = await uploadFile(file);
      if (res.message) {
        setMessage({ type: 'success', text: res.message });
      } else {
        setMessage({ type: 'error', text: 'Upload completed but no message returned.' });
      }
      await loadDocuments();
    } catch (err) {
      setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
    }

    // Auto-dismiss after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <div className="app-container">
      <Sidebar
        documents={documents}
        selectedDocument={selectedDocId}
        onSelect={selectDocument}
        onUpload={handleUpload}
      />

      <div className="main-content">
        {/* ✅ Message Alert */}
        {message && (
          <div className={`alert ${message.type}`}>
            {message.text}
          </div>
        )}
        
        <h2>{selectedDocName || 'Select a document'}</h2>
        <ChunkViewer chunks={chunks} />
      </div>
    </div>
  );
};

export default App;
