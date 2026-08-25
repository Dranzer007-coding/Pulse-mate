import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { 
  Home, Activity, BrainCircuit, CloudLightning, ShieldAlert, 
  HeartPulse, Cpu, User, Download, X, Activity as LogoIcon, ChevronRight
} from 'lucide-react';

export const SidebarNav = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, anomalies, environmentData, setIsReportModalOpen, setIsSosModalOpen } = useHealthData();

  const isEmergencyActive = anomalies.some(a => a.severity === 'Urgent');
  const isDisasterActive = environmentData.disasterModeActive;

  const mainNavItems = [
    { id: 'home', label: 'Dashboard Home', category: 'Overview', icon: Home },
    { id: 'health', label: 'Vitals & Baseline', category: 'Biometrics', icon: Activity },
    { id: 'insights', label: 'AI Health Watch', category: 'Intelligence', icon: BrainCircuit, badge: anomalies.length },
    { id: 'disaster', label: 'Disaster Resilience', category: 'Safety', icon: CloudLightning, alert: isDisasterActive },
    { id: 'emergency', label: 'Emergency SOS', category: 'Safety', icon: ShieldAlert, alert: isEmergencyActive, urgent: true },
    { id: 'lifestyle', label: 'Lifestyle & Meds', category: 'Wellness', icon: HeartPulse },
    { id: 'devices', label: 'Wearable Hub', category: 'System', icon: Cpu },
    { id: 'profile', label: 'Profile & Privacy', category: 'System', icon: User }
  ];

  const handleItemClick = (id) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(7, 10, 20, 0.75)',
      backdropFilter: 'blur(12px)',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'flex-start',
      animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        width: '300px',
        height: '100%',
        background: 'rgba(15, 23, 42, 0.98)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(0, 242, 254, 0.2)',
        padding: '1.25rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 0 40px rgba(0, 242, 254, 0.15)',
        overflowY: 'auto'
      }}>
        <div>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #00f2fe, #7f00ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(0, 242, 254, 0.4)'
              }}>
                <LogoIcon size={20} color="#070a14" strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>Pulse Mate</h3>
                <div style={{ fontSize: '0.68rem', color: '#00f2fe', fontWeight: 600 }}>Navigation Sidebar</div>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: 'white', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {mainNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  style={{
                    background: isActive ? 'linear-gradient(90deg, rgba(0, 242, 254, 0.15), rgba(127, 0, 255, 0.15))' : 'transparent',
                    border: isActive ? '1px solid rgba(0, 242, 254, 0.35)' : '1px solid transparent',
                    borderRadius: '14px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    color: isActive ? '#00f2fe' : item.urgent ? '#f87171' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  <Icon size={19} color={isActive ? '#00f2fe' : item.urgent ? '#ef4444' : 'var(--text-muted)'} />
                  <span style={{ flex: 1, fontFamily: 'var(--font-heading)' }}>{item.label}</span>
                  
                  {item.badge > 0 && (
                    <span style={{
                      background: 'rgba(0, 242, 254, 0.2)',
                      color: '#00f2fe',
                      fontSize: '0.7rem',
                      padding: '2px 7px',
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

                  <ChevronRight size={14} color="var(--text-muted)" opacity={isActive ? 1 : 0.4} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer Actions */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <button
            onClick={() => { if (onClose) onClose(); setIsSosModalOpen(true); }}
            className="btn btn-danger"
            style={{ width: '100%', fontSize: '0.82rem', padding: '0.6rem 1rem' }}
          >
            <ShieldAlert size={16} />
            <span>Emergency SOS Hub</span>
          </button>

          <button
            onClick={() => { if (onClose) onClose(); setIsReportModalOpen(true); }}
            className="btn btn-purple"
            style={{ width: '100%', fontSize: '0.82rem', padding: '0.6rem 1rem' }}
          >
            <Download size={15} />
            <span>Export Doctor Report</span>
          </button>

          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.25rem' }}>
            Pulse Mate v1.0 • Edge AI Enabled
          </div>
        </div>
      </div>
    </div>
  );
};
