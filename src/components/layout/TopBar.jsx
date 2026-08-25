import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { Activity, Bell, Wifi, WifiOff, Watch, ShieldAlert } from 'lucide-react';

export const TopBar = () => {
  const {
    userData,
    offlineMode,
    toggleOfflineMode,
    isNotificationCenterOpen,
    setIsNotificationCenterOpen,
    anomalies,
    environmentData,
    setIsSosModalOpen
  } = useHealthData();

  const urgentAlertsCount = anomalies.filter(a => a.severity === 'Urgent' || a.severity === 'Attention').length;

  return (
    <header style={{
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.75rem 1.25rem',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Brand & Connected Device */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f2fe, #7f00ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)'
          }}>
            <Activity size={22} color="#070a14" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #ffffff, #00f2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Pulse Mate
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-sub)', marginTop: '-2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: offlineMode ? '#f59e0b' : '#10b981', display: 'inline-block' }}></span>
              {offlineMode ? 'Edge AI (Offline Cache)' : 'Realtime Data Sync'}
            </div>
          </div>
        </div>

        {/* Device Status Chip */}
        <div className="device-chip" style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.3rem 0.75rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.75rem',
          color: 'var(--text-sub)'
        }}>
          <Watch size={14} color="#00f2fe" />
          <span>{userData.deviceConnected}</span>
          <span style={{ color: '#10b981', fontWeight: 600 }}>{userData.deviceBattery}%</span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Offline Toggle */}
        <button
          onClick={toggleOfflineMode}
          title={offlineMode ? "Switch to Online Mode" : "Switch to Offline Edge AI Mode"}
          style={{
            background: offlineMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${offlineMode ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '12px',
            padding: '0.45rem 0.75rem',
            color: offlineMode ? '#fbbf24' : 'var(--text-sub)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        >
          {offlineMode ? <WifiOff size={15} /> : <Wifi size={15} color="#10b981" />}
          <span style={{ display: 'none' }}>{offlineMode ? 'Offline' : 'Online'}</span>
        </button>

        {/* Quick SOS Trigger */}
        <button
          onClick={() => setIsSosModalOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
            border: 'none',
            borderRadius: '12px',
            padding: '0.45rem 0.85rem',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: '0 0 12px rgba(239, 68, 68, 0.4)'
          }}
        >
          <ShieldAlert size={15} />
          <span>SOS</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setIsNotificationCenterOpen(prev => !prev)}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            color: 'var(--text-primary)'
          }}
        >
          <Bell size={18} />
          {urgentAlertsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#ef4444',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-dark)'
            }}>
              {urgentAlertsCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2px solid #00f2fe',
          overflow: 'hidden',
          cursor: 'pointer'
        }}>
          <img src={userData.avatar} alt={userData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </header>
  );
};
