import React, { useState } from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { TrendChart } from '../components/visuals/TrendChart';
import { PlusCircle, Activity, Heart, Droplet, Thermometer, Zap, ShieldCheck } from 'lucide-react';

export const HealthView = () => {
  const { vitals, setIsManualLogOpen } = useHealthData();
  const [selectedMetric, setSelectedMetric] = useState('heartRate');
  const [timeRange, setTimeRange] = useState('24h');

  const metricConfigs = {
    heartRate: { title: "Heart Rate", unit: "BPM", color: "#ef4444", icon: Heart, data: vitals.heartRate },
    spo2: { title: "SpO2 Saturation", unit: "%", color: "#00f2fe", icon: Droplet, data: vitals.spo2 },
    temperature: { title: "Body Temperature", unit: "°C", color: "#f59e0b", icon: Thermometer, data: vitals.temperature },
    bloodPressure: { title: "Blood Pressure", unit: "mmHg", color: "#8b5cf6", icon: Activity, data: vitals.bloodPressure },
    glucose: { title: "Blood Glucose", unit: "mg/dL", color: "#10b981", icon: Zap, data: vitals.glucose }
  };

  const active = metricConfigs[selectedMetric] || metricConfigs.heartRate;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
            Vitals & Personal Baseline Engine
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
            Continuous biometrics tracked against your personalized 30-day baseline ranges.
          </p>
        </div>
        <button onClick={() => setIsManualLogOpen(true)} className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '0.6rem 1.1rem' }}>
          <PlusCircle size={16} />
          <span>+ Add Manual Reading</span>
        </button>
      </div>

      {/* Metric Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
        {Object.keys(metricConfigs).map(key => {
          const cfg = metricConfigs[key];
          const Icon = cfg.icon;
          const isSel = selectedMetric === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedMetric(key)}
              style={{
                background: isSel ? 'rgba(0, 242, 254, 0.15)' : 'rgba(15, 23, 42, 0.7)',
                border: `1px solid ${isSel ? '#00f2fe' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '16px',
                padding: '0.75rem 1.25rem',
                color: isSel ? '#00f2fe' : 'var(--text-sub)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontWeight: isSel ? 700 : 500,
                fontSize: '0.88rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={18} color={isSel ? cfg.color : 'var(--text-muted)'} />
              <span>{cfg.title}</span>
            </button>
          );
        })}
      </div>

      {/* Detailed Chart View */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Detailed Time-Series Inspection
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>
              {active.title} — {active.data.current || `${active.data.sys}/${active.data.dia}`} {active.unit}
            </h2>
          </div>

          {/* Time Range Tabs */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '3px' }}>
            {['24h', '7d', '30d'].map(tr => (
              <button
                key={tr}
                onClick={() => setTimeRange(tr)}
                style={{
                  background: timeRange === tr ? 'rgba(0, 242, 254, 0.2)' : 'transparent',
                  border: 'none',
                  color: timeRange === tr ? '#00f2fe' : 'var(--text-muted)',
                  fontWeight: timeRange === tr ? 700 : 500,
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <TrendChart
          data={active.data.history24h || []}
          dataKey="value"
          color={active.color}
          height={260}
          unit={active.unit}
        />
      </div>

      {/* Personal Baseline Engine Breakdown */}
      <div className="glass-card glass-card-glow-purple" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <ShieldCheck size={24} color="#a855f7" />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Personal Baseline Intelligence</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Learned baseline comparison established from 30 continuous days of wearable sync</p>
          </div>
        </div>

        <div className="grid-3" style={{ gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Baseline Confidence</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>96% High</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>Based on 720 data points</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Normal Resting HR</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>{vitals.heartRate.baseline} BPM</div>
            <div style={{ fontSize: '0.72rem', color: '#f87171', marginTop: '2px' }}>Current: {vitals.heartRate.deviation}</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Safe Reference Zone</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00f2fe' }}>55 – 90 BPM</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>Clinical safe bounds</div>
          </div>
        </div>
      </div>
    </div>
  );
};
