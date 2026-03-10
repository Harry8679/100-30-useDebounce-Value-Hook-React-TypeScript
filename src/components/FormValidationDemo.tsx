import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks';
import type { ValidationResult } from '../types';

export const FormValidationDemo = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [usernameValidation, setUsernameValidation] = useState<ValidationResult | null>(null);
  const [emailValidation, setEmailValidation] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const debouncedUsername = useDebounce(username, 800);
  const debouncedEmail = useDebounce(email, 800);

  // Simulate async username validation
  useEffect(() => {
    if (debouncedUsername) {
      setIsValidating(true);
      
      setTimeout(() => {
        const taken = ['admin', 'user', 'test', 'demo'].includes(debouncedUsername.toLowerCase());
        const valid = debouncedUsername.length >= 3 && /^[a-zA-Z0-9_]+$/.test(debouncedUsername);
        
        if (!valid) {
          setUsernameValidation({
            isValid: false,
            message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères alphanumériques',
          });
        } else if (taken) {
          setUsernameValidation({
            isValid: false,
            message: 'Ce nom d\'utilisateur est déjà pris',
          });
        } else {
          setUsernameValidation({
            isValid: true,
            message: 'Nom d\'utilisateur disponible !',
          });
        }
        setIsValidating(false);
      }, 500);
    } else {
      setUsernameValidation(null);
    }
  }, [debouncedUsername]);

  // Validate email
  useEffect(() => {
    if (debouncedEmail) {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail);
      
      setEmailValidation({
        isValid: valid,
        message: valid ? 'Email valide !' : 'Format d\'email invalide',
      });
    } else {
      setEmailValidation(null);
    }
  }, [debouncedEmail]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Validation de Formulaire
      </h3>

      <div className="space-y-6">
        {/* Username Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Nom d'utilisateur
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choisissez un nom d'utilisateur"
              className={`w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-700 border-2 rounded-lg text-gray-800 dark:text-white transition-colors ${
                usernameValidation
                  ? usernameValidation.isValid
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-transparent focus:border-blue-500'
              }`}
            />
            {isValidating && username && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </span>
            )}
            {!isValidating && usernameValidation && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">
                {usernameValidation.isValid ? '✅' : '❌'}
              </span>
            )}
          </div>
          {usernameValidation && (
            <p className={`mt-2 text-sm ${
              usernameValidation.isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {usernameValidation.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className={`w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-700 border-2 rounded-lg text-gray-800 dark:text-white transition-colors ${
                emailValidation
                  ? emailValidation.isValid
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-transparent focus:border-blue-500'
              }`}
            />
            {emailValidation && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">
                {emailValidation.isValid ? '✅' : '❌'}
              </span>
            )}
          </div>
          {emailValidation && (
            <p className={`mt-2 text-sm ${
              emailValidation.isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {emailValidation.message}
            </p>
          )}
        </div>

        <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-400">
            💡 La validation s'exécute 800ms après votre dernière frappe, évitant des validations inutiles pendant la saisie.
          </p>
        </div>
      </div>
    </div>
  );
};