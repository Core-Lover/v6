import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Globe, Gift, Users, User, Sparkles, Send, Download, RefreshCw, ArrowRightLeft, BarChart2, ChevronRight, FlaskConical } from 'lucide-react';
import { useState, useCallback, memo, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpgrade } from '../contexts/UpgradeContext';
import './AppInterface.css';
import './Mining3D.css';


// Premium navigation button component
const PremiumNavButton = memo(({ 
  icon: Icon, 
  label, 
  onClick, 
  isActive = false 
}: { 
  icon: typeof Globe; 
  label: string; 
  onClick: () => void; 
  isActive?: boolean;
}) => (
  <motion.button
    className={`premium-nav-btn ${isActive ? 'active' : ''}`}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="nav-icon-wrapper">
      <div className="nav-icon-glow" />
      <Icon size={22} />
    </div>
    <span className="nav-label">{label}</span>
  </motion.button>
));

PremiumNavButton.displayName = 'PremiumNavButton';

// Premium home button component
const PremiumHomeButton = memo(({ onClick }: { onClick: () => void }) => (
  <motion.button
    className="premium-home-btn"
    whileHover={{ scale: 1.08, rotate: 5 }}
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, type: "spring" }}
  >
    <div className="home-icon-wrapper">
      <div className="home-icon-pulse" />
      <Sparkles size={26} className="home-icon" />
    </div>
    <span className="home-label">HOME</span>
  </motion.button>
));

PremiumHomeButton.displayName = 'PremiumHomeButton';

const AppInterface = memo(() => {
  const navigate = useNavigate();
  const { timerSeconds, upgradeLevel } = useUpgrade();
  const [miningActive, setMiningActive] = useState(false);
  const [miningProgress, setMiningProgress] = useState(100); // Temporary: set to 100% for testing
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [canClaim, setCanClaim] = useState(true); // Temporary: enabled for testing claim button
  const [balance, setBalance] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Track if user has ever started mining (persists forever)
  const [hasEverMined, setHasEverMined] = useState(() => {
    return true; // Temporary: set to true to show mining progress for testing
  });
  
  // Debug upgrade level
  useEffect(() => {
    console.log('Current upgrade level from context:', upgradeLevel);
    console.log('Upgrade level in localStorage:', localStorage.getItem('aiqx_upgrade_level'));
    console.log('Timer seconds:', timerSeconds);
  }, [upgradeLevel, timerSeconds]);
  
  // Auto-start mining for returning users - TEMPORARILY DISABLED FOR TESTING
  useEffect(() => {
    // If user has mined before, automatically start mining on load
    // TEMPORARILY DISABLED TO SHOW COMPLETED STATE
    /* if (hasEverMined && !miningActive && !canClaim) {
      setMiningActive(true);
      setCanClaim(false);
      setMiningProgress(0);
      setCountdownSeconds(timerSeconds);
    } */
  }, [hasEverMined]); // Only run on initial load/hasEverMined change
  
  // Auto-restart mining when upgrade level changes (user upgrades) - TEMPORARILY DISABLED FOR TESTING
  useEffect(() => {
    // Only restart if user has mined before and upgrades
    // TEMPORARILY DISABLED TO SHOW COMPLETED STATE
    /* if (hasEverMined && upgradeLevel > 0) {
      // Reset and restart mining with new timer
      setMiningActive(true);
      setCanClaim(false);
      setMiningProgress(0);
      setCountdownSeconds(timerSeconds);
    } */
  }, [upgradeLevel, timerSeconds]); // Trigger when upgrade level changes
  
  // Mining rate based on upgrade level (AIQX per hour)
  const miningRate = useMemo(() => {
    switch(upgradeLevel) {
      case 0: return 0.01;  // Free tier
      case 1: return 0.02;  // Bronze
      case 2: return 0.05;  // Silver
      case 3: return 0.10;  // Gold
      default: return 0.01;
    }
  }, [upgradeLevel]);

  // Get theme colors based on upgrade level (always visible) - Use useMemo to update when upgradeLevel changes
  const themeColors = useMemo(() => {
    if (upgradeLevel === 1) {
      // Green theme for 6 hours upgrade
      return {
        primary: '#00FF7F',
        secondary: '#32CD32',
        tertiary: '#228B22',
        gradientStart: '#00FF7F',
        gradientMid: '#32CD32',
        gradientEnd: '#00FF7F',
        rgba: '0, 255, 127'
      };
    } else if (upgradeLevel === 2) {
      // Purple theme for 12 hours upgrade
      return {
        primary: '#9333EA',
        secondary: '#A855F7',
        tertiary: '#7C3AED',
        gradientStart: '#9333EA',
        gradientMid: '#A855F7',
        gradientEnd: '#9333EA',
        rgba: '147, 51, 234'
      };
    } else if (upgradeLevel === 3) {
      // Orange theme for 24 hours ultimate upgrade
      return {
        primary: '#FF7A1A',
        secondary: '#FF8C00',
        tertiary: '#FF6347',
        gradientStart: '#FF7A1A',
        gradientMid: '#FF8C00',
        gradientEnd: '#FF7A1A',
        rgba: '255, 122, 26'
      };
    } else {
      // Default golden theme for level 0
      return {
        primary: '#DAA520',
        secondary: '#FFA500',
        tertiary: '#B8860B',
        gradientStart: '#DAA520',
        gradientMid: '#FFA500',
        gradientEnd: '#DAA520',
        rgba: '255, 215, 0'
      };
    }
  }, [upgradeLevel]); // Recalculate whenever upgradeLevel changes

  // Countdown timer effect
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout | null = null;
    
    if (miningActive && countdownSeconds > 0) {
      countdownInterval = setInterval(() => {
        setCountdownSeconds(prev => {
          if (prev <= 1) {
            setMiningActive(false);
            setCanClaim(true); // Set canClaim to true when timer reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [miningActive, countdownSeconds]);

  useEffect(() => {
    let miningTimer: NodeJS.Timeout | null = null;
    let progressInterval: NodeJS.Timeout | null = null;
    
    if (miningActive) {
      // Reset progress when starting
      setMiningProgress(0);
      
      // Update progress every 100ms for smooth animation
      const totalDuration = timerSeconds * 1000; // Convert seconds to milliseconds for current tier
      const updateInterval = 100; // Update every 100ms
      const increment = (100 / (totalDuration / updateInterval));
      
      progressInterval = setInterval(() => {
        setMiningProgress(prev => {
          const newProgress = Math.min(prev + increment, 100);
          if (newProgress >= 100) {
            setMiningActive(false);
            setCanClaim(true); // Set canClaim when progress reaches 100%
          }
          return newProgress;
        });
      }, updateInterval);
      
      // Auto-stop mining after 24 hours
      miningTimer = setTimeout(() => {
        setMiningActive(false);
        setMiningProgress(100);
        setCountdownSeconds(0);
        setCanClaim(true); // Set canClaim when timer completes
      }, totalDuration);
    } else if (!canClaim) {
      // Only reset progress if not waiting to claim
      setMiningProgress(0);
    }
    
    return () => {
      if (miningTimer) {
        clearTimeout(miningTimer);
      }
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [miningActive, canClaim, timerSeconds]);

  const handleStartMining = useCallback(() => {
    // Mark that user has started mining for the first time
    if (!hasEverMined) {
      setHasEverMined(true);
      localStorage.setItem('aiqx_has_ever_mined', 'true');
    }
    
    setMiningActive(true);
    setCanClaim(false);
    setCountdownSeconds(timerSeconds); // Use timer from context (3 or 6 hours based on upgrade)
  }, [timerSeconds]);

  const handleClaimRewards = useCallback(() => {
    console.log('CLAIM button clicked! Processing rewards...');
    
    // Calculate actual rewards based on mining rate and time
    const hoursElapsed = (timerSeconds - countdownSeconds) / 3600;
    const rewardAmount = miningRate * hoursElapsed;
    console.log(`Claiming ${rewardAmount.toFixed(6)} AIQX`);
    
    // Show reward animation briefly
    setShowReward(true);
    setShowSuccess(true);
    
    // Add rewards to balance
    setBalance(prev => {
      const newBalance = prev + rewardAmount;
      console.log(`Balance updated: ${prev} → ${newBalance}`);
      return newBalance;
    });
    
    // Reset states and automatically restart mining after animation
    setTimeout(() => {
      setShowReward(false);
      setShowSuccess(false);
      setCanClaim(false);
      setMiningProgress(0);
      
      // Automatically restart mining after claiming
      console.log('Restarting mining automatically...');
      setMiningActive(true);
      setCountdownSeconds(timerSeconds);
    }, 2000); // Show reward for 2 seconds
  }, [timerSeconds, countdownSeconds, miningRate]);

  const handleHomeClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleLabClick = useCallback(() => {
    navigate('/lab');
  }, [navigate]);

  const handleEmptyClick = useCallback(() => {}, []);

  return (
    <div className="app-interface-premium" style={{
      minHeight: '100vh',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch'
    }}>
      {/* Premium gradient background */}
      <div className="premium-bg-gradient" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -2
      }} />
      
      {/* Animated mesh overlay */}
      <div className="animated-mesh" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
      }} />
      
      {/* Floating orbs */}
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />

      {/* Main Dashboard Container */}
      <motion.div
        className="premium-dashboard"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          paddingBottom: '150px',
          minHeight: 'calc(100vh - 80px)'
        }}
      >
        {/* Dashboard Header */}
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="header-left">
            <Cpu className="header-icon" />
            <h1 className="dashboard-title">AIQX Mining</h1>
          </div>
        </motion.div>

        {/* Professional Balance Card - Always Visible */}
        {true && (
        <div className="premium-balance-card" style={{ 
          position: 'relative', 
          zIndex: 9999,
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          visibility: 'visible',
          opacity: 1,
          minHeight: '160px',
          pointerEvents: 'auto',
          padding: '24px 24px 28px'
        }}>
          <div className="premium-balance-header">
            <div className="balance-left">
              <img src="/aiqx-star-small.png" alt="AIQX" className="star-logo-small" />
              <span className="balance-title">AIQX</span>
            </div>
            <ChevronRight size={20} className="balance-arrow" />
          </div>
          
          <div className="premium-balance-display" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div className="balance-amount" style={{
              marginBottom: '6px',
              lineHeight: 1.2
            }}>{balance.toFixed(8)}</div>
            <div className="balance-subtitle" style={{
              lineHeight: 1.2
            }}>AIQX Balance</div>
          </div>
        </div>
        )}

        {/* Action Buttons Row */}
        <motion.div 
          className="action-buttons-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button className="action-btn">
            <Send size={20} />
            <span>Send</span>
          </button>
          <button className="action-btn">
            <Download size={20} />
            <span>Receive</span>
          </button>
          <button className="action-btn">
            <ArrowRightLeft size={20} />
            <span>Swap</span>
          </button>
          <button className="action-btn">
            <RefreshCw size={20} />
            <span>Transfer</span>
          </button>
        </motion.div>

        {/* Grid Layout Container */}
        <div className="mining-grid-layout">
          {/* Left Grid - Mining Animation, Timer, and Button - Click to Open Upgrade Zone */}
          <div 
            className="mining-grid-left clickable-grid"
            onClick={() => navigate('/upgrade')}
            style={{ cursor: 'pointer' }}>
            {/* 3D Mining Visualization */}
            <div className={`mining-3d-container mining-reduced ${upgradeLevel === 1 ? 'theme-upgraded' : upgradeLevel === 2 ? 'theme-premium' : upgradeLevel === 3 ? 'theme-ultimate' : ''}`}>
              <div className={`mining-scene ${miningActive ? 'mining-active' : ''}`}>
            
            
            {/* 24-Hour Time Ring */}
            <div className={`time-ring-24h ${miningActive ? 'mining-active' : ''}`}>
              <svg className="time-ring-svg" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="timeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={themeColors.gradientStart} stopOpacity="1" />
                    <stop offset="50%" stopColor={themeColors.gradientMid} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={themeColors.gradientEnd} stopOpacity="1" />
                  </linearGradient>
                  <filter id="professionalGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Subtle Glow */}
                <circle cx="200" cy="200" r="180" fill="none" stroke={`rgba(${themeColors.rgba}, 0.2)`} strokeWidth="18" opacity="0.9" />
                
                {/* Main Ring - Continuous Animated Progress Fill */}
                <circle 
                  className="time-progress-background" 
                  cx="200" 
                  cy="200" 
                  r="180" 
                  fill="none" 
                  stroke={`rgba(${themeColors.rgba}, 0.25)`} 
                  strokeWidth="14"
                />
                <circle 
                  className="time-progress-fill" 
                  cx="200" 
                  cy="200" 
                  r="180" 
                  fill="none" 
                  stroke="url(#timeGradient)" 
                  strokeWidth="14"
                  filter="url(#professionalGlow)"
                  strokeDasharray={`${2 * Math.PI * 180}`}
                  strokeDashoffset={`${2 * Math.PI * 180 * (1 - miningProgress / 100)}`}
                  transform="rotate(-90 200 200)"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {/* Rotating Rings System - TEST MODE ENABLED for fast animation */}
            <div className={`ring-system-3d test-mode ${miningActive ? 'active-mining' : ''}`}>
              <div className="ring ring-orbit-1"></div>
              <div className="ring ring-orbit-2"></div>
              <div className="ring ring-orbit-3"></div>
              <div className="ring ring-orbit-4"></div>
              <div className="ring ring-orbit-5"></div>
              
              {/* Official AIQX Logo - Always rendered to prevent layout shift */}
              <div className={`aiqx-official-logo mining-logo-appear ${miningActive ? 'mining-active' : ''}`} style={{
                opacity: miningActive ? 1 : 0,
                visibility: miningActive ? 'visible' : 'hidden',
                transition: 'opacity 0.3s ease'
              }}>
                <svg className="aiqx-logo-svg" viewBox="0 0 160 160">
                  {/* Coin outer ring */}
                  <defs>
                    <radialGradient id="goldGradient" cx="50%" cy="50%">
                      <stop offset="0%" stopColor={themeColors.primary} />
                      <stop offset="70%" stopColor={themeColors.secondary} />
                      <stop offset="100%" stopColor={themeColors.tertiary} />
                    </radialGradient>
                    <radialGradient id="innerGradient" cx="50%" cy="40%">
                      <stop offset="0%" stopColor="#1a1a1a" />
                      <stop offset="100%" stopColor="#000000" />
                    </radialGradient>
                  </defs>
                  
                  {/* Outer ring */}
                  <circle cx="80" cy="80" r="78" fill="url(#goldGradient)" />
                  <circle cx="80" cy="80" r="72" fill={themeColors.tertiary} />
                  
                  {/* Inner black circle with gradient */}
                  <circle cx="80" cy="80" r="68" fill="url(#innerGradient)" />
                  
                  {/* Exact Circuit Board Pattern from AIQX Logo */}
                  <g className="circuit-pattern-exact">
                    
                    {/* Top Circuit Lines */}
                    <g className="circuit-top">
                      <path className="circuit-line circuit-1" d="M80,20 L80,35" stroke={themeColors.tertiary} strokeWidth="1.2" fill="none" />
                      <path className="circuit-line circuit-2" d="M80,35 L75,40 L75,50" stroke={themeColors.tertiary} strokeWidth="1" fill="none" />
                      <path className="circuit-line circuit-3" d="M80,35 L85,40 L85,50" stroke={themeColors.tertiary} strokeWidth="1" fill="none" />
                      <path className="circuit-line circuit-4" d="M65,25 L70,30 L70,45" stroke={themeColors.tertiary} strokeWidth="0.8" fill="none" />
                      <path className="circuit-line circuit-5" d="M95,25 L90,30 L90,45" stroke={themeColors.tertiary} strokeWidth="0.8" fill="none" />
                      <circle cx="80" cy="20" r="1.5" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="65" cy="25" r="1" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="95" cy="25" r="1" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="80" cy="35" r="0.8" fill={themeColors.tertiary} className="circuit-node" />
                    </g>
                    
                    {/* Right Circuit Lines */}
                    <g className="circuit-right">
                      <path className="circuit-line circuit-6" d="M140,80 L125,80" stroke={themeColors.tertiary} strokeWidth="1.2" fill="none" />
                      <path className="circuit-line circuit-7" d="M125,80 L120,75 L110,75" stroke={themeColors.tertiary} strokeWidth="1" fill="none" />
                      <path className="circuit-line circuit-8" d="M125,80 L120,85 L110,85" stroke={themeColors.tertiary} strokeWidth="1" fill="none" />
                      <path className="circuit-line circuit-9" d="M135,65 L130,70 L115,70" stroke={themeColors.tertiary} strokeWidth="0.8" fill="none" />
                      <path className="circuit-line circuit-10" d="M135,95 L130,90 L115,90" stroke={themeColors.tertiary} strokeWidth="0.8" fill="none" />
                      <circle cx="140" cy="80" r="1.5" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="135" cy="65" r="1" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="135" cy="95" r="1" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="125" cy="80" r="0.8" fill={themeColors.tertiary} className="circuit-node" />
                    </g>
                    
                    {/* Bottom Circuit Lines */}
                    <g className="circuit-bottom">
                      <path className="circuit-line circuit-11" d="M80,140 L80,125" stroke={themeColors.tertiary} strokeWidth="1.2" fill="none" />
                      <path className="circuit-line circuit-12" d="M80,125 L75,120 L75,110" stroke={themeColors.tertiary} strokeWidth="1" fill="none" />
                      <path className="circuit-line circuit-13" d="M80,125 L85,120 L85,110" stroke={themeColors.tertiary} strokeWidth="1" fill="none" />
                      <path className="circuit-line circuit-14" d="M65,135 L70,130 L70,115" stroke={themeColors.tertiary} strokeWidth="0.8" fill="none" />
                      <path className="circuit-line circuit-15" d="M95,135 L90,130 L90,115" stroke={themeColors.tertiary} strokeWidth="0.8" fill="none" />
                      <circle cx="80" cy="140" r="1.5" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="65" cy="135" r="1" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="95" cy="135" r="1" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="80" cy="125" r="0.8" fill={themeColors.tertiary} className="circuit-node" />
                    </g>
                    
                    {/* Left Circuit Lines */}
                    <g className="circuit-left">
                      <path className="circuit-line circuit-16" d="M20,80 L35,80" stroke={themeColors.tertiary} strokeWidth="1.2" fill="none" />
                      <path className="circuit-line circuit-17" d="M35,80 L40,75 L50,75" stroke={themeColors.tertiary} strokeWidth="1" fill="none" />
                      <path className="circuit-line circuit-18" d="M35,80 L40,85 L50,85" stroke={themeColors.tertiary} strokeWidth="1" fill="none" />
                      <path className="circuit-line circuit-19" d="M25,65 L30,70 L45,70" stroke={themeColors.tertiary} strokeWidth="0.8" fill="none" />
                      <path className="circuit-line circuit-20" d="M25,95 L30,90 L45,90" stroke={themeColors.tertiary} strokeWidth="0.8" fill="none" />
                      <circle cx="20" cy="80" r="1.5" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="25" cy="65" r="1" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="25" cy="95" r="1" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="35" cy="80" r="0.8" fill={themeColors.tertiary} className="circuit-node" />
                    </g>
                    
                    {/* Corner Circuit Connections */}
                    <g className="circuit-corners">
                      {/* Top-Right */}
                      <path className="circuit-line circuit-21" d="M110,50 L105,45 L100,45" stroke={themeColors.tertiary} strokeWidth="0.7" fill="none" />
                      <path className="circuit-line circuit-22" d="M115,40 L110,45 L110,50" stroke={themeColors.tertiary} strokeWidth="0.7" fill="none" />
                      <circle cx="115" cy="40" r="0.8" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="105" cy="45" r="0.6" fill={themeColors.tertiary} className="circuit-node" />
                      
                      {/* Top-Left */}
                      <path className="circuit-line circuit-23" d="M50,50 L55,45 L60,45" stroke={themeColors.tertiary} strokeWidth="0.7" fill="none" />
                      <path className="circuit-line circuit-24" d="M45,40 L50,45 L50,50" stroke={themeColors.tertiary} strokeWidth="0.7" fill="none" />
                      <circle cx="45" cy="40" r="0.8" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="55" cy="45" r="0.6" fill={themeColors.tertiary} className="circuit-node" />
                      
                      {/* Bottom-Right */}
                      <path className="circuit-line circuit-25" d="M110,110 L105,115 L100,115" stroke={themeColors.tertiary} strokeWidth="0.7" fill="none" />
                      <path className="circuit-line circuit-26" d="M115,120 L110,115 L110,110" stroke={themeColors.tertiary} strokeWidth="0.7" fill="none" />
                      <circle cx="115" cy="120" r="0.8" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="105" cy="115" r="0.6" fill={themeColors.tertiary} className="circuit-node" />
                      
                      {/* Bottom-Left */}
                      <path className="circuit-line circuit-27" d="M50,110 L55,115 L60,115" stroke={themeColors.tertiary} strokeWidth="0.7" fill="none" />
                      <path className="circuit-line circuit-28" d="M45,120 L50,115 L50,110" stroke={themeColors.tertiary} strokeWidth="0.7" fill="none" />
                      <circle cx="45" cy="120" r="0.8" fill={themeColors.tertiary} className="circuit-node" />
                      <circle cx="55" cy="115" r="0.6" fill={themeColors.tertiary} className="circuit-node" />
                    </g>
                    
                    {/* Inner Connection Points */}
                    <g className="inner-connections">
                      <circle cx="75" cy="50" r="0.5" fill={themeColors.tertiary} opacity="0.6" />
                      <circle cx="85" cy="50" r="0.5" fill={themeColors.tertiary} opacity="0.6" />
                      <circle cx="110" cy="75" r="0.5" fill={themeColors.tertiary} opacity="0.6" />
                      <circle cx="110" cy="85" r="0.5" fill={themeColors.tertiary} opacity="0.6" />
                      <circle cx="85" cy="110" r="0.5" fill={themeColors.tertiary} opacity="0.6" />
                      <circle cx="75" cy="110" r="0.5" fill={themeColors.tertiary} opacity="0.6" />
                      <circle cx="50" cy="85" r="0.5" fill={themeColors.tertiary} opacity="0.6" />
                      <circle cx="50" cy="75" r="0.5" fill={themeColors.tertiary} opacity="0.6" />
                    </g>
                  </g>
                  
                  {/* Central Hash Chip Icon - Mathematically Centered */}
                  <foreignObject x="66" y="66" width="28" height="28">
                    <div style={{ 
                      width: '28px', 
                      height: '28px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <Cpu 
                        size={26} 
                        color={themeColors.primary}
                        strokeWidth={1.5}
                        style={{ 
                          filter: 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.8))',
                          animation: miningActive ? 'pulse 2s ease-in-out infinite' : 'none',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    </div>
                  </foreignObject>
                </svg>
              </div>
              
            </div>
          </div>
          </div>
          
          </div>
          {/* End Left Grid */}
          
          {/* Right Grid - Mining Statistics Card */}
          <div className="mining-grid-right">
            <div className="portfolio-card">
              <div className="portfolio-header">
                <BarChart2 size={18} className="portfolio-icon" />
                <span className="portfolio-title">Mining Overview</span>
              </div>
              <div className="portfolio-content">
                <div className="portfolio-stat">
                  <span className="stat-label">Mining Rate</span>
                  <span className="stat-value">0.01 AIQX/h</span>
                </div>
              </div>
            </div>
          </div>
          {/* End Right Grid */}
        </div>
        {/* End Grid Layout */}

        {/* Professional Mining Control System */}
        <div className="mining-control-system">
          
          {/* Professional Action Button - Always visible area */}
          <div className="mining-action-container" style={{ 
            minHeight: '80px', 
            padding: '30px 0', 
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 5,
            marginTop: '-10px'
          }}>
            {!miningActive && !hasEverMined ? (
              <button 
                className="start-mining-btn"
                onClick={handleStartMining}
                style={{ 
                  background: '#1E242E',
                  color: '#C5CBD4',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  border: '1px solid rgba(120, 132, 156, 0.18)',
                  fontSize: '13px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.2s ease',
                  minWidth: '180px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#232936';
                  e.currentTarget.style.borderColor = 'rgba(120, 132, 156, 0.25)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.color = '#F4F6F8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1E242E';
                  e.currentTarget.style.borderColor = 'rgba(120, 132, 156, 0.18)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.color = '#C5CBD4';
                }}
              >
                <span>START MINING</span>
              </button>
            ) : null}
          </div>
          
          {/* Professional Mining Progress Container */}
          <div className="mining-progress-container" style={{
            visibility: (miningActive || miningProgress === 100 || canClaim) ? 'visible' : 'hidden',
            opacity: (miningActive || miningProgress === 100 || canClaim) ? 1 : 0,
            transition: 'opacity 0.3s ease',
            height: (miningActive || miningProgress === 100 || canClaim) ? 'auto' : '180px',
            minHeight: '180px',
            marginTop: '-60px',
            marginBottom: '20px',
            padding: '24px',
            background: 'rgba(30, 36, 46, 0.6)',
            borderRadius: '12px',
            border: '1px solid rgba(120, 132, 156, 0.1)',
            position: 'relative'
          }}>
            
            {/* Header */}
            <div style={{ marginBottom: '12px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>MINING PROGRESS</span>
            </div>

            {/* Timer Display */}
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#E5E7EB',
              fontFamily: 'monospace',
              marginBottom: '16px'
            }}>
              {Math.floor(countdownSeconds / 3600).toString().padStart(2, '0')}:
              {Math.floor((countdownSeconds % 3600) / 60).toString().padStart(2, '0')}:
              {(countdownSeconds % 60).toString().padStart(2, '0')}
            </div>

            {/* Progress Bar with Percentage */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <div className="professional-progress-bar" style={{ 
                background: 'rgba(120, 132, 156, 0.15)',
                borderRadius: '8px',
                height: '10px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div className="progress-fill-professional" style={{ 
                  width: `${miningProgress}%`,
                  background: `linear-gradient(90deg, ${themeColors.gradientStart}, ${themeColors.gradientMid}, ${themeColors.gradientEnd})`,
                  height: '100%',
                  transition: 'width 0.3s ease',
                  boxShadow: `0 0 12px rgba(${themeColors.rgba}, 0.6)`
                }}>
                  <div className="progress-glow" style={{
                    background: `rgba(${themeColors.rgba}, 0.3)`,
                    height: '100%'
                  }}></div>
                </div>
              </div>
              {/* Percentage on right */}
              <span style={{
                position: 'absolute',
                right: '0',
                top: '-22px',
                fontSize: '12px',
                fontWeight: '700',
                color: themeColors.primary
              }}>{miningProgress.toFixed(1)}%</span>
            </div>

            {/* Info Display - Changes based on mining status */}
            {miningProgress >= 100 && canClaim ? (
              <>
                {/* Available For Claim text */}
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: themeColors.primary,
                  textAlign: 'left',
                  marginBottom: '12px'
                }}>
                  Available For Claim
                </div>
                {/* Mined Amount with Token Logo */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <img 
                    src="/aiqx-star-small.png" 
                    alt="AIQX" 
                    style={{
                      width: '24px',
                      height: '24px',
                      objectFit: 'contain'
                    }}
                  />
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#E5E7EB'
                  }}>
                    +{(miningProgress * 0.001).toFixed(6)} AIQX
                  </span>
                </div>
              </>
            ) : (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <span style={{
                  fontSize: '11px',
                  color: '#9CA3AF',
                  fontWeight: '500'
                }}>Accumulating: <span style={{ color: '#E5E7EB' }}>+{(miningProgress * 0.001).toFixed(6)} AIQX</span></span>
                <span style={{
                  fontSize: '11px',
                  color: '#9CA3AF',
                  fontWeight: '500'
                }}>Rate: <span style={{ color: themeColors.primary }}>{miningRate} AIQX/hr</span></span>
              </div>
            )}

            {/* CLAIM Button - Right aligned when at 100% */}
            {miningProgress >= 100 && canClaim && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '16px'
              }}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (canClaim && miningProgress >= 100) {
                      console.log('CLAIM button clicked - processing reward');
                      handleClaimRewards();
                    }
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
                    color: '#1A1F2E',
                    padding: '12px 32px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 4px 16px rgba(${themeColors.rgba}, 0.4)`,
                    minWidth: '160px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px rgba(${themeColors.rgba}, 0.6)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 16px rgba(${themeColors.rgba}, 0.4)`;
                  }}
                >
                  CLAIM
                </button>
              </div>
            )}
          </div>
        </div>

        
        {/* Bottom Spacer for Scrolling */}
        <div style={{ height: '100px' }}></div>
      </motion.div>

      {/* Professional Reward Display */}
      {showReward && (
        <div className="reward-display">
          <div className="reward-card">
            <div className="reward-header">
              <span className="reward-label">MINING REWARDS READY</span>
            </div>
            <div className="reward-amount-container">
              <div className="aiqx-large-coin">
                <img 
                  src="/aiqx-star-optimized.png"
                  alt="AIQX" 
                  width="72"
                  height="72"
                  style={{
                    display: 'block',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div className="reward-value">
                <span className="reward-plus">+</span>
                <span className="reward-number">100</span>
                <span className="reward-currency">AIQX</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation when claiming */}
      {showSuccess && (
        <div className="success-animation">
          <div className="success-checkmark">
            <span style={{fontSize: '40px', color: 'white'}}>✓</span>
          </div>
        </div>
      )}

      {/* Premium Bottom Navigation */}
      <AnimatePresence>
        <motion.div 
          className="premium-bottom-nav"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="nav-glass-bg" />
          <div className="nav-content">
            <PremiumNavButton icon={FlaskConical} label="Lab" onClick={handleLabClick} />
            <PremiumNavButton icon={Gift} label="Rewards" onClick={handleEmptyClick} />
            <PremiumHomeButton onClick={handleHomeClick} />
            <PremiumNavButton icon={Users} label="Team" onClick={handleEmptyClick} />
            <PremiumNavButton icon={User} label="Profile" onClick={handleEmptyClick} />
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
});

AppInterface.displayName = 'AppInterface';

export default AppInterface;