import { Timer } from './components/Timer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-light text-center text-gray-900">
            WatchLess
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Timer Component */}
          <Timer />
          
          {/* Daily Summary Placeholder */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center space-y-4">
              <div>
                <span className="text-sm text-gray-500">Today's Total</span>
                <p className="text-2xl font-light text-gray-900">0:00</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Weekly Total</span>
                <p className="text-2xl font-light text-gray-900">0:00</p>
              </div>
            </div>
          </div>

          {/* Action Buttons - Phase 1 Placeholders */}
          <div className="space-y-3">
            <button 
              className="w-full bg-gray-100 text-gray-400 py-3 px-4 rounded-md cursor-not-allowed"
              disabled
            >
              AI Insights (Coming Soon)
            </button>
            <button 
              className="w-full bg-gray-100 text-gray-400 py-3 px-4 rounded-md cursor-not-allowed"
              disabled
            >
              Export to Sheets (Coming Soon)
            </button>
            <button 
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              onClick={() => alert('Google OAuth coming in next phase!')}
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto px-4 py-6 text-center">
        <p className="text-xs text-gray-400">
          WatchLess - Track and reduce your TV time
        </p>
      </footer>
    </div>
  );
}

export default App;
