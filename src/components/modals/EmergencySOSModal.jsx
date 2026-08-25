import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { X, ShieldAlert, PhoneCall, MapPin, Battery, Activity, CheckCircle2 } from 'lucide-react';

export const EmergencySOSModal = () => {
  const { isSosModalOpen, setIsSosModalOpen, userData, vitals } = useHealthData();

  if (!isSosModalOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#070a14',
      zIndex: 120,
      display: 'flex',
      flexDirection: 'column',
      padding: '1.25rem',
      overflowY: 'auto'
    }}>
      {/* High Contrast Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(239, 68, 68, 0.3)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <ShieldAlert size={32} color="#ef4444" />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.1em' }}>
              HIGH CONTRAST EMERGENCY MODE
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>EMERGENCY SOS ACTIVE</h2>
          </div>
        </div>
        <button
          onClick={() => setIsSosModalOpen(false)}
          style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Status Box */}
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '2px solid #ef4444', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f87171', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Activity size={18} /> Live Emergency Broadcast Transmission
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem 0.8rem', borderRadius: '12px', color: '#ffffff' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>GPS Coordinates</div>
              <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="#00f2fe" /> 30.2672° N, 97.7431° W
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem 0.8rem', borderRadius: '12px', color: '#ffffff' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Wearable Battery</div>
              <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Battery size={14} color="#10b981" /> {userData.deviceBattery}%
              </div>
            </div>
          </div>
        </div>

        {/* Latest Vitals Broadcast */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            Transmitting Live Vitals Payload:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.6rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Heart Rate</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ef4444' }}>{vitals.heartRate.current} BPM</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.6rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>SpO2</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#00f2fe' }}>{vitals.spo2.current}%</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.6rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Temperature</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b' }}>{vitals.temperature.current}°C</div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Alert Queue */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            Notified Trusted Contacts:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {userData.emergencyContacts.map((contact, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', padding: '0.6rem 0.9rem', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>{contact.name} ({contact.relation})</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>{contact.phone}</div>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={14} /> Alert Sent
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button
            onClick={() => alert("Calling Emergency Dispatch (911)...")}
            className="btn btn-danger"
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 800 }}
          >
            <PhoneCall size={22} />
            <span>DIAL 911 / EMERGENCY SERVICES NOW</span>
          </button>

          <button
            onClick={() => setIsSosModalOpen(false)}
            className="btn btn-secondary"
            style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
          >
            Stand Down / Close Emergency SOS
          </button>
        </div>
      </div>
    </div>
  );
};
