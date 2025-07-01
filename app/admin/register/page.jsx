'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', name, email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (data.token) {
      // Registration successful, redirect to login
      router.push('/admin/login');
    } else {
      setError(data.error || 'Registration failed');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, border: '1px solid #eee', borderRadius: 8, background: '#fff', boxShadow: '0 2px 12px #0001' }}>
      <h2 style={{ marginBottom: 24, fontWeight: 700, fontSize: 28, color: '#e11d48' }}>Admin/User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required style={{ marginBottom: 12, width: '100%', padding: 8 }} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required style={{ marginBottom: 12, width: '100%', padding: 8 }} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required style={{ marginBottom: 12, width: '100%', padding: 8 }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600 }}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        Already have an account?{' '}
        <a href="/admin/login" style={{ color: '#e11d48', textDecoration: 'underline' }}>Login</a>
      </div>
    </div>
  );
}

export default RegisterPage; 