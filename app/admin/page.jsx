'use client';
import React, { useState } from 'react';
import PortfolioManager from './PortfolioManager';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FaBars, FaTachometerAlt, FaBook, FaUserFriends, FaImages, FaStar, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const BookingManager = dynamic(() => import('./BookingManager'), { ssr: false });
const TestimonialsManager = dynamic(() => import('./TestimonialsManager'), { ssr: false });
const ContentManager = dynamic(() => import('./ContentManager'), { ssr: false });
const ImagesManager = dynamic(() => import('./ImagesManager'), { ssr: false });
// ContactManager was written into ContentManager.jsx, so import as ContentManager
// If you want to split, rename the file and update here.

const SIDEBAR = [
  { key: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { key: 'bookings', label: 'Bookings', icon: <FaBook /> },
  { key: 'contacts', label: 'Contacts', icon: <FaUserFriends /> },
  { key: 'portfolio', label: 'Portfolio', icon: <FaImages /> },
  { key: 'testimonials', label: 'Testimonials', icon: <FaStar /> },
  { key: 'images', label: 'Images', icon: <FaImages /> },
];

function PremiumLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="mb-4">
        <Image src="/logo2.png" alt="Loading" width={60} height={60} className="rounded-full shadow-lg" />
      </motion.div>
      <div className="text-rose-500 font-bold text-lg tracking-widest animate-pulse">Loading...</div>
    </div>
  );
}

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
  const [section, setSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Simulate loading for section change
  function handleSectionChange(key) {
    setLoading(true);
    setTimeout(() => {
      setSection(key);
      setLoading(false);
    }, 500);
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-rose-600 to-pink-500 shadow-md sticky top-0 z-30 mt-[5.5rem] w-full">
        <div className="flex items-center gap-3">
          <button className="lg:hidden text-white text-2xl mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <Image src="/logo2.png" alt="Logo" width={40} height={40} className="rounded-full shadow" />
          <span className="text-2xl font-extrabold text-white tracking-tight font-playfair">Premium Tailoring</span>
          <span className="ml-2 px-2 py-1 bg-white/20 rounded text-white text-xs font-semibold hidden sm:inline">Admin Panel</span>
        </div>
        <LogoutButton />
      </header>
      <div className="flex flex-1 min-h-0 relative">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || typeof window === 'undefined' || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -260, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              className="w-56 bg-gradient-to-b from-rose-100 to-pink-50 border-r border-rose-200 p-6 flex flex-col gap-4 fixed lg:static z-20 h-full lg:h-auto top-0 left-0 shadow-lg lg:shadow-none max-h-screen overflow-y-auto lg:overflow-visible"
              style={{ minHeight: '100vh' }}
            >
              <div className="flex flex-col gap-2 mt-8 lg:mt-0">
                {SIDEBAR.map((item) => (
                  <motion.button
                    key={item.key}
                    whileHover={{ scale: 1.04, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 text-left px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-lg ${section === item.key ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow' : 'text-rose-700 hover:bg-rose-200'}`}
                    onClick={() => { setSidebarOpen(false); handleSectionChange(item.key); }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
              <div className="mt-auto pt-8 text-xs text-rose-400 font-semibold text-center animate-fade-in">
                &copy; {new Date().getFullYear()} Premium Tailoring<br />All rights reserved.
                <div className="mt-2 text-gray-400 text-xs">
                  Build by <a href="https://www.linkedin.com/in/narender-singh-1b7b2b1b2/" target="_blank" rel="noopener noreferrer" className="underline hover:text-rose-500 transition-colors">Narender Singh</a>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-x-auto ml-0 lg:ml-56 transition-all duration-300 min-w-0">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center h-[60vh]">
                <PremiumLoader />
              </motion.div>
            ) : (
              <motion.div key={section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                {section === 'dashboard' && (
                  <div>
                    <h1 className="text-3xl font-extrabold mb-6 font-playfair text-rose-600 animate-fade-in">Welcome to the Admin Dashboard</h1>
                    <p className="text-lg text-gray-700 mb-4 animate-fade-in">Use the sidebar to manage bookings, contacts, portfolio, testimonials, and images.</p>
                  </div>
                )}
                {section === 'bookings' && <BookingManager />}
                {section === 'contacts' && <ContentManager />}
                {section === 'portfolio' && <PortfolioManager />}
                {section === 'testimonials' && <TestimonialsManager />}
                {section === 'images' && <ImagesManager />}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
} 