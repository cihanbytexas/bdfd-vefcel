import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/register')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Bot Kullanıcıları
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">Henüz kullanıcı yok.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
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
