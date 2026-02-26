import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, message } = req.body;
  const { data, error } = await supabase
    .from('guestbook')
    .insert([{ name, message }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ success: true });
}