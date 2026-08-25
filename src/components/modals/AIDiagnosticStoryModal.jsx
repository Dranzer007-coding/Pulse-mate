import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { X, BrainCircuit, ShieldAlert, CheckCircle2, Activity, ArrowRight, Download, HelpCircle } from 'lucide-react';

export const AIDiagnosticStoryModal = () => {
  const { selectedAnomalyForStory, isStoryModalOpen, setIsStoryModalOpen, setIsReportModalOpen, setActiveTab } = useHealthData();

  if (!isStoryModalOpen || !selectedAnomalyForStory) return null;

  const anomaly = selectedAnomalyForStory;
  const isUrgent = anomaly.severity === 'Urgent';
  const isAttention = anomaly.severity === 'Attention';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(7, 10, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div className={`glass-card ${isUrgent ? 'glass-card-glow-red' : isAttention ? 'glass-card-glow-amber' : 'glass-card-glow-purple'}`} style={{
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: isUrgent ? 'rgba(239, 68, 68, 0.2)' : 'linear-gradient(135deg, #7f00ff, #00f2fe)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${isUrgent ? '#ef4444' : '#00f2fe'}`,
              boxShadow: '0 0 15px rgba(0, 242, 254, 0.3)'
            }}>
              {isUrgent ? <ShieldAlert size={24} color="#ef4444" /> : <BrainCircuit size={24} color="#ffffff" />}
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00f2fe', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Edge AI Diagnostic Story Engine
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>{anomaly.title}</h3>
            </div>
          </div>

          <button
            onClick={() => setIsStoryModalOpen(false)}
            style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: 'white', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Status Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span className={`badge ${isUrgent ? 'badge-urgent' : isAttention ? 'badge-warning' : 'badge-monitor'}`}>
            Severity: {anomaly.severity}
          </span>
          <span className="badge badge-stable" style={{ fontSize: '0.7rem' }}>
            Confidence: {anomaly.confidence || '94%'}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
            Detected: {anomaly.time || 'Just now'}
          </span>
        </div>

        {/* Narrative Section: What Happened */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', padding: '1.1rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            📖 Diagnostic Overview
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {anomaly.description}
          </p>
        </div>

        {/* Timeline Sequence: How the Anomaly Unfolded */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#00f2fe', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            ⚡ Multi-Signal Timeline Progression
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {anomaly.supportingSignals && anomaly.supportingSignals.map((sig, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', padding: '0.7rem 0.9rem', borderRadius: '12px', border: '1px solid rgba(0, 242, 254, 0.15)' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                  {idx + 1}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'white', fontWeight: 600, flex: 1 }}>
                  {sig}
                </div>
                <ArrowRight size={14} color="var(--text-muted)" />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        {anomaly.recommendations && anomaly.recommendations.length > 0 && (
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', borderRadius: '16px', padding: '1.1rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} /> AI Recommended Mitigation Protocol:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {anomaly.recommendations.map((rec, i) => (
                <li key={i} style={{ fontSize: '0.84rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#10b981', fontWeight: 800 }}>•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button
            onClick={() => { setIsStoryModalOpen(false); setIsReportModalOpen(true); }}
            className="btn btn-purple"
            style={{ flex: 1, fontSize: '0.85rem', padding: '0.7rem' }}
          >
            <Download size={16} />
            <span>Export to Doctor Report</span>
          </button>

          <button
            onClick={() => { setIsStoryModalOpen(false); setActiveTab('insights'); }}
            className="btn btn-secondary"
            style={{ flex: 1, fontSize: '0.85rem', padding: '0.7rem' }}
          >
            <HelpCircle size={16} />
            <span>Ask AI Navigator</span>
          </button>
        </div>
      </div>
    </div>
  );
};
