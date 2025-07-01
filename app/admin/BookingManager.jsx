'use client';
import React, { useEffect, useState } from 'react';

export default function BookingManager() {
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({});

  async function fetchBookings() {
    setLoading(true);
    const res = await fetch('/api/bookings');
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, service, date, message })
    });
    const data = await res.json();
    if (data.booking) {
      setName(''); setEmail(''); setPhone(''); setService(''); setDate(''); setMessage('');
      fetchBookings();
    } else {
      setError(data.error || 'Failed to add booking');
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this booking?')) return;
    setLoading(true);
    await fetch(`/api/bookings?id=${id}`, { method: 'DELETE' });
    fetchBookings();
    setLoading(false);
  }

  function startEdit(b) {
    setEditId(b._id);
    setEditFields({ name: b.name, email: b.email, phone: b.phone, service: b.service, date: b.date, message: b.message, status: b.status });
  }

  function cancelEdit() {
    setEditId(null);
    setEditFields({});
  }

  async function saveEdit(id) {
    setLoading(true);
    await fetch(`/api/bookings?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFields),
    });
    setEditId(null);
    setEditFields({});
    fetchBookings();
    setLoading(false);
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Booking Manager</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 24 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required style={{ marginRight: 8, padding: 6 }} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required style={{ marginRight: 8, padding: 6 }} />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" required style={{ marginRight: 8, padding: 6 }} />
        <input value={service} onChange={e => setService(e.target.value)} placeholder="Service" required style={{ marginRight: 8, padding: 6 }} />
        <input value={date} onChange={e => setDate(e.target.value)} type="date" required style={{ marginRight: 8, padding: 6 }} />
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" style={{ marginRight: 8, padding: 6, width: 120 }} />
        <button type="submit" disabled={loading} style={{ padding: 8, background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4 }}>
          Add
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Date</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              {editId === b._id ? (
                <>
                  <td><input value={editFields.name} onChange={e => setEditFields(f => ({ ...f, name: e.target.value }))} /></td>
                  <td><input value={editFields.email} onChange={e => setEditFields(f => ({ ...f, email: e.target.value }))} /></td>
                  <td><input value={editFields.phone} onChange={e => setEditFields(f => ({ ...f, phone: e.target.value }))} /></td>
                  <td><input value={editFields.service} onChange={e => setEditFields(f => ({ ...f, service: e.target.value }))} /></td>
                  <td><input value={editFields.date} onChange={e => setEditFields(f => ({ ...f, date: e.target.value }))} type="date" /></td>
                  <td><input value={editFields.message} onChange={e => setEditFields(f => ({ ...f, message: e.target.value }))} /></td>
                  <td><input value={editFields.status} onChange={e => setEditFields(f => ({ ...f, status: e.target.value }))} /></td>
                  <td>
                    <button onClick={() => saveEdit(b._id)} style={{ marginRight: 8 }}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.service}</td>
                  <td>{b.date ? new Date(b.date).toLocaleDateString() : ''}</td>
                  <td>{b.message}</td>
                  <td>{b.status}</td>
                  <td>
                    <button onClick={() => startEdit(b)} style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => handleDelete(b._id)}>Delete</button>
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