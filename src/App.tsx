import { useState, useCallback, memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UpgradeProvider } from './contexts/UpgradeContext';
import './App.css';
import PremiumSplashScreen from './pages/PremiumSplashScreen';
import CompactProfessional from './pages/CompactProfessional';
import AppInterface from './components/AppInterface';
import UpgradeZone from './pages/UpgradeZone';
import Lab from './features/lab';

const App = memo(() => {
  const [showSplash, setShowSplash] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <PremiumSplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <UpgradeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CompactProfessional />} />
          <Route path="/app/*" element={<AppInterface />} />
          <Route path="/upgrade" element={<UpgradeZone />} />
          <Route path="/lab/*" element={<Lab />} />
        </Routes>
      </Router>
    </UpgradeProvider>
  );
});

App.displayName = 'App';

export default App;
