import React, { useState, useEffect } from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { AlertOctagon, CheckCircle, ShieldAlert } from 'lucide-react';

export const FallDetectionModal = () => {
  const { isFallModalOpen, setIsFallModalOpen, setIsSosModalOpen } = useHealthData();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    let timer;
    if (isFallModalOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isFallModalOpen && countdown === 0) {
      // Auto trigger emergency SOS
      setIsFallModalOpen(false);
      setIsSosModalOpen(true);
    }
    return () => clearInterval(timer);
  }, [isFallModalOpen, countdown, setIsFallModalOpen, setIsSosModalOpen]);

  if (!isFallModalOpen) return null;

  const handleImOkay = () => {
    setIsFallModalOpen(false);
    setCountdown(15);
  };

  const handleSosNow = () => {
    setIsFallModalOpen(false);
    setIsSosModalOpen(true);
    setCountdown(15);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.92)',
      backdropFilter: 'blur(16px)',
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card glass-card-glow-red" style={{ width: '100%', maxWidth: '440px', padding: '2rem', textAlign: 'center' }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.2)',
          border: '2px solid #ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
          boxShadow: '0 0 25px rgba(239, 68, 68, 0.5)'
        }}>
          <AlertOctagon size={36} color="#ef4444" />
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f87171', marginBottom: '0.4rem' }}>
          POSSIBLE FALL DETECTED!
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Smartwatch sensors detected a sudden impact followed by lack of movement. Are you okay?
        </p>

        {/* Countdown Ring */}
        <div style={{
          fontSize: '3rem',
          fontWeight: 900,
          fontFamily: 'var(--font-heading)',
          color: '#ffffff',
          marginBottom: '0.25rem',
          textShadow: '0 0 15px rgba(239, 68, 68, 0.6)'
        }}>
          00:{countdown < 10 ? `0${countdown}` : countdown}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginBottom: '1.75rem' }}>
          Emergency contacts & live GPS will be alerted when timer reaches 00:00
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={handleImOkay}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}
          >
            <CheckCircle size={20} />
            <span>I'M OKAY — CANCEL ALERT</span>
          </button>

          <button
            onClick={handleSosNow}
            className="btn btn-danger"
            style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}
          >
            <ShieldAlert size={20} />
            <span>CALL EMERGENCY SERVICES NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
