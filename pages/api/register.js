import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, username, avatar, bio, stories } = req.body;

    if (!id || !username) {
      return res.status(400).json({ error: 'Eksik bilgi' });
    }

    // Mevcut kullanıcıyı kontrol et
    const { data: existingUser, error: getError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (existingUser) {
      // Güncelle
      const { error: updateError } = await supabase
        .from('users')
        .update({ username, avatar, bio, stories })
        .eq('id', id);

      if (updateError) {
        return res.status(500).json({ error: updateError.message });
      }

      return res.status(200).json({ message: 'Kullanıcı güncellendi' });
    }

    // Yoksa yeni kullanıcı oluştur
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id, username, avatar, bio, stories }]);

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    return res.status(200).json({ message: 'Kullanıcı eklendi' });
  }

  // GET isteklerinde kullanıcıları döndür
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // ID'ye göre sıralayıp obje olarak döndür
    const result = {};
    data.forEach((user) => {
      result[user.id] = user;
    });

    return res.status(200).json(result);
  }

  res.status(405).json({ error: 'Yalnızca GET ve POST destekleniyor.' });
}
