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
    <div className="min-h-screen bg-white text-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">📋 Bot Kullanıcıları</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(users).length === 0 && <p>Henüz kullanıcı yok.</p>}
        {Object.entries(users).map(([id, user]) => (
          <div key={id} className="bg-blue-50 border border-blue-200 rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            {user.avatar && (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-16 h-16 rounded-full mt-2"
              />
            )}
            <p className="mt-2 text-sm text-gray-600">Bio: {user.bio || "Yok"}</p>
            <p className="text-sm text-gray-600">Hikaye sayısı: {user.stories.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}ow-md transition"
            >
              <div className="flex items-center space-x-4">
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full border border-blue-300"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-blue-700">
                    {user.username}
                  </h2>
                  <p className="text-sm text-gray-600 italic">
                    {user.bio || 'Bio yok.'}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-700">
                📸 Hikaye sayısı:{' '}
                <strong>{user.stories?.length || 0}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
