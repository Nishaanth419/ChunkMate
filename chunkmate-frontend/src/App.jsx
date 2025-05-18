import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChunkViewer from './ChunkViewer';
import './App.css';

const App = () => {
  const [documents, setDocuments] = useState(['Document 1', 'Document 2', 'Document 3']);
  const [selectedDocument, setSelectedDocument] = useState('Document 1');
  const [chunks, setChunks] = useState({
    'Document 1': [
      'Welcome to Placeholderland...',
      'This is the part where...',
      'Here’s what we offer...',
      'Every screen you tap...'
    ],
    'Document 2': [
      'Chunk A from Doc 2',
      'Chunk B from Doc 2'
    ],
    'Document 3': [
      'Chunk A from Doc 3',
      'Chunk B from Doc 3'
    ],
  });

  const handleSelectDocument = (doc) => {
    console.log("Selected:", doc);
    setSelectedDocument(doc);
  };

  return (
    <div className="app-container">
      <Sidebar
        documents={documents}
        selectedDocument={selectedDocument}
        onSelectDocument={handleSelectDocument}
        onUploadClick={() => alert("Upload coming soon...")}
      />
      <div className="main-content">
        <h2>{selectedDocument}</h2>
        <ChunkViewer
          document={selectedDocument}
          chunks={chunks[selectedDocument] || []}
        />
      </div>
    </div>
  );
};

export default App;
