import React from 'react';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white flex flex-col">
      {children}
    </div>
  );
} 