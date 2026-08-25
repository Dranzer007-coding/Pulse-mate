import React, { useState } from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { AIInsightCard } from '../components/cards/AIInsightCard';
import { RiskMatrixCard } from '../components/cards/RiskMatrixCard';
import { BrainCircuit, MessageSquare, AlertCircle, ChevronRight, HelpCircle, Bot } from 'lucide-react';

export const InsightsView = () => {
  const { anomalies, openDiagnosticStory } = useHealthData();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const coachQuestions = [
    {
      q: "Why did my heat stress risk increase today?",
      a: "Your heat stress risk reached 45/100 due to a combination of high outdoor temperature (36.5°C) and an elevated resting heart rate (72 BPM). Drinking 500ml of water and moving indoors will reduce thermal strain."
    },
    {
      q: "What caused the heart rate elevation while resting?",
      a: "The elevated heart rate (14% above your 64 BPM baseline) coincides with high ambient heat and low hydration intake over the last 4 hours."
    },
    {
      q: "When should I consult a healthcare professional?",
      a: "You should seek medical attention if high resting HR is accompanied by shortness of breath, chest pressure, dizziness, or body temperature exceeding 38.5°C."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
          AI Health Watch & Risk Intelligence
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
          Early warning detection and predictive risk vectors powered by on-device edge intelligence.
        </p>
      </div>

      <div className="grid-2">
        {/* Left Column: AI Anomaly Detection Watch Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Detected Anomaly Stream</h3>
            <span className="badge badge-monitor">{anomalies.length} Active Insights</span>
          </div>

          {anomalies.map((anom) => (
            <AIInsightCard key={anom.id} anomaly={anom} onViewDetails={(a) => openDiagnosticStory(a)} />
          ))}
        </div>

        {/* Right Column: Unified Risk Matrix */}
        <div>
          <RiskMatrixCard />
        </div>
      </div>

      {/* AI Health Coach / Navigator Section */}
      <div className="glass-card glass-card-glow-purple" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #7f00ff, #e100ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(127, 0, 255, 0.4)'
          }}>
            <Bot size={24} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>AI Health Navigator & Guided Explainer</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Explainable health insights without medical jargon</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase' }}>
            Suggested Questions to Ask your AI Companion:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {coachQuestions.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: selectedQuestion === idx ? 'rgba(127, 0, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${selectedQuestion === idx ? '#a855f7' : 'rgba(255, 255, 255, 0.08)'}`,
                  borderRadius: '14px',
                  padding: '0.85rem 1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setSelectedQuestion(selectedQuestion === idx ? null : idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HelpCircle size={16} color="#00f2fe" />
                    {item.q}
                  </span>
                  <ChevronRight size={16} color="var(--text-muted)" style={{ transform: selectedQuestion === idx ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }} />
                </div>

                {selectedQuestion === idx && (
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
