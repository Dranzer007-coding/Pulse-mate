import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { X, Bell, AlertTriangle, Flame, Pill, Wifi } from 'lucide-react';

export const NotificationCenterModal = () => {
  const { isNotificationCenterOpen, setIsNotificationCenterOpen, anomalies, environmentData, medications } = useHealthData();

  if (!isNotificationCenterOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(6px)',
      zIndex: 90,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        height: '100%',
        background: '#0f172a',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={20} color="#00f2fe" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Notification Center</h3>
          </div>
          <button onClick={() => setIsNotificationCenterOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Disaster Alert */}
          {environmentData.disasterModeActive && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '14px', padding: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f87171', fontWeight: 800, fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                <Flame size={16} /> DISASTER ALERT: HEATWAVE
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                {environmentData.disasterAlertText}
              </p>
            </div>
          )}

          {/* Anomalies Notifications */}
          {anomalies.map(anom => (
            <div key={anom.id} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{anom.title}</span>
                <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>{anom.severity}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>{anom.description}</p>
            </div>
          ))}

          {/* Medication Reminders */}
          {medications.filter(m => !m.taken).map(med => (
            <div key={med.id} style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '14px', padding: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                <Pill size={16} /> Medication Due: {med.name}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>
                Dose: {med.dose} scheduled for {med.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
