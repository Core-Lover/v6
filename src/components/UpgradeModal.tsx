import React from 'react';
import { useUpgrade } from '../contexts/UpgradeContext';
import './UpgradeModal.css';

interface UpgradeModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  const { upgrade, upgradeLevel } = useUpgrade();
  
  if (!isOpen) return null;
  
  // Define fees for each upgrade tier
  const upgradeFees: { [key: number]: number } = {
    1: 6,   // 3h -> 6h costs 6 AIQX
    2: 12,  // 6h -> 12h costs 12 AIQX
    3: 24,  // 12h -> 24h costs 24 AIQX
  };
  
  const currentFee = upgradeFees[upgradeLevel + 1] || 6;
  
  const handleConfirm = () => {
    upgrade(); // Call upgrade function from context
    onConfirm(); // Call the original onConfirm callback
  };

  // Get theme colors for the upgrade level we're upgrading TO
  const getUpgradeThemeColors = () => {
    const targetLevel = upgradeLevel + 1;
    if (targetLevel === 1) {
      return { primary: '#00FF7F', secondary: '#32CD32' }; // Green
    } else if (targetLevel === 2) {
      return { primary: '#9333EA', secondary: '#A855F7' }; // Purple
    } else if (targetLevel === 3) {
      return { primary: '#FF7A1A', secondary: '#FF8C00' }; // Orange
    }
    return { primary: '#DAA520', secondary: '#FFA500' }; // Default golden
  };
  
  const themeColors = getUpgradeThemeColors();

  return (
    <div className="upgrade-modal-overlay">
      <div className="upgrade-modal-container">
        {/* Upgrade Preview Animation */}
        <div className="modal-animation-container">
          <div className={`mining-3d-container mining-reduced ${upgradeLevel === 0 ? 'theme-upgraded' : upgradeLevel === 1 ? 'theme-premium' : 'theme-ultimate'}`}>
            <div className="mining-scene">
              {/* Rotating Rings System */}
              <div className="ring-system-3d test-mode">
                <div className="ring ring-orbit-1"></div>
                <div className="ring ring-orbit-2"></div>
                <div className="ring ring-orbit-3"></div>
                <div className="ring ring-orbit-4"></div>
                <div className="ring ring-orbit-5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Display */}
        <div className="modal-fee-section" style={{ borderColor: themeColors.primary }}>
          <span className="fee-label">UPGRADE FEE</span>
          <span className="fee-amount" style={{ color: themeColors.primary }}>{currentFee} AIQX</span>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button 
            className="modal-confirm-btn" 
            onClick={handleConfirm}
            style={{ 
              background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
              boxShadow: `0 0 20px ${themeColors.primary}66`
            }}
          >
            CONFIRM
          </button>
          <button className="modal-cancel-btn" onClick={onCancel}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;