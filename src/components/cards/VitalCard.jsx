import React from 'react';
import { SparklineChart } from '../visuals/SparklineChart';
import { Heart, Droplet, Thermometer, Activity, Zap, Maximize2 } from 'lucide-react';

const iconMap = {
  heartRate: Heart,
  spo2: Droplet,
  temperature: Thermometer,
  bloodPressure: Activity,
  glucose: Zap
};

const colorMap = {
  heartRate: '#ef4444',
  spo2: '#00f2fe',
  temperature: '#f59e0b',
  bloodPressure: '#8b5cf6',
  glucose: '#10b981'
};

export const VitalCard = ({ type, data, title, onExpand }) => {
  if (!data) return null;

  const Icon = iconMap[type] || Activity;
  const color = colorMap[type] || '#00f2fe';

  const isWarning = data.status === 'Attention' || data.status === 'Elevated Tachycardia';
  const isOptimal = data.status === 'Optimal' || data.status === 'Stable' || data.status === 'Normal' || data.status === 'Fasting Normal';

  const formatValue = () => {
    if (type === 'bloodPressure') return `${data.sys}/${data.dia}`;
    return data.current;
  };

  return (
    <div
      className={`glass-card ${isWarning ? 'glass-card-glow-red' : ''}`}
      style={{
        padding: '1.25rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
      onClick={onExpand}
    >
      <div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: `${color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${color}40`
            }}>
              <Icon size={18} color={color} />
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</span>
          </div>

          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
            title="Expand detailed chart"
          >
            <Maximize2 size={15} />
          </button>
        </div>

        {/* Metric Value & Unit */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.4rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, lineHeight: 1, color: '#ffffff' }}>
            {formatValue()}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)', fontWeight: 600 }}>{data.unit}</span>
        </div>

        {/* Baseline deviation pill */}
        <div style={{ fontSize: '0.75rem', color: isWarning ? '#f87171' : 'var(--text-sub)', fontWeight: 500, marginBottom: '0.85rem' }}>
          {data.deviation || `Baseline: ${data.baseline}`}
        </div>
      </div>

      {/* Sparkline & Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span className={`badge ${isWarning ? 'badge-urgent' : isOptimal ? 'badge-stable' : 'badge-warning'}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
          {data.status}
        </span>
        {data.sparkline && <SparklineChart data={data.sparkline} color={color} width={80} height={28} />}
      </div>
    </div>
  );
};
