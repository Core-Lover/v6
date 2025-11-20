import React, { createContext, useContext, useState, useEffect } from 'react';

interface UpgradeContextType {
  upgradeLevel: number;
  timerSeconds: number;
  currentHours: number;
  nextHours: number | null;
  canUpgrade: boolean;
  upgrade: () => void;
  reset: () => void;
}

const UpgradeContext = createContext<UpgradeContextType | undefined>(undefined);

const STORAGE_KEY = 'aiqx_upgrade_level';

// Upgrade tiers configuration
const TIMER_TIERS = [
  { hours: 3, seconds: 10800 },  // Level 0: Default
  { hours: 6, seconds: 21600 },  // Level 1: First upgrade
  { hours: 12, seconds: 43200 }, // Level 2: Second upgrade
  { hours: 24, seconds: 86400 }, // Level 3: Ultimate upgrade
];

export const UpgradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [upgradeLevel, setUpgradeLevel] = useState<number>(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });

  // Update localStorage whenever upgradeLevel changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, upgradeLevel.toString());
  }, [upgradeLevel]);

  const upgrade = () => {
    if (upgradeLevel < TIMER_TIERS.length - 1) {
      setUpgradeLevel(prev => prev + 1);
      console.log(`Upgrading to tier ${upgradeLevel + 1}: ${TIMER_TIERS[upgradeLevel + 1].hours} hours`);
    }
  };

  const reset = () => {
    setUpgradeLevel(0);
    console.log('Resetting to default 3 hour timer');
  };

  const currentTier = TIMER_TIERS[upgradeLevel];
  const nextTier = upgradeLevel < TIMER_TIERS.length - 1 ? TIMER_TIERS[upgradeLevel + 1] : null;
  
  const timerSeconds = currentTier.seconds;
  const currentHours = currentTier.hours;
  const nextHours = nextTier?.hours || null;
  const canUpgrade = upgradeLevel < TIMER_TIERS.length - 1;

  return (
    <UpgradeContext.Provider value={{ 
      upgradeLevel,
      timerSeconds, 
      currentHours,
      nextHours,
      canUpgrade,
      upgrade, 
      reset 
    }}>
      {children}
    </UpgradeContext.Provider>
  );
};

export const useUpgrade = () => {
  const context = useContext(UpgradeContext);
  if (context === undefined) {
    throw new Error('useUpgrade must be used within an UpgradeProvider');
  }
  
  // For backward compatibility
  const isUpgraded = context.upgradeLevel > 0;
  
  return {
    ...context,
    isUpgraded // Add this for backward compatibility
  };
};