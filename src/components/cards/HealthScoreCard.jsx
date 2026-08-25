import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { ShieldCheck, TrendingUp, ChevronRight, Activity } from 'lucide-react';

export const HealthScoreCard = () => {
  const { userData, setActiveTab } = useHealthData();
  const score = userData.healthScore || 82;

  // SVG ring calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card glass-card-glow-cyan" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00f2fe', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Health Intelligence Assessment
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.1rem' }}>
            Overall Health Score
          </h2>
        </div>
        <span className="badge badge-stable">
          <ShieldCheck size={14} /> {userData.healthScoreStatus}
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        {/* Score Ring */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ position: 'relative', width: '130px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="65" cy="65" r={radius}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="65" cy="65" r={radius}
                stroke="url(#score-gradient)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out', filter: 'drop-shadow(0 0 10px #00f2fe)' }}
              />
              <defs>
                <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2fe" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#7f00ff" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, lineHeight: 1, color: '#ffffff' }}>
                {score}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)', fontWeight: 600 }}>OUT OF 100</div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Body Status: Optimal Recovery
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.4 }}>
              Your vital signs and baseline metrics are well synchronized. Continuous edge AI monitoring active.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
              <TrendingUp size={15} />
              <span>{userData.healthScoreTrend}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setActiveTab('health')}
          className="btn btn-primary"
          style={{ fontSize: '0.85rem', padding: '0.7rem 1.2rem', whiteSpace: 'nowrap' }}
        >
          <Activity size={16} />
          <span>Full Vitals Breakdown</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
