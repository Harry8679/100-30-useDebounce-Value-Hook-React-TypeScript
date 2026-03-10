import { useState } from 'react';
import { useDebounce } from '../hooks';

export const ComparisonDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 1000);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Comparaison : Avec vs Sans Debounce
      </h3>

      <div className="space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Tapez quelque chose :
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Commencez à taper..."
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
          />
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Without Debounce */}
          <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚡</span>
              <h4 className="text-lg font-bold text-red-700 dark:text-red-400">
                Sans Debounce
              </h4>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Valeur actuelle :
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white break-all">
                  {inputValue || '(vide)'}
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <p className="text-xs text-red-700 dark:text-red-400">
                  ⚠️ Se met à jour à chaque frappe
                </p>
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">
                Caractères : <strong>{inputValue.length}</strong>
              </div>
            </div>
          </div>

          {/* With Debounce */}
          <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⏱️</span>
              <h4 className="text-lg font-bold text-green-700 dark:text-green-400">
                Avec Debounce (1s)
              </h4>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Valeur debounced :
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white break-all">
                  {debouncedValue || '(vide)'}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <p className="text-xs text-green-700 dark:text-green-400">
                  ✅ Se met à jour 1s après la dernière frappe
                </p>
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Caractères : <strong>{debouncedValue.length}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
            📚 Explication :
          </h4>
          <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
            <li>• <strong>Sans debounce :</strong> La valeur change instantanément à chaque frappe</li>
            <li>• <strong>Avec debounce :</strong> La valeur ne change qu'après 1 seconde d'inactivité</li>
            <li>• <strong>Avantage :</strong> Réduit les calculs/rendus/API calls inutiles</li>
          </ul>
        </div>
      </div>
    </div>
  );
};