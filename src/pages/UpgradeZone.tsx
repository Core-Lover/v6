import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUpgrade } from '../contexts/UpgradeContext';
import './UpgradeZone.css';
import '../components/Mining3D.css';
import UpgradeModal from '../components/UpgradeModal';

const UpgradeZone: React.FC = () => {
  const navigate = useNavigate();
  const { upgradeLevel, currentHours, nextHours, canUpgrade, reset } = useUpgrade();
  const [miningActive] = useState(false); // Mining animation always idle in upgrade zone
  const [showModal, setShowModal] = useState(false);

  const handleUpgrade = () => {
    setShowModal(true);
  };

  const handleConfirmUpgrade = () => {
    console.log(`Upgrade confirmed - upgrading to ${nextHours} hours`);
    setShowModal(false);
    // Future implementation for actual upgrade logic
  };

  const handleCancelUpgrade = () => {
    setShowModal(false);
  };

  return (
    <div className="upgrade-zone-container">
      {/* Header */}
      <div className="upgrade-zone-header">
        <button 
          className="back-button-icon"
          onClick={() => navigate('/app')}
          title="Back to Dashboard"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateX(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="upgrade-zone-title">UPGRADE ZONE</h1>
        <div className="header-spacer" style={{ width: '40px' }}></div>
      </div>

      {/* Small Reset Icon Button */}
      <button 
        onClick={() => {
          reset(); // Use context reset function
          navigate('/app'); // Navigate immediately
        }}
        title="Reset to Level 0 (Testing)"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255, 68, 68, 0.2)',
          border: '2px solid rgba(255, 68, 68, 0.5)',
          color: '#FF4444',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 68, 68, 0.3)';
          e.currentTarget.style.border = '2px solid #FF4444';
          e.currentTarget.style.transform = 'rotate(180deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 68, 68, 0.2)';
          e.currentTarget.style.border = '2px solid rgba(255, 68, 68, 0.5)';
          e.currentTarget.style.transform = 'rotate(0deg)';
        }}
      >
        ↻
      </button>

      {/* Mining Animation - Show current tier (preview next only in modal) */}
      <div className="upgrade-mining-container">
        <div className={`mining-3d-container mining-reduced ${upgradeLevel === 1 ? 'theme-upgraded' : upgradeLevel === 2 ? 'theme-premium' : upgradeLevel === 3 ? 'theme-ultimate' : ''}`}>
          <div className={`mining-scene ${miningActive ? 'mining-active' : ''}`}>
            
            {/* Rotating Rings System */}
            <div className={`ring-system-3d test-mode ${miningActive ? 'active-mining' : ''}`}>
              <div className="ring ring-orbit-1"></div>
              <div className="ring ring-orbit-2"></div>
              <div className="ring ring-orbit-3"></div>
              <div className="ring ring-orbit-4"></div>
              <div className="ring ring-orbit-5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Display - Always show current */}
      <div className="upgrade-current-timer">
        <span className="timer-label">Current Mining Time</span>
        <span className="timer-value">{currentHours} HOURS</span>
      </div>

      {/* Upgrade Button - Show if can upgrade */}
      {canUpgrade && (
        <div className="upgrade-button-container">
          <button 
            className="upgrade-to-six-hours"
            onClick={handleUpgrade}
          >
            UPGRADE CLAIM TIME TO {nextHours} HOURS
          </button>
        </div>
      )}
      
      {/* Show Max Level Status if at maximum */}
      {!canUpgrade && (
        <div className="upgrade-button-container">
          <div className="upgrade-status-complete">
            ✓ MAXIMUM LEVEL REACHED
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal 
        isOpen={showModal}
        onConfirm={handleConfirmUpgrade}
        onCancel={handleCancelUpgrade}
      />
    </div>
  );
};

export default UpgradeZone;