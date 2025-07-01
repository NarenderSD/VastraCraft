'use client';
import React, { useEffect, useState } from 'react';

export default function ContentManager() {
  const [contents, setContents] = useState([]);
  const [title, setTitle] = useState('');
  const [keyName, setKeyName] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({});

  async function fetchContents() {
    setLoading(true);
    const res = await fetch('/api/content');
    const data = await res.json();
    setContents(data.contents || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchContents();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, key: keyName, value })
    });
    const data = await res.json();
    if (data.content) {
      setTitle(''); setKeyName(''); setValue('');
      fetchContents();
    } else {
      setError(data.error || 'Failed to add content');
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this content block?')) return;
    setLoading(true);
    await fetch(`/api/content?id=${id}`, { method: 'DELETE' });
    fetchContents();
    setLoading(false);
  }

  function startEdit(c) {
    setEditId(c._id);
    setEditFields({ title: c.title, key: c.key, value: c.value });
  }

  function cancelEdit() {
    setEditId(null);
    setEditFields({});
  }

  async function saveEdit(id) {
    setLoading(true);
    await fetch(`/api/content?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFields),
    });
    setEditId(null);
    setEditFields({});
    fetchContents();
    setLoading(false);
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Content Manager</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 24 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required style={{ marginRight: 8, padding: 6 }} />
        <input value={keyName} onChange={e => setKeyName(e.target.value)} placeholder="Key" required style={{ marginRight: 8, padding: 6 }} />
        <input value={value} onChange={e => setValue(e.target.value)} placeholder="Value" required style={{ marginRight: 8, padding: 6, width: 200 }} />
        <button type="submit" disabled={loading} style={{ padding: 8, background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4 }}>
          Add
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Key</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((c) => (
            <tr key={c._id}>
              {editId === c._id ? (
                <>
                  <td><input value={editFields.title} onChange={e => setEditFields(f => ({ ...f, title: e.target.value }))} /></td>
                  <td><input value={editFields.key} onChange={e => setEditFields(f => ({ ...f, key: e.target.value }))} /></td>
                  <td><input value={editFields.value} onChange={e => setEditFields(f => ({ ...f, value: e.target.value }))} /></td>
                  <td>
                    <button onClick={() => saveEdit(c._id)} style={{ marginRight: 8 }}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{c.title}</td>
                  <td>{c.key}</td>
                  <td>{c.value}</td>
                  <td>
                    <button onClick={() => startEdit(c)} style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => handleDelete(c._id)}>Delete</button>
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