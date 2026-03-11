import { SearchDemo } from './SearchDemo';
import { FormValidationDemo } from './FormValidationDemo';
import { ApiCallDemo } from './ApiCallDemo';
import { ComparisonDemo } from './ComparisonDemo';
import { PerformanceDemo } from './PerformanceDemo';
import { LiveTypingDemo } from './LiveTypingDemo';

export const DebounceDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            ⏱️ useDebounce Hook
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Projet 30/100 • Debouncing de Valeurs
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Optimisation des performances avec debounce de valeurs
          </p>
        </div>

        {/* Demos */}
        <div className="space-y-8">
          {/* Row 1 */}
          <ComparisonDemo />

          {/* Row 2 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <SearchDemo />
            <FormValidationDemo />
          </div>

          {/* Row 3 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <ApiCallDemo />
            <PerformanceDemo />
          </div>

          {/* Row 4 */}
          <LiveTypingDemo />

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              ✨ Fonctionnalités
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Debounce Simple</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hook facile à utiliser
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Délai Configurable</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Personnalisez le délai
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Performance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Réduit les calculs inutiles
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">API Optimization</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Moins d'appels API
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Type Générique</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Fonctionne avec tout type
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Type-Safe</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    100% TypeScript
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              💻 Exemples d'utilisation
            </h2>

            <div className="space-y-6">
              {/* Basic Usage */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Utilisation basique :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`import { useDebounce } from './hooks';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  // API call only triggers 500ms after user stops typing
  if (debouncedSearchTerm) {
    fetchResults(debouncedSearchTerm);
  }
}, [debouncedSearchTerm]);`}
                </pre>
              </div>

              {/* Form Validation */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Validation de formulaire :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const [email, setEmail] = useState('');
const debouncedEmail = useDebounce(email, 800);

useEffect(() => {
  // Validate email 800ms after user stops typing
  if (debouncedEmail) {
    validateEmail(debouncedEmail);
  }
}, [debouncedEmail]);`}
                </pre>
              </div>

              {/* Generic Type */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Avec types génériques :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`// String
const debouncedString = useDebounce<string>(value, 500);

// Number
const debouncedNumber = useDebounce<number>(count, 300);

// Custom Object
const debouncedUser = useDebounce<User>(user, 1000);`}
                </pre>
              </div>

              {/* Performance */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Optimisation des performances :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const [filter, setFilter] = useState('');
const debouncedFilter = useDebounce(filter, 400);

// Expensive computation only runs when debounced value changes
const filteredItems = useMemo(() => {
  return items.filter(item => 
    item.name.includes(debouncedFilter)
  );
}, [debouncedFilter, items]);`}
                </pre>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">🚀 Avantages du Debouncing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>⚡</span> Performance
                </h3>
                <p className="text-white/90 text-sm">
                  Réduit le nombre de rendus et de calculs inutiles, améliorant significativement les performances.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>🌐</span> Économie de bande passante
                </h3>
                <p className="text-white/90 text-sm">
                  Diminue drastiquement le nombre d'appels API, réduisant les coûts et la charge serveur.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>👤</span> Meilleure UX
                </h3>
                <p className="text-white/90 text-sm">
                  L'interface reste fluide sans ralentissements causés par trop d'opérations simultanées.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>🔋</span> Économie d'énergie
                </h3>
                <p className="text-white/90 text-sm">
                  Moins de calculs = moins de consommation CPU = meilleure autonomie batterie sur mobile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};