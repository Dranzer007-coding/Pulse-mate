import React, { useState } from 'react';
import { Heart, Wind, Brain, Activity, ShieldCheck, Zap } from 'lucide-react';

export const BodyAnatomyMap = () => {
  const [selectedOrgan, setSelectedOrgan] = useState('heart');

  const organData = {
    brain: {
      title: "Neurological & Fatigue Risk",
      risk: "Low Risk (15%)",
      status: "Optimal",
      details: "Sleep quality 85/100. Mental fatigue score low. HRV is 54ms.",
      icon: Brain,
      color: "#3b82f6"
    },
    heart: {
      title: "Cardiovascular System",
      risk: "Attention (45%)",
      status: "Elevated Resting HR",
      details: "HR 72 BPM (+12.5% vs baseline). Thermal strain detected during ambient heat exposure.",
      icon: Heart,
      color: "#ef4444"
    },
    lungs: {
      title: "Respiratory System",
      risk: "Low Risk (20%)",
      status: "Normal",
      details: "SpO2 is 98%. Respiratory rate 15 br/pm. AQI in local zone is 74 (Moderate).",
      icon: Wind,
      color: "#00f2fe"
    },
    metabolic: {
      title: "Metabolic & Glucose Strain",
      risk: "Low Risk (18%)",
      status: "Fasting Normal",
      details: "Blood Glucose 95 mg/dL. Hydration level 66% of daily target.",
      icon: Activity,
      color: "#10b981"
    },
    muscles: {
      title: "Musculoskeletal & Recovery",
      risk: "Low Risk (22%)",
      status: "Slight Muscle Strain",
      details: "Active calories 485 kcal. Recovery score 82/100.",
      icon: Zap,
      color: "#8b5cf6"
    }
  };

  const active = organData[selectedOrgan] || organData.heart;
  const ActiveIcon = active.icon;

  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Full Body Anatomical Assessment</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Tap any organ zone to inspect biological risk signals</p>
        </div>
        <span className="badge badge-stable" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={14} /> Edge AI Verified
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', mdDirection: 'row', gap: '1.5rem', alignItems: 'center' }}>
          {/* Anatomical Silhouette Diagram */}
          <div style={{
            position: 'relative',
            width: '180px',
            height: '280px',
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.1) 0%, rgba(15, 23, 42, 0.6) 70%)',
            borderRadius: '24px',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            {/* SVG Silhouette representation */}
            <svg viewBox="0 0 100 200" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 10px rgba(0,242,254,0.2))' }}>
              {/* Head */}
              <circle cx="50" cy="25" r="16" fill="rgba(0, 242, 254, 0.15)" stroke="#00f2fe" strokeWidth="1.5" />
              {/* Neck */}
              <rect x="46" y="41" width="8" height="10" fill="#00f2fe" opacity="0.3" />
              {/* Chest / Torso */}
              <path d="M 28 51 L 72 51 L 65 120 L 35 120 Z" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1.5" />
              {/* Arms */}
              <path d="M 26 52 L 12 110" stroke="#00f2fe" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              <path d="M 74 52 L 88 110" stroke="#00f2fe" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              {/* Legs */}
              <path d="M 40 120 L 35 185" stroke="#00f2fe" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
              <path d="M 60 120 L 65 185" stroke="#00f2fe" strokeWidth="4" strokeLinecap="round" opacity="0.4" />

              {/* Clickable Interactive Hotspots */}
              {/* Brain Hotspot */}
              <circle
                cx="50" cy="24" r="7"
                fill={selectedOrgan === 'brain' ? '#3b82f6' : 'rgba(59, 130, 246, 0.5)'}
                stroke="#ffffff" strokeWidth={selectedOrgan === 'brain' ? 2 : 0}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => setSelectedOrgan('brain')}
              />

              {/* Heart Hotspot */}
              <circle
                cx="54" cy="70" r="8"
                fill={selectedOrgan === 'heart' ? '#ef4444' : 'rgba(239, 68, 68, 0.6)'}
                stroke="#ffffff" strokeWidth={selectedOrgan === 'heart' ? 2 : 0}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease', filter: 'drop-shadow(0 0 6px #ef4444)' }}
                onClick={() => setSelectedOrgan('heart')}
              />

              {/* Lungs Hotspot */}
              <circle
                cx="42" cy="66" r="7"
                fill={selectedOrgan === 'lungs' ? '#00f2fe' : 'rgba(0, 242, 254, 0.5)'}
                stroke="#ffffff" strokeWidth={selectedOrgan === 'lungs' ? 2 : 0}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => setSelectedOrgan('lungs')}
              />

              {/* Metabolic Hotspot */}
              <circle
                cx="50" cy="95" r="7"
                fill={selectedOrgan === 'metabolic' ? '#10b981' : 'rgba(16, 185, 129, 0.5)'}
                stroke="#ffffff" strokeWidth={selectedOrgan === 'metabolic' ? 2 : 0}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => setSelectedOrgan('metabolic')}
              />

              {/* Muscle Hotspot */}
              <circle
                cx="38" cy="150" r="7"
                fill={selectedOrgan === 'muscles' ? '#8b5cf6' : 'rgba(139, 92, 246, 0.5)'}
                stroke="#ffffff" strokeWidth={selectedOrgan === 'muscles' ? 2 : 0}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => setSelectedOrgan('muscles')}
              />
            </svg>
          </div>

          {/* Detailed Organ Card Info */}
          <div style={{ flex: 1, width: '100%' }}>
            {/* Organ Selectors */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
              {Object.keys(organData).map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedOrgan(key)}
                  style={{
                    background: selectedOrgan === key ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${selectedOrgan === key ? '#00f2fe' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '12px',
                    padding: '0.35rem 0.75rem',
                    color: selectedOrgan === key ? '#00f2fe' : 'var(--text-sub)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Active Organ Detail View */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              padding: '1.25rem',
              border: `1px solid ${active.color}40`,
              boxShadow: `0 0 20px ${active.color}15`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: `${active.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${active.color}50`
                }}>
                  <ActiveIcon size={22} color={active.color} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{active.title}</h4>
                  <div style={{ fontSize: '0.78rem', color: active.color, fontWeight: 700 }}>
                    {active.risk} • <span style={{ color: 'var(--text-sub)', fontWeight: 500 }}>{active.status}</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {active.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
