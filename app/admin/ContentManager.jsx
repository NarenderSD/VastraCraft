'use client';
import React, { useEffect, useState } from 'react';

export default function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    setLoading(true);
    const res = await fetch('/api/contact');
    const data = await res.json();
    setContacts(data.contacts || []);
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Submissions</h2>
      {loading ? (
        <div>Loading...</div>
      ) : contacts.length === 0 ? (
        <div>No contact submissions found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Service</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td className="px-4 py-2 border">{c.name}</td>
                  <td className="px-4 py-2 border">{c.email}</td>
                  <td className="px-4 py-2 border">{c.phone}</td>
                  <td className="px-4 py-2 border">{c.service}</td>
                  <td className="px-4 py-2 border">{c.message}</td>
                  <td className="px-4 py-2 border">{new Date(c.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 