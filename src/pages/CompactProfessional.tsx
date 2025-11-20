import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { memo, useCallback, useState, useEffect } from 'react';
import { Shield, Award, Lock, TrendingUp, Globe, Zap, Users, ChevronRight } from 'lucide-react';
import './CompactProfessional.css';

// Floating geometric shapes component
const FloatingShapes = memo(() => (
  <>
    <div className="floating-shape shape-1" />
    <div className="floating-shape shape-2" />
    <div className="floating-shape shape-3" />
    <div className="floating-shape shape-4" />
    <div className="floating-shape shape-5" />
  </>
));

// Trust indicator component
const TrustIndicator = memo(({ icon: Icon, title, value }: any) => (
  <motion.div 
    className="trust-indicator"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <Icon size={24} className="trust-icon" />
    <div className="trust-content">
      <div className="trust-value">{value}</div>
      <div className="trust-label">{title}</div>
    </div>
  </motion.div>
));

// Partner logo component
const PartnerLogo = memo(({ delay }: { delay: number }) => (
  <motion.div 
    className="partner-logo"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.3, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ opacity: 0.6, scale: 1.1 }}
  />
));

const CompactProfessional = memo(() => {
  const navigate = useNavigate();
  const [counters, setCounters] = useState({ 
    users: 0, 
    transactions: 0, 
    tvl: 0,
    nodes: 0 
  });

  // Animated counters
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    const targets = {
      users: 125000,
      transactions: 2500000,
      tvl: 150,
      nodes: 50000
    };

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        users: Math.floor(targets.users * progress),
        transactions: Math.floor(targets.transactions * progress),
        tvl: Math.floor(targets.tvl * progress),
        nodes: Math.floor(targets.nodes * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const handleEnterApp = useCallback(() => {

    navigate('/app');
  }, [navigate]);

  return (
    <div className="premium-landing">
      {/* Sophisticated gradient background */}
      <div className="premium-gradient-bg" />
      
      {/* Grid overlay for institutional feel */}
      <div className="premium-grid-overlay" />
      
      {/* Floating geometric shapes */}
      <FloatingShapes />
      
      {/* Professional light effects */}
      <div className="premium-light-rays" />
      
      {/* Glass morphism card for main content */}
      <motion.div 
        className="glass-card main-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Premium badge */}
        <motion.div 
          className="premium-badge"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Shield size={16} />
          <span>ENTERPRISE-GRADE BLOCKCHAIN</span>
        </motion.div>

        {/* Main heading with Bebas Neue */}
        <motion.h1
          className="premium-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          AIQX FOUNDATION
        </motion.h1>

        {/* Sophisticated subtitle */}
        <motion.p
          className="premium-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Institutional-Grade Decentralized AI Infrastructure
        </motion.p>

        {/* Description */}
        <motion.p
          className="premium-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Powering the next generation of artificial intelligence through 
          quantum-resistant blockchain technology and distributed computing
        </motion.p>

        {/* Trust indicators / Stats */}
        <motion.div 
          className="trust-indicators"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <TrustIndicator 
            icon={Users} 
            title="ACTIVE USERS" 
            value={formatNumber(counters.users) + "+"} 
          />
          <TrustIndicator 
            icon={TrendingUp} 
            title="TRANSACTIONS" 
            value={formatNumber(counters.transactions) + "+"} 
          />
          <TrustIndicator 
            icon={Lock} 
            title="TVL" 
            value={"$" + counters.tvl + "M+"} 
          />
          <TrustIndicator 
            icon={Globe} 
            title="GLOBAL NODES" 
            value={formatNumber(counters.nodes) + "+"} 
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <button 
            className="btn-primary premium-btn"
            onClick={handleEnterApp}
          >
            <span>ENTER APP</span>
            <ChevronRight size={20} className="btn-icon" />
          </button>
          <button className="btn-secondary premium-btn">
            <span>VIEW WHITEPAPER</span>
            <Award size={20} className="btn-icon" />
          </button>
        </motion.div>

        {/* Security badges */}
        <motion.div 
          className="security-badges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="badge-item">
            <Shield size={20} />
            <span>SOC 2 COMPLIANT</span>
          </div>
          <div className="badge-item">
            <Lock size={20} />
            <span>256-BIT ENCRYPTION</span>
          </div>
          <div className="badge-item">
            <Zap size={20} />
            <span>99.99% UPTIME</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Partner logos section */}
      <motion.div 
        className="partners-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      >
        <p className="partners-label">TRUSTED BY LEADING INSTITUTIONS</p>
        <div className="partners-grid">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <PartnerLogo key={i} delay={1.8 + i * 0.1} />
          ))}
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="bottom-gradient" />
      
      {/* Animated particles */}
      <div className="particle-container">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
      </div>
    </div>
  );
});

CompactProfessional.displayName = 'CompactProfessional';

export default CompactProfessional;