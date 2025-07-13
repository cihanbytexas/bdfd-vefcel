import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, username, avatar, bio } = req.body
    if (!id || !username) {
      return res.status(400).json({ error: 'Eksik bilgi' })
    }

    const { error } = await supabase
      .from('users')
      .upsert([
        {
          id,
          username,
          avatar,
          bio: bio || '',
          stories: []
        }
      ])

    if (error) {
      console.error(error)
      return res.status(500).json({ error: 'Kayıt başarısız' })
    }

    return res.status(200).json({ status: 'Kayıt başarılı' })
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error) {
      console.error(error)
      return res.status(500).json({ error: 'Veri çekilemedi' })
    }

    return res.status(200).json(data)
  }

  res.setHeader('Allow', ['POST', 'GET'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
