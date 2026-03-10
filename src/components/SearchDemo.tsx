import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks';
import type { Product } from '../types';

export const SearchDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const [results, setResults] = useState<Product[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Mock products database
  const products: Product[] = [
    { id: 1, name: 'iPhone 15 Pro', category: 'Smartphones', price: 1199, description: 'Latest Apple flagship' },
    { id: 2, name: 'MacBook Pro M3', category: 'Laptops', price: 2499, description: 'Powerful laptop' },
    { id: 3, name: 'AirPods Pro', category: 'Audio', price: 249, description: 'Premium earbuds' },
    { id: 4, name: 'iPad Air', category: 'Tablets', price: 599, description: 'Versatile tablet' },
    { id: 5, name: 'Apple Watch Series 9', category: 'Wearables', price: 399, description: 'Smart watch' },
    { id: 6, name: 'iMac 24"', category: 'Desktops', price: 1299, description: 'All-in-one desktop' },
    { id: 7, name: 'Magic Keyboard', category: 'Accessories', price: 99, description: 'Wireless keyboard' },
    { id: 8, name: 'HomePod', category: 'Audio', price: 299, description: 'Smart speaker' },
  ];

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchCount((prev) => prev + 1);
      
      // Simulate API call
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Search avec Debounce
      </h3>

      <div className="space-y-6">
        {/* Search Input */}
        <div>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full px-4 py-3 pl-12 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm text-blue-700 dark:text-blue-400 mb-1">
              Recherches effectuées
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {searchCount}
            </div>
          </div>

          <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-green-700 dark:text-green-400 mb-1">
              Résultats trouvés
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-300">
              {results.length}
            </div>
          </div>
        </div>

        {/* Results */}
        {searchTerm && (
          <div className="space-y-3">
            {results.length > 0 ? (
              results.map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800 dark:text-white">
                      {product.name}
                    </h4>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ${product.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded">
                      {product.category}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.description}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Aucun résultat trouvé pour "{searchTerm}"
              </div>
            )}
          </div>
        )}

        <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            💡 La recherche est déclenchée 500ms après votre dernière frappe, économisant {searchTerm.length > 0 ? searchTerm.length - searchCount : 0} appels API inutiles !
          </p>
        </div>
      </div>
    </div>
  );
};