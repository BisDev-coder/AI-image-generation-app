import { useState } from 'react';
import { useAuth } from './Context/AuthContext';
import Auth from './pages/Auth';
import Navbar from './Components/Navbar';
import HeroSection from './Components/HeroSection';
import History from './Components/History';
import Footer from './Components/Footer';

function App() {
  const { user, authLoading } = useAuth();

 const [historyRefresh, setHistoryRefresh] = useState(0);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080b12] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />

          <p className="text-sm text-gray-500">
            Loading VisionForge...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      <Navbar />

      <HeroSection onGeneration={setHistoryRefresh} />
<History refreshTrigger={historyRefresh} />

      <Footer />
    </div>
  );
}

export default App;

// App.jsx is now responsible for deciding whether the user sees the auth page or the application.
// YOUR STRUCTURE BECOMES
// App.jsx
// │
// ├── Auth.jsx             ← logged out
// │
// └── logged in
//     ├── Navbar
//     ├── HeroSection
//     ├── History
//     └── Footer