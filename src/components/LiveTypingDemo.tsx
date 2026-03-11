import { useState } from 'react';
import { useDebounce } from '../hooks';

export const LiveTypingDemo = () => {
  const [message, setMessage] = useState('');
  const debouncedMessage = useDebounce(message, 300);

  const characterCount = message.length;
  const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
  const debouncedCharCount = debouncedMessage.length;
  const debouncedWordCount = debouncedMessage.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Éditeur de Texte en Temps Réel
      </h3>

      <div className="space-y-6">
        {/* Text Editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Votre message :
            </label>
            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>{characterCount} caractères</span>
              <span>{wordCount} mots</span>
            </div>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Commencez à écrire votre message..."
            rows={6}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors resize-none font-mono"
          />
        </div>

        {/* Live Preview (Debounced) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Prévisualisation (debounce 300ms) :
            </h4>
            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>{debouncedCharCount} caractères</span>
              <span>{debouncedWordCount} mots</span>
            </div>
          </div>
          <div className="p-6 bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg min-h-[200px] border-2 border-blue-200 dark:border-blue-800">
            {debouncedMessage ? (
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-800 dark:text-white whitespace-pre-wrap">
                  {debouncedMessage}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                La prévisualisation apparaîtra ici...
              </div>
            )}
          </div>
        </div>

        {/* Stats Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <div className="text-xs text-orange-700 dark:text-orange-400 mb-1">
              Mises à jour instantanées
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">
              {characterCount}
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              ⚡ Temps réel
            </div>
          </div>

          <div className="p-4 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
            <div className="text-xs text-teal-700 dark:text-teal-400 mb-1">
              Mises à jour debounced
            </div>
            <div className="text-2xl font-bold text-teal-600 dark:text-teal-300">
              {debouncedCharCount}
            </div>
            <div className="text-xs text-teal-600 dark:text-teal-400 mt-1">
              ⏱️ Optimisé
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <h5 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
            💡 Cas d'usage :
          </h5>
          <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
            <li>• Prévisualisation markdown en temps réel</li>
            <li>• Auto-sauvegarde de brouillons</li>
            <li>• Analyse de texte (sentiment, grammaire)</li>
            <li>• Suggestion de complétion automatique</li>
          </ul>
        </div>
      </div>
    </div>
  );
};