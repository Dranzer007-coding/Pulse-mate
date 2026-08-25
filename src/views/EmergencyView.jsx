import React from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { ShieldAlert, AlertOctagon, PhoneCall, MapPin, Heart, UserCheck, FileText } from 'lucide-react';

export const EmergencyView = () => {
  const { setIsSosModalOpen, triggerFallEvent, userData, vitals } = useHealthData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
          Intelligent Emergency SOS & Distress Hub
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
          1-tap emergency dispatch, smart fall response, and offline medical passport.
        </p>
      </div>

      {/* Main SOS Trigger Hero */}
      <div className="glass-card glass-card-glow-red" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Emergency Dispatch System
        </div>

        {/* Large SOS Button */}
        <button
          onClick={() => setIsSosModalOpen(true)}
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #ef4444, #991b1b)',
            border: '4px solid #f87171',
            boxShadow: '0 0 50px rgba(239, 68, 68, 0.6)',
            color: 'white',
            fontWeight: 900,
            fontSize: '2rem',
            fontFamily: 'var(--font-heading)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.2rem',
            transition: 'transform 0.2s ease',
            margin: '0.5rem 0'
          }}
        >
          <ShieldAlert size={36} color="white" />
          <span>SOS</span>
        </button>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.4 }}>
          Tap to trigger immediate emergency workflow. Transmits GPS coordinates, live vitals, and alerts primary trusted contacts.
        </p>

        {/* Fall Simulator Action Button */}
        <button
          onClick={triggerFallEvent}
          className="btn btn-secondary"
          style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171', marginTop: '0.5rem' }}
        >
          <AlertOctagon size={18} color="#ef4444" />
          <span>Simulate Fall Sensor Detection (15s Countdown)</span>
        </button>
      </div>

      {/* Emergency Medical Passport Card */}
      <div className="glass-card glass-card-glow-purple" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <FileText size={22} color="#a855f7" />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Offline Emergency Medical Passport</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Essential medical facts accessible without internet during emergencies</p>
          </div>
        </div>

        <div className="grid-3" style={{ gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)', textTransform: 'uppercase' }}>Blood Type</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ef4444' }}>{userData.bloodType}</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)', textTransform: 'uppercase' }}>Allergies</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fbbf24', marginTop: '4px' }}>
              {userData.allergies.join(', ')}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)', textTransform: 'uppercase' }}>Chronic Conditions</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#60a5fa', marginTop: '4px' }}>
              {userData.medicalConditions.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
