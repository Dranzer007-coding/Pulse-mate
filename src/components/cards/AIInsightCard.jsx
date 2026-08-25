import React from 'react';
import { BrainCircuit, AlertTriangle, CheckCircle2, ChevronRight, ShieldAlert } from 'lucide-react';

export const AIInsightCard = ({ anomaly, onViewDetails }) => {
  if (!anomaly) return null;

  const isUrgent = anomaly.severity === 'Urgent';
  const isAttention = anomaly.severity === 'Attention';

  return (
    <div
      className={`glass-card ${isUrgent ? 'glass-card-glow-red' : isAttention ? 'glass-card-glow-amber' : 'glass-card-glow-purple'}`}
      style={{ padding: '1.25rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            background: isUrgent ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 92, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${isUrgent ? '#ef4444' : '#8b5cf6'}`
          }}>
            {isUrgent ? <ShieldAlert size={20} color="#ef4444" /> : <BrainCircuit size={20} color="#c084fc" />}
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Edge AI Health Watch • {anomaly.time}
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{anomaly.title}</h4>
          </div>
        </div>

        <span className={`badge ${isUrgent ? 'badge-urgent' : isAttention ? 'badge-warning' : 'badge-monitor'}`}>
          {anomaly.severity} ({anomaly.confidence})
        </span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.5 }}>
        {anomaly.description}
      </p>

      {/* Supporting Signals */}
      {anomaly.supportingSignals && anomaly.supportingSignals.length > 0 && (
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '0.75rem', marginBottom: '0.85rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-sub)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
            Supporting Signals
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {anomaly.supportingSignals.map((signal, idx) => (
              <li key={idx} style={{ fontSize: '0.78rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00f2fe' }}></span>
                {signal}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Action */}
      {anomaly.recommendations && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={14} /> Recommended Action:
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            {anomaly.recommendations[0]}
          </p>
        </div>
      )}

      <button
        onClick={onViewDetails}
        className="btn btn-purple"
        style={{ width: '100%', fontSize: '0.8rem', padding: '0.55rem 1rem' }}
      >
        <span>View Complete AI Diagnostic Story</span>
        <ChevronRight size={15} />
      </button>
    </div>
  );
};
