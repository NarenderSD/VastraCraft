'use client';
import React, { useEffect, useState } from 'react';

export default function PortfolioManager() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({});

  async function fetchItems() {
    setLoading(true);
    const res = await fetch('/api/portfolio');
    const data = await res.json();
    setItems(data.portfolio || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, image, category })
    });
    const data = await res.json();
    if (data.portfolio) {
      setTitle(''); setDescription(''); setImage(''); setCategory('');
      fetchItems();
    } else {
      setError(data.error || 'Failed to add portfolio item');
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this portfolio item?')) return;
    setLoading(true);
    await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' });
    fetchItems();
    setLoading(false);
  }

  function startEdit(item) {
    setEditId(item._id);
    setEditFields({ title: item.title, description: item.description, image: item.image, category: item.category });
  }

  function cancelEdit() {
    setEditId(null);
    setEditFields({});
  }

  async function saveEdit(id) {
    setLoading(true);
    await fetch(`/api/portfolio?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFields),
    });
    setEditId(null);
    setEditFields({});
    fetchItems();
    setLoading(false);
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Portfolio Manager</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 24 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required style={{ marginRight: 8, padding: 6 }} />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required style={{ marginRight: 8, padding: 6, width: 200 }} />
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" required style={{ marginRight: 8, padding: 6, width: 180 }} />
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required style={{ marginRight: 8, padding: 6, width: 120 }} />
        <button type="submit" disabled={loading} style={{ padding: 8, background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4 }}>
          Add
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              {editId === item._id ? (
                <>
                  <td><input value={editFields.title} onChange={e => setEditFields(f => ({ ...f, title: e.target.value }))} /></td>
                  <td><input value={editFields.description} onChange={e => setEditFields(f => ({ ...f, description: e.target.value }))} /></td>
                  <td><input value={editFields.image} onChange={e => setEditFields(f => ({ ...f, image: e.target.value }))} /></td>
                  <td><input value={editFields.category} onChange={e => setEditFields(f => ({ ...f, category: e.target.value }))} /></td>
                  <td>
                    <button onClick={() => saveEdit(item._id)} style={{ marginRight: 8 }}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.image ? <img src={item.image} alt={item.title} style={{ width: 60, height: 40, objectFit: 'cover' }} /> : ''}</td>
                  <td>{item.category}</td>
                  <td>
                    <button onClick={() => startEdit(item)} style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 