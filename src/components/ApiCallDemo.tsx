/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks';
import type { User } from '../types';

export const ApiCallDemo = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiCallCount, setApiCallCount] = useState(0);
  const debouncedQuery = useDebounce(query, 600);

  // Mock users database
  const mockUsers: User[] = [
    { id: 1, username: 'john_doe', email: 'john@example.com', avatar: '👨' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', avatar: '👩' },
    { id: 3, username: 'bob_wilson', email: 'bob@example.com', avatar: '👨‍💼' },
    { id: 4, username: 'alice_brown', email: 'alice@example.com', avatar: '👩‍💻' },
    { id: 5, username: 'charlie_davis', email: 'charlie@example.com', avatar: '👨‍🔬' },
    { id: 6, username: 'emma_johnson', email: 'emma@example.com', avatar: '👩‍🎨' },
  ];

  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true);
      setApiCallCount((prev) => prev + 1);

      // Simulate API call with delay
      setTimeout(() => {
        const filtered = mockUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setUsers(filtered);
        setIsLoading(false);
      }, 800);
    } else {
      setUsers([]);
      setIsLoading(false);
    }
  }, [debouncedQuery, mockUsers]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Recherche d'Utilisateurs (API)
      </h3>

      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            className="w-full px-4 py-3 pl-12 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            👤
          </span>
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* API Stats */}
        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
              Appels API effectués :
            </span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {apiCallCount}
            </span>
          </div>
          {query && (
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              {query.length - apiCallCount} appels API économisés grâce au debounce !
            </p>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-semibold">
              Recherche en cours...
            </p>
          </div>
        ) : query && users.length > 0 ? (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer flex items-center gap-4"
              >
                <div className="text-4xl">{user.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 dark:text-white">
                    {user.username}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors">
                  Suivre
                </button>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Aucun utilisateur trouvé pour "{query}"
          </div>
        ) : null}

        <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-400">
            💡 Sans debounce, chaque frappe déclencherait un appel API. Avec un délai de 600ms, on réduit drastiquement le nombre de requêtes !
          </p>
        </div>
      </div>
    </div>
  );
};