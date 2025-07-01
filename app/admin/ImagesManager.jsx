'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function ImagesManager() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  async function fetchImages() {
    setLoading(true);
    const res = await fetch('/api/images');
    const data = await res.json();
    setImages(data.images || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError('');
    if (!file) {
      setError('Please select an image file.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('alt', alt);
    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.image) {
        setTitle(''); setAlt(''); setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchImages();
      } else {
        setError(data.error || 'Failed to add image');
      }
    } catch (err) {
      setError('Failed to upload image');
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this image?')) return;
    setLoading(true);
    await fetch(`/api/images?id=${id}`, { method: 'DELETE' });
    fetchImages();
    setLoading(false);
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Images Manager</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 24 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required style={{ marginRight: 8, padding: 6 }} />
        <input value={alt} onChange={e => setAlt(e.target.value)} placeholder="Alt text" required style={{ marginRight: 8, padding: 6, width: 120 }} />
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} ref={fileInputRef} required style={{ marginRight: 8, padding: 6 }} />
        <button type="submit" disabled={loading} style={{ padding: 8, background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4 }}>
          Upload
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Alt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((img) => (
            <tr key={img._id}>
              <td>{img.title}</td>
              <td>{img.url ? <img src={img.url} alt={img.alt} style={{ width: 60, height: 40, objectFit: 'cover' }} /> : ''}</td>
              <td>{img.alt}</td>
              <td>
                <button onClick={() => handleDelete(img._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 