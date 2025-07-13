import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    fetch('/api/register')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Bot Kullanıcıları</h1>
      {Object.keys(users).length === 0 && <p>Henüz kullanıcı yok.</p>}
      {Object.entries(users).map(([id, user]) => (
        <div key={id} style={{ marginBottom: 20, padding: 10, border: '1px solid #ccc' }}>
          <h2>{user.username}</h2>
          {user.avatar && <img src={user.avatar} alt="Avatar" width={50} style={{ borderRadius: '50%' }} />}
          <p><strong>Biyo:</strong> {user.bio || "Henüz biyografi eklenmemiş."}</p>
          <p><strong>Hikayeler:</strong> {user.stories.length}</p>
        </div>
      ))}
    </div>
  );
}
