import { useState } from 'react';
import { useDebounce } from '../hooks';

export const PerformanceDemo = () => {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  const characterCount = text.length;
  const debouncedCharCount = debouncedText.length;
  const keystrokes = characterCount;
  const apiCalls = debouncedCharCount > 0 ? 1 : 0;
  const savings = keystrokes > 0 ? Math.max(0, keystrokes - apiCalls) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Performance & Optimisation
      </h3>

      <div className="space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Tapez pour voir l'impact :
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tapez du texte ici..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors resize-none"
          />
        </div>

        {/* Performance Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
            <div className="text-sm text-red-700 dark:text-red-400 mb-1">
              Caractères tapés
            </div>
            <div className="text-3xl font-bold text-red-600 dark:text-red-300">
              {keystrokes}
            </div>
          </div>

          <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-green-700 dark:text-green-400 mb-1">
              Appels API simulés
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-300">
              {apiCalls}
            </div>
          </div>

          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm text-blue-700 dark:text-blue-400 mb-1">
              Appels économisés
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">
              {savings}
            </div>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="space-y-4">
          <div className="p-6 bg-linear-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg">
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">
              ⚡ Sans Debounce
            </h4>
            <p className="text-sm text-red-700 dark:text-red-400 mb-3">
              Chaque caractère déclenche un appel API
            </p>
            <div className="flex gap-1 flex-wrap">
              {text.split('').map((_char, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs"
                  title={`Appel API ${i + 1}`}
                >
                  {i + 1}
                </div>
              ))}
              {text.length === 0 && (
                <div className="text-red-400 text-sm italic">
                  Commencez à taper...
                </div>
              )}
            </div>
          </div>

          <div className="p-6 bg-linear-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
            <h4 className="font-bold text-green-800 dark:text-green-300 mb-3">
              ⏱️ Avec Debounce (500ms)
            </h4>
            <p className="text-sm text-green-700 dark:text-green-400 mb-3">
              Un seul appel API après 500ms d'inactivité
            </p>
            <div className="flex gap-1">
              {debouncedText.length > 0 && (
                <div className="px-6 py-3 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                  1 appel API
                </div>
              )}
              {debouncedText.length === 0 && (
                <div className="text-green-400 text-sm italic">
                  Aucun appel tant que vous tapez...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Current Values */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Valeur instantanée :
            </div>
            <div className="font-mono text-sm text-gray-800 dark:text-white break-all">
              {text || '(vide)'}
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Valeur debounced :
            </div>
            <div className="font-mono text-sm text-gray-800 dark:text-white break-all">
              {debouncedText || '(vide)'}
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-400">
            💡 Sans debounce, {keystrokes} caractères = {keystrokes} appels API. 
            Avec debounce, seulement {apiCalls} appel{apiCalls > 1 ? 's' : ''} ! 
            Économie : {savings} appel{savings > 1 ? 's' : ''}.
          </p>
        </div>
      </div>
    </div>
  );
};