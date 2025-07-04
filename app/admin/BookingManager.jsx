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
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gradient-to-r from-rose-100 to-pink-100 text-gray-800">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Service</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="even:bg-rose-50 hover:bg-pink-50 transition-colors">
                {editId === b._id ? (
                  <>
                    <td><input value={editFields.name || ""} onChange={e => setEditFields(f => ({ ...f, name: e.target.value }))} className="border rounded px-2 py-1 w-full" /></td>
                    <td><input value={editFields.email || ""} onChange={e => setEditFields(f => ({ ...f, email: e.target.value }))} className="border rounded px-2 py-1 w-full" /></td>
                    <td><input value={editFields.phone || ""} onChange={e => setEditFields(f => ({ ...f, phone: e.target.value }))} className="border rounded px-2 py-1 w-full" /></td>
                    <td><input value={editFields.service || ""} onChange={e => setEditFields(f => ({ ...f, service: e.target.value }))} className="border rounded px-2 py-1 w-full" /></td>
                    <td><input value={editFields.date || ""} onChange={e => setEditFields(f => ({ ...f, date: e.target.value }))} type="date" className="border rounded px-2 py-1 w-full" /></td>
                    <td><input value={editFields.message || ""} onChange={e => setEditFields(f => ({ ...f, message: e.target.value }))} className="border rounded px-2 py-1 w-full" /></td>
                    <td><input value={editFields.status || ""} onChange={e => setEditFields(f => ({ ...f, status: e.target.value }))} className="border rounded px-2 py-1 w-full" /></td>
                    <td>
                      <button onClick={() => saveEdit(b._id)} className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                      <button onClick={cancelEdit} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
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
                      <button onClick={() => startEdit(b)} className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                      <button onClick={() => handleDelete(b._id)} className="px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-600">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 