import React from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { CloudLightning, MapPin, ShieldCheck } from 'lucide-react';

export const DisasterView = () => {
  const { environmentData, triggerHeatWaveAlert, offlineMode } = useHealthData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
            Disaster Health & Environmental Intelligence
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
            Real-time heat waves, air quality alerts, and offline disaster resilience protection.
          </p>
        </div>

        <button
          onClick={triggerHeatWaveAlert}
          className="btn btn-danger"
          style={{ fontSize: '0.82rem', padding: '0.6rem 1.1rem' }}
        >
          <CloudLightning size={16} />
          <span>Simulate Heatwave Alert</span>
        </button>
      </div>

      {/* Prominent Disaster Banner */}
      <div className={`glass-card ${environmentData.disasterModeActive ? 'glass-card-glow-red' : 'glass-card-glow-amber'}`} style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <CloudLightning size={24} color={environmentData.disasterModeActive ? '#ef4444' : '#f59e0b'} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {environmentData.disasterModeActive ? 'HEATWAVE EMERGENCY MODE ACTIVE' : 'ENVIRONMENTAL RISK MONITORING'}
            </h2>
          </div>
          <span className={`badge ${environmentData.disasterModeActive ? 'badge-urgent' : 'badge-warning'}`}>
            {environmentData.heatRiskLevel}
          </span>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.5 }}>
          {environmentData.disasterAlertText || "Current ambient temperature is 36.5°C with high humidity (62%). High heat stress precautions advised for outdoor activities."}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', mdGridColumns: 'repeat(4, 1fr)' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.75rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Ambient Temp</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>{environmentData.temperature}°C</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.75rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Feels Like</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ef4444' }}>{environmentData.feelsLike}°C</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.75rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>AQI Index</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00f2fe' }}>{environmentData.aqi}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.75rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>UV Index</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#8b5cf6' }}>{environmentData.uvIndex} Very High</div>
          </div>
        </div>
      </div>

      {/* Map Simulation & Nearby Safe Zones */}
      <div className="grid-2">
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={18} color="#00f2fe" /> Heat Risk Zone Map
            </h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Location: {environmentData.location}</span>
          </div>

          {/* Map Graphic Box */}
          <div style={{
            width: '100%',
            height: '220px',
            background: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.25) 0%, rgba(15, 23, 42, 0.9) 75%)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Grid overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />

            {/* Current Position Marker */}
            <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#00f2fe', boxShadow: '0 0 15px #00f2fe', margin: '0 auto 4px', animation: 'pulseGlow 1.5s infinite' }} />
              <div style={{ background: '#070a14', color: '#00f2fe', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', border: '1px solid #00f2fe' }}>
                You Are Here (High Heat Zone)
              </div>
            </div>

            {/* Nearby Shelter Pin */}
            <div style={{ position: 'absolute', top: '25%', left: '75%', textAlign: 'center' }}>
              <div style={{ background: '#10b981', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '10px' }}>
                ❄️ Cooling Shelter (0.8km)
              </div>
            </div>
          </div>
        </div>

        {/* Offline Disaster Guides */}
        <div className="glass-card glass-card-glow-cyan" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} color="#10b981" /> Cached Survival Guides (Offline)
            </h3>
            <span className="badge badge-stable" style={{ fontSize: '0.65rem' }}>Local Storage Ready</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fbbf24' }}>Heat Stroke Prevention & Symptoms</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '2px' }}>
                If skin is hot and dry, confusion occurs, or temperature &gt; 39°C, apply cold ice packs to neck/armpits immediately.
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#60a5fa' }}>Severe Air Pollution Protocol</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '2px' }}>
                Seal windows, run HEPA filter indoor air cleaner, avoid outdoor aerobic exercises when AQI &gt; 150.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
