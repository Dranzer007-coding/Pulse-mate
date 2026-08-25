import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { Flame, Heart, AlertOctagon, Wind, WifiOff, RotateCcw, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

export const DemoToolbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    triggerHeatWaveAlert,
    triggerHeartRateAnomaly,
    triggerFallEvent,
    triggerAqiSpike,
    toggleOfflineMode,
    resetDemo,
    offlineMode
  } = useHealthData();

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(0, 242, 254, 0.4)',
      borderRadius: '20px',
      padding: collapsed ? '0.5rem 1rem' : '0.85rem 1.25rem',
      marginBottom: '1.25rem',
      boxShadow: '0 0 25px rgba(0, 242, 254, 0.15)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="#00f2fe" />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.85rem', color: '#00f2fe', letterSpacing: '0.04em' }}>
            DEMO SCENARIO SIMULATOR
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '10px' }}>
            Hackathon Mode
          </span>
        </div>

        <button
          onClick={() => setCollapsed(prev => !prev)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-sub)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            fontSize: '0.75rem'
          }}
        >
          {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {!collapsed && (
        <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <button
            onClick={triggerHeatWaveAlert}
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}
          >
            <Flame size={14} color="#f59e0b" />
            <span>Trigger Heat Wave</span>
          </button>

          <button
            onClick={triggerHeartRateAnomaly}
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
          >
            <Heart size={14} color="#ef4444" />
            <span>Trigger HR Anomaly</span>
          </button>

          <button
            onClick={triggerFallEvent}
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
          >
            <AlertOctagon size={14} color="#ef4444" />
            <span>Simulate Fall</span>
          </button>

          <button
            onClick={triggerAqiSpike}
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', borderColor: 'rgba(139, 92, 246, 0.4)', color: '#c084fc' }}
          >
            <Wind size={14} color="#8b5cf6" />
            <span>Trigger AQI Spike</span>
          </button>

          <button
            onClick={toggleOfflineMode}
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', color: offlineMode ? '#fbbf24' : 'var(--text-sub)' }}
          >
            <WifiOff size={14} />
            <span>{offlineMode ? 'Go Online' : 'Go Offline (Edge AI)'}</span>
          </button>

          <button
            onClick={resetDemo}
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', marginLeft: 'auto', background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <RotateCcw size={14} />
            <span>Reset Demo State</span>
          </button>
        </div>
      )}
    </div>
  );
};
