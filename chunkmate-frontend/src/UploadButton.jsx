import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  background-color: #6da9b5;
  color: white;
  padding: 0.75rem 1.2rem;
  border-radius: 6px;
  margin-top: 2rem;
  text-align: center;
  display: block;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const UploadButton = ({ onFileSelect }) => (
  <>
    <Label htmlFor="upload">Upload</Label>
    <Input
      type="file"
      id="upload"
      accept=".md"
      onChange={(e) => {
        if (e.target.files.length > 0) {
          onFileSelect(e.target.files[0]);
        }
      }}
    />
  </>
);

export default UploadButton;
