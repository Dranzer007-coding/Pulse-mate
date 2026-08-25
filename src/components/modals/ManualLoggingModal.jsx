import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { X, PlusCircle, Heart, Thermometer, Zap } from 'lucide-react';

export const ManualLoggingModal = () => {
  const { isManualLogOpen, setIsManualLogOpen, addManualVital } = useHealthData();
  const [metricType, setMetricType] = useState('heartRate');
  const [value, setValue] = useState('');

  if (!isManualLogOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addManualVital(metricType, value);
    setValue('');
    setIsManualLogOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card glass-card-glow-cyan" style={{ width: '100%', maxWidth: '440px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={20} color="#00f2fe" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Add Manual Health Log</h3>
          </div>
          <button
            onClick={() => setIsManualLogOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              Select Measurement Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setMetricType('heartRate')}
                style={{
                  background: metricType === 'heartRate' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${metricType === 'heartRate' ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px',
                  padding: '0.5rem',
                  color: metricType === 'heartRate' ? '#ef4444' : 'var(--text-sub)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <Heart size={16} /> Heart Rate
              </button>

              <button
                type="button"
                onClick={() => setMetricType('temperature')}
                style={{
                  background: metricType === 'temperature' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${metricType === 'temperature' ? '#f59e0b' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px',
                  padding: '0.5rem',
                  color: metricType === 'temperature' ? '#f59e0b' : 'var(--text-sub)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <Thermometer size={16} /> Temperature
              </button>

              <button
                type="button"
                onClick={() => setMetricType('glucose')}
                style={{
                  background: metricType === 'glucose' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${metricType === 'glucose' ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px',
                  padding: '0.5rem',
                  color: metricType === 'glucose' ? '#10b981' : 'var(--text-sub)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <Zap size={16} /> Glucose
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-sub)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              Enter Numeric Value ({metricType === 'heartRate' ? 'BPM' : metricType === 'temperature' ? '°C' : 'mg/dL'})
            </label>
            <input
              type="number"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={metricType === 'heartRate' ? 'e.g. 74' : metricType === 'temperature' ? 'e.g. 37.1' : 'e.g. 98'}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsManualLogOpen(false)}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              Save Reading
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
