import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { Home, Activity, BrainCircuit, CloudLightning, ShieldAlert, HeartPulse, Cpu, User } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab, anomalies, environmentData } = useHealthData();

  const isEmergencyActive = anomalies.some(a => a.severity === 'Urgent');
  const isDisasterActive = environmentData.disasterModeActive;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'health', label: 'Health', icon: Activity },
    { id: 'insights', label: 'AI Watch', icon: BrainCircuit, badge: anomalies.length },
    { id: 'disaster', label: 'Disaster', icon: CloudLightning, alert: isDisasterActive },
    { id: 'emergency', label: 'SOS', icon: ShieldAlert, alert: isEmergencyActive },
    { id: 'lifestyle', label: 'Lifestyle', icon: HeartPulse },
    { id: 'devices', label: 'Devices', icon: Cpu },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav style={{
      position: 'sticky',
      bottom: 0,
      width: '100%',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      zIndex: 50,
      padding: '0.5rem 0.3rem 0.8rem',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.15rem',
              color: isActive ? '#00f2fe' : 'var(--text-muted)',
              cursor: 'pointer',
              flex: 1,
              position: 'relative',
              padding: '0.2rem 0',
              transition: 'color 0.2s ease'
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={20} color={isActive ? '#00f2fe' : 'var(--text-muted)'} strokeWidth={isActive ? 2.5 : 1.8} />
              {item.alert && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  boxShadow: '0 0 6px #ef4444'
                }} />
              )}
            </div>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: isActive ? 700 : 500,
              fontFamily: 'var(--font-heading)',
              lineHeight: 1
            }}>
              {item.label}
            </span>
            {isActive && (
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                width: '16px',
                height: '3px',
                borderRadius: '2px',
                background: 'linear-gradient(90deg, #00f2fe, #7f00ff)',
                boxShadow: '0 0 8px #00f2fe'
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
};
