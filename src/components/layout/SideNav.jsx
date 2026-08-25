import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { Home, Activity, BrainCircuit, CloudLightning, ShieldAlert, HeartPulse, Cpu, User, Download, Info } from 'lucide-react';

export const SideNav = () => {
  const { activeTab, setActiveTab, anomalies, environmentData, setIsReportModalOpen } = useHealthData();

  const navItems = [
    { id: 'home', label: 'Dashboard Overview', icon: Home },
    { id: 'health', label: 'Vitals & Baseline', icon: Activity },
    { id: 'insights', label: 'AI Health Watch', icon: BrainCircuit, badge: anomalies.length },
    { id: 'disaster', label: 'Disaster Resilience', icon: CloudLightning, alert: environmentData.disasterModeActive },
    { id: 'emergency', label: 'Emergency SOS', icon: ShieldAlert },
    { id: 'lifestyle', label: 'Lifestyle & Meds', icon: HeartPulse },
    { id: 'devices', label: 'Wearable Hub', icon: Cpu },
    { id: 'profile', label: 'Profile & Privacy', icon: User }
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      <div>
        <div style={{ padding: '0 0.5rem 1.5rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Navigation
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive ? 'linear-gradient(90deg, rgba(0, 242, 254, 0.15), rgba(127, 0, 255, 0.15))' : 'transparent',
                  border: isActive ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid transparent',
                  borderRadius: '14px',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  color: isActive ? '#00f2fe' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <Icon size={18} color={isActive ? '#00f2fe' : 'var(--text-muted)'} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span style={{
                    background: 'rgba(0, 242, 254, 0.2)',
                    color: '#00f2fe',
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
                {item.alert && (
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    boxShadow: '0 0 8px #ef4444'
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Side Footer */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="btn btn-purple"
          style={{ width: '100%', fontSize: '0.82rem', padding: '0.6rem 1rem', marginBottom: '0.75rem' }}
        >
          <Download size={15} />
          <span>Export Doctor Report</span>
        </button>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Pulse Mate v1.0 • PWA Ready
        </div>
      </div>
    </aside>
  );
};
