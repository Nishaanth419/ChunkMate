import React, { useState } from 'react';
import './ChunkViewer.css';

const ChunkViewer = ({ document, chunks }) => {
  const [selectedChunkIndex, setSelectedChunkIndex] = useState(null);

  return (
    <div className="chunk-viewer">
      {chunks.map((chunk, index) => (
        <div
          key={index}
          className={`chunk-block ${selectedChunkIndex === index ? 'selected' : ''}`}
          onClick={() => setSelectedChunkIndex(index)}
        >
          <div className="chunk-number">{index + 1}</div>
          <div className="chunk-text">{chunk}</div>
        </div>
      ))}
    </div>
  );
};

export default ChunkViewer;
