'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      router.push('/admin');
    } else {
      setError(data.error || 'Login failed');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, border: '1px solid #eee', borderRadius: 8 }}>
      <h2 style={{ marginBottom: 24 }}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required style={{ marginBottom: 12, width: '100%', padding: 8 }} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required style={{ marginBottom: 12, width: '100%', padding: 8 }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4 }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
} 