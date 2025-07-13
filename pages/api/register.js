import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) reject(result);
      else resolve(result);
    });
  });
}

let users = {};

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { id, username, avatar } = req.body;
    if (!id || !username) return res.status(400).json({ error: 'Eksik bilgi' });

    if (!users[id]) {
      users[id] = { username, avatar, stories: [] };
      return res.status(200).json({ status: 'Kayıt başarılı' });
    } else {
      return res.status(200).json({ status: 'Zaten kayıtlı' });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json(users);
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
  }
