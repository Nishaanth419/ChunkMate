const API = 'http://localhost:5000/api';

export const fetchDocuments = async () => {
  const res = await fetch(`${API}/documents`);
  return res.json();
};

export const fetchChunks = async (id) => {
  const res = await fetch(`${API}/documents/${id}/chunks`);
  return res.json();
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API}/upload`, {
    method: 'POST',
    body: formData
  });
  return res.json();
};
