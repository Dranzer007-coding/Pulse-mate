import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { WifiOff, Cpu, ShieldCheck } from 'lucide-react';

export const OfflineBanner = () => {
  const { offlineMode } = useHealthData();

  if (!offlineMode) return null;

  return (
    <div style={{
      background: 'linear-gradient(90deg, #b45309, #78350f)',
      color: '#fef3c7',
      padding: '0.5rem 1rem',
      fontSize: '0.8rem',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.6rem',
      boxShadow: '0 4px 12px rgba(180, 83, 9, 0.3)'
    }}>
      <WifiOff size={16} />
      <span><strong>OFFLINE EDGE-AI MODE ACTIVE</strong> — Vitals monitoring, local anomaly detection & emergency SOS run directly on-device without internet.</span>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem' }}>
        <Cpu size={12} /> Edge Engine
      </div>
    </div>
  );
};
