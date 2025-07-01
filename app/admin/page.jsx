'use client';
import React, { useState } from 'react';
import PortfolioManager from './PortfolioManager';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const BookingManager = dynamic(() => import('./BookingManager'), { ssr: false });
const TestimonialsManager = dynamic(() => import('./TestimonialsManager'), { ssr: false });
const ContentManager = dynamic(() => import('./ContentManager'), { ssr: false });
const ImagesManager = dynamic(() => import('./ImagesManager'), { ssr: false });

function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }
  return (
    <button onClick={handleLogout} style={{ position: 'absolute', top: 32, right: 32, padding: 8, background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4 }}>
      Logout
    </button>
  );
}

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('admin_token', data.token);
      setLoggedIn(true);
    } else {
      setError(data.error || 'Login failed');
    }
  }

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, border: '1px solid #eee', borderRadius: 8, background: '#fff', boxShadow: '0 2px 12px #0001' }}>
        <h2 style={{ marginBottom: 24, fontWeight: 700, fontSize: 28, color: '#e11d48' }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required style={{ marginBottom: 12, width: '100%', padding: 8 }} />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required style={{ marginBottom: 12, width: '100%', padding: 8 }} />
          <button type="submit" style={{ width: '100%', padding: 10, background: '#e11d48', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600 }}>
            Login
          </button>
        </form>
        {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <a href="/admin/register" style={{ color: '#e11d48', textDecoration: 'underline' }}>Register here</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 32, position: 'relative' }}>
      <LogoutButton />
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Admin Dashboard</h1>
      <BookingManager />
      <hr style={{ margin: '48px 0' }} />
      <TestimonialsManager />
      <hr style={{ margin: '48px 0' }} />
      <ContentManager />
      <hr style={{ margin: '48px 0' }} />
      <ImagesManager />
      <hr style={{ margin: '48px 0' }} />
      <PortfolioManager />
    </div>
  );
} 