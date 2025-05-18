import React from 'react';
import './Sidebar.css';

const Sidebar = ({ documents, selectedDocument, onSelectDocument, onUploadClick }) => {
  return (
    <div className="sidebar">
      <h2 className="logo">📄 Chunk Mate</h2>
      <div className="document-list">
        {documents.map((doc, index) => (
          <div
            key={index}
            className={`document-item ${doc === selectedDocument ? 'active' : ''}`}
            onClick={() => onSelectDocument(doc)}
          >
            {doc}
          </div>
        ))}
      </div>
      <button className="upload-btn" onClick={onUploadClick}>Upload</button>
    </div>
  );
};

export default Sidebar;
