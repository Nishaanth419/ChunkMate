import React from 'react';
import './Sidebar.css';

const Sidebar = ({ documents, selectedDocument, onSelect, onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.md')) {
      onUpload(file);
    } else {
      alert('Only .md files are supported.');
    }
  };

  return (
    <div className="sidebar">
      <h2>📄 Chunk Mate</h2>
      <ul className="document-list">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className={doc.id === selectedDocument ? 'active' : ''}
            onClick={() => onSelect(doc)}
          >
            {doc.name}
          </li>
        ))}
      </ul>

      {/* Upload button fixed at bottom */}
      <div className="upload-wrapper">
        <label className="upload-btn">
          Upload
          <input type="file" accept=".md" onChange={handleFileChange} hidden />
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
