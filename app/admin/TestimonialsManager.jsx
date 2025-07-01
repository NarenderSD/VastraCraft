'use client';
import React, { useEffect, useState } from 'react';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({});

  async function fetchTestimonials() {
    setLoading(true);
    const res = await fetch('/api/testimonials');
    const data = await res.json();
    setTestimonials(data.testimonials || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, content, image, rating })
    });
    const data = await res.json();
    if (data.testimonial) {
      setName(''); setContent(''); setImage(''); setRating(5);
      fetchTestimonials();
    } else {
      setError(data.error || 'Failed to add testimonial');
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this testimonial?')) return;
    setLoading(true);
    await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
    fetchTestimonials();
    setLoading(false);
  }

  function startEdit(t) {
    setEditId(t._id);
    setEditFields({ name: t.name, content: t.content, image: t.image, rating: t.rating });
  }

  function cancelEdit() {
    setEditId(null);
    setEditFields({});
  }

  async function saveEdit(id) {
    setLoading(true);
    await fetch(`/api/testimonials?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFields),
    });
    setEditId(null);
    setEditFields({});
    fetchTestimonials();
    setLoading(false);
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Testimonials Manager</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 24 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required style={{ marginRight: 8, padding: 6 }} />
        <input value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required style={{ marginRight: 8, padding: 6, width: 200 }} />
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" style={{ marginRight: 8, padding: 6, width: 180 }} />
        <input value={rating} onChange={e => setRating(Number(e.target.value))} type="number" min={1} max={5} required style={{ marginRight: 8, padding: 6, width: 60 }} />
        <button type="submit" disabled={loading} style={{ padding: 8, background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4 }}>
          Add
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Content</th>
            <th>Image</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t._id}>
              {editId === t._id ? (
                <>
                  <td><input value={editFields.name} onChange={e => setEditFields(f => ({ ...f, name: e.target.value }))} /></td>
                  <td><input value={editFields.content} onChange={e => setEditFields(f => ({ ...f, content: e.target.value }))} /></td>
                  <td><input value={editFields.image} onChange={e => setEditFields(f => ({ ...f, image: e.target.value }))} /></td>
                  <td><input value={editFields.rating} onChange={e => setEditFields(f => ({ ...f, rating: e.target.value }))} type="number" min={1} max={5} /></td>
                  <td>
                    <button onClick={() => saveEdit(t._id)} style={{ marginRight: 8 }}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{t.name}</td>
                  <td>{t.content}</td>
                  <td>{t.image ? <img src={t.image} alt="testimonial" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} /> : ''}</td>
                  <td>{t.rating}</td>
                  <td>
                    <button onClick={() => startEdit(t)} style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => handleDelete(t._id)}>Delete</button>
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