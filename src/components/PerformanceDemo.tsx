import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '../hooks';

export const PerformanceDemo = () => {
  const [text, setText] = useState('');
  const [normalRenderCount, setNormalRenderCount] = useState(0);
  const [debouncedRenderCount, setDebouncedRenderCount] = useState(0);
  const debouncedText = useDebounce(text, 500);

  // Track normal renders
  const normalRenderCountRef = useRef(0);
  
  useEffect(() => {
    normalRenderCountRef.current++;
    setNormalRenderCount(normalRenderCountRef.current);
  });

  // Track debounced renders
  const debouncedRenderCountRef = useRef(0);
  
  useEffect(() => {
    if (debouncedText) {
      debouncedRenderCountRef.current++;
      setDebouncedRenderCount(debouncedRenderCountRef.current);
    }
  }, [debouncedText]);

  const savings = normalRenderCount > 0 
    ? Math.round(((normalRenderCount - debouncedRenderCount) / normalRenderCount) * 100)
    : 0;

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
              Rendus sans debounce
            </div>
            <div className="text-3xl font-bold text-red-600 dark:text-red-300">
              {normalRenderCount}
            </div>
          </div>

          <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-green-700 dark:text-green-400 mb-1">
              Rendus avec debounce
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-300">
              {debouncedRenderCount}
            </div>
          </div>

          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm text-blue-700 dark:text-blue-400 mb-1">
              Économie
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">
              {savings}%
            </div>
          </div>
        </div>

        {/* Visual Progress */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Rendus normaux
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {normalRenderCount}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-300"
                style={{ width: `${Math.min((normalRenderCount / 50) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Rendus debounced
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {debouncedRenderCount}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${Math.min((debouncedRenderCount / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-400">
            💡 Le debounce réduit drastiquement le nombre de rendus et de calculs inutiles, améliorant les performances de votre application !
          </p>
        </div>
      </div>
    </div>
  );
};