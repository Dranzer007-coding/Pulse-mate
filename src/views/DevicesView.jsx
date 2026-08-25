import React from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { Cpu, Watch, Activity, Battery, CheckCircle2, XCircle, RefreshCw, Plus } from 'lucide-react';

export const DevicesView = () => {
  const { devices } = useHealthData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
            Device & Wearable Ecosystem Hub
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
            Multi-source health gateway connecting smartwatches, oximeters, and medical BLE sensors.
          </p>
        </div>

        <button onClick={() => alert("Scanning for nearby BLE health devices...")} className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '0.6rem 1.1rem' }}>
          <Plus size={16} />
          <span>+ Pair New Wearable</span>
        </button>
      </div>

      {/* Connected Devices Grid */}
      <div className="grid-3">
        {devices.map(dev => (
          <div key={dev.id} className="glass-card glass-card-glow-cyan" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Watch size={20} color="#00f2fe" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{dev.type}</span>
                </div>
                <span className={`badge ${dev.status === 'Connected' ? 'badge-stable' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>
                  {dev.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '0.4rem' }}>{dev.name}</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Battery size={14} color="#10b981" /> Battery: <strong>{dev.battery}%</strong>
              </div>

              {/* Supported vs Unsupported Metrics */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>
                  Supported Metric Stream:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {dev.supportedMetrics.map((m, i) => (
                    <span key={i} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <CheckCircle2 size={11} /> {m}
                    </span>
                  ))}
                </div>

                {dev.unsupportedMetrics.length > 0 && (
                  <>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                      Unsupported (Use Manual Input):
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {dev.unsupportedMetrics.map((m, i) => (
                        <span key={i} style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '8px' }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', borderRadius: '12px', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', marginTop: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <RefreshCw size={14} /> Sync Device Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
