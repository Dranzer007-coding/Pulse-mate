import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { Sun, Heart, Wind, Droplet, Battery, Shield } from 'lucide-react';

const iconMap = {
  Sun,
  Heart,
  Wind,
  Droplet,
  Battery,
  Shield
};

export const RiskMatrixCard = () => {
  const { riskMatrix } = useHealthData();

  return (
    <div className="glass-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>Personalized Health Risk Engine</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Unified risk scores combining vitals, activity & environment</p>
        </div>
        <span style={{ fontSize: '0.7rem', color: '#00f2fe', background: 'rgba(0, 242, 254, 0.1)', padding: '3px 8px', borderRadius: '10px', fontWeight: 600 }}>
          6 Vectors
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {riskMatrix.map((item, i) => {
          const Icon = iconMap[item.icon] || Shield;
          return (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon size={16} color={item.color} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
                  <span style={{ color: item.color, fontWeight: 700 }}>{item.risk}</span>
                  <span style={{ color: 'var(--text-muted)' }}>({item.score}/100)</span>
                </div>
              </div>
              <div style={{ width: '100%', height: '7px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${item.score}%`,
                    height: '100%',
                    background: item.color,
                    borderRadius: '4px',
                    boxShadow: `0 0 8px ${item.color}`,
                    transition: 'width 0.8s ease-in-out'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
