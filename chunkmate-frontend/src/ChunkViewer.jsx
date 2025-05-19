import React, { useState } from 'react';
import './ChunkViewer.css';

const ChunkViewer = ({ chunks }) => {
  const [selectedChunk, setSelectedChunk] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Chunk copied to clipboard!');
    });
  };

  const handleDownload = (text, index) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chunk-${index + 1}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="chunk-viewer">
      {chunks.map((chunk, index) => (
        <div
          key={index}
          className={`chunk-container ${selectedChunk === index ? 'selected' : ''}`}
          onClick={() => setSelectedChunk(index)}
        >
          <div className="chunk-number">{chunk.chunk_number}</div>
          <div className="chunk-block">
            <div className="chunk-actions">
              <button onClick={(e) => { e.stopPropagation(); handleCopy(chunk.content); }}>Copy</button>
              <button onClick={(e) => { e.stopPropagation(); handleDownload(chunk.content, index); }}>Download</button>
            </div>
            <div className="chunk-text">{chunk.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChunkViewer;
