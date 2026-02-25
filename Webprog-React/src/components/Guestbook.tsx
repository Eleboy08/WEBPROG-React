import React, { useState, useEffect } from 'react';

// TypeScript Interface for Supabase data
interface GuestbookLog {
  id?: string;
  name: string;
  message: string;
  created_at?: string;
}

export default function Guestbook() {
  const [logs, setLogs] = useState<GuestbookLog[]>([]);
  const [form, setForm] = useState({ name: '', message: '' });

  const fetchLogs = async () => {
    try {
      // Fetching from the Vercel/NestJS backend API route
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      setLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  };

  useEffect(() => { 
    fetchLogs(); 
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({ name: '', message: '' });
      fetchLogs();
    } catch (err) {
      console.error("Failed to submit", err);
    }
  };

  return (
    <div className="max-w-2xl p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-8">Sign the Guestbook</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5 mb-10">
        <input 
          type="text"
          className="w-full p-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:border-blue-500 outline-none transition"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          required
        />
        <textarea 
          className="w-full p-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:border-blue-500 outline-none transition"
          placeholder="Leave a message..."
          rows={3}
          value={form.message}
          onChange={(e) => setForm({...form, message: e.target.value})}
          required
        />
        <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition duration-200">
          Post Entry
        </button>
      </form>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {logs.map((log, index) => (
          <div key={log.id || index} className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <p className="text-blue-400 font-bold">{log.name}</p>
              {log.created_at && (
                <p className="text-xs text-slate-500">{new Date(log.created_at).toLocaleDateString()}</p>
              )}
            </div>
            <p className="text-slate-300 leading-relaxed">{log.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}