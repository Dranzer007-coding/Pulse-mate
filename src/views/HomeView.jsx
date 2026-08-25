import React from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { HealthScoreCard } from '../components/cards/HealthScoreCard';
import { VitalCard } from '../components/cards/VitalCard';
import { AIInsightCard } from '../components/cards/AIInsightCard';
import { BodyAnatomyMap } from '../components/visuals/BodyAnatomyMap';
import { PlusCircle, Sun, Flame } from 'lucide-react';

export const HomeView = () => {
  const { userData, vitals, anomalies, environmentData, setIsManualLogOpen, setActiveTab } = useHealthData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Greeting Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
            Good morning, {userData.name} 👋
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
            Here is your real-time body analysis & health intelligence status today.
          </p>
        </div>

        <button
          onClick={() => setIsManualLogOpen(true)}
          className="btn btn-primary"
          style={{ fontSize: '0.82rem', padding: '0.6rem 1.1rem' }}
        >
          <PlusCircle size={16} />
          <span>+ Add Health Log</span>
        </button>
      </div>

      {/* Hero Health Score Card */}
      <HealthScoreCard />

      {/* Disaster Banner if Active */}
      {environmentData.disasterModeActive && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(245, 158, 11, 0.2))',
          border: '1px solid #ef4444',
          borderRadius: '20px',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: '0 0 25px rgba(239, 68, 68, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Flame size={28} color="#ef4444" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#f87171' }}>
                DISASTER HEALTH MODE — {environmentData.disasterType} ALERT
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                {environmentData.disasterAlertText}
              </div>
            </div>
          </div>
          <button onClick={() => setActiveTab('disaster')} className="btn btn-danger" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
            View Emergency Map
          </button>
        </div>
      )}

      {/* Vitals Cards Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Continuous Vitals Stream</h3>
          <button onClick={() => setActiveTab('health')} style={{ background: 'none', border: 'none', color: '#00f2fe', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
            View All Metrics →
          </button>
        </div>

        <div className="grid-3">
          <VitalCard type="heartRate" data={vitals.heartRate} title="Heart Rate" onExpand={() => setActiveTab('health')} />
          <VitalCard type="spo2" data={vitals.spo2} title="SpO2 Saturation" onExpand={() => setActiveTab('health')} />
          <VitalCard type="temperature" data={vitals.temperature} title="Body Temperature" onExpand={() => setActiveTab('health')} />
          <VitalCard type="bloodPressure" data={vitals.bloodPressure} title="Blood Pressure" onExpand={() => setActiveTab('health')} />
          <VitalCard type="glucose" data={vitals.glucose} title="Blood Glucose" onExpand={() => setActiveTab('health')} />
          
          {/* Environment Quick Card */}
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Sun size={18} /> Ambient Heat Risk
                </div>
                <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>{environmentData.heatRiskLevel}</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>{environmentData.temperature}°C</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Feels like {environmentData.feelsLike}°C • AQI {environmentData.aqi}</div>
            </div>
            <button onClick={() => setActiveTab('disaster')} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', borderRadius: '12px', padding: '0.4rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', marginTop: '0.75rem' }}>
              Inspect Environmental Safety →
            </button>
          </div>
        </div>
      </div>

      {/* AI Insight Teaser & Body Anatomy Map */}
      <div className="grid-2">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Top AI Health Watch</h3>
            <button onClick={() => setActiveTab('insights')} style={{ background: 'none', border: 'none', color: '#00f2fe', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
              Open AI Watch →
            </button>
          </div>
          {anomalies.length > 0 ? (
            <AIInsightCard anomaly={anomalies[0]} onViewDetails={() => setActiveTab('insights')} />
          ) : (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-sub)' }}>
              No critical health anomalies detected today.
            </div>
          )}
        </div>

        <BodyAnatomyMap />
      </div>
    </div>
  );
};
