import React from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { Pill, Droplet, Moon, Footprints, CheckCircle, Plus, Sparkles } from 'lucide-react';

export const LifestyleView = () => {
  const { medications, toggleMedication, hydration, addHydration, activityData, sleepData } = useHealthData();

  const stepsPct = Math.min(100, Math.round((activityData.stepsCurrent / activityData.stepsTarget) * 100));
  const hydroPct = Math.min(100, Math.round((hydration.currentMl / hydration.targetMl) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
          Lifestyle, Sleep & Medication Management
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)' }}>
          Activity goals, smart weather-adjusted hydration, sleep architecture, and medication adherence.
        </p>
      </div>

      <div className="grid-2">
        {/* Activity Card */}
        <div className="glass-card glass-card-glow-cyan" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Footprints size={20} color="#00f2fe" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Activity & Movement</h3>
            </div>
            <span className="badge badge-stable" style={{ fontSize: '0.65rem' }}>{activityData.streakDays} Day Streak 🔥</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Steps Goal Ring */}
            <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                <circle
                  cx="50" cy="50" r="40"
                  stroke="#00f2fe"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - stepsPct / 100)}
                  strokeLinecap="round"
                  fill="none"
                  style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white' }}>{stepsPct}%</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-sub)' }}>GOAL</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white' }}>{activityData.stepsCurrent.toLocaleString()}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Target: {activityData.stepsTarget.toLocaleString()} steps</div>
              <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600, marginTop: '4px' }}>
                {activityData.caloriesBurned} kcal • {activityData.distanceKm} km • {activityData.activeMinutes}m active
              </div>
            </div>
          </div>
        </div>

        {/* Smart Hydration Tracker */}
        <div className="glass-card glass-card-glow-cyan" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Droplet size={20} color="#3b82f6" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Weather-Adjusted Hydration</h3>
            </div>
            <span className="badge badge-monitor" style={{ fontSize: '0.65rem' }}>Smart Water Target</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#60a5fa' }}>
                {hydration.currentMl} <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>/ {hydration.targetMl} ml</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={13} /> {hydration.smartReminderReason}
              </div>
            </div>

            <button
              onClick={() => addHydration(250)}
              className="btn btn-primary"
              style={{ fontSize: '0.78rem', padding: '0.5rem 0.85rem' }}
            >
              <Plus size={15} /> +250ml
            </button>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${hydroPct}%`, height: '100%', background: '#3b82f6', borderRadius: '4px', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {/* Sleep Architecture & Recovery */}
      <div className="glass-card glass-card-glow-purple" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Moon size={22} color="#a855f7" />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Sleep Architecture & HRV Recovery</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Overnight sleep stage analysis correlated with cardiovascular recovery</p>
            </div>
          </div>
          <span className="badge badge-stable">Sleep Score: {sleepData.sleepScore}/100</span>
        </div>

        <div className="grid-4" style={{ gap: '0.85rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Total Duration</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>{sleepData.totalDuration}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Deep Sleep</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#3b82f6' }}>{sleepData.deepSleep}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Light Sleep</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#a855f7' }}>{sleepData.lightSleep}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Recovery Score</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>{sleepData.recoveryScore}/100</div>
          </div>
        </div>
      </div>

      {/* Medication Reminder Schedule */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Pill size={20} color="#fbbf24" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Medication & Treatment Reminders</h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>100% Weekly Adherence</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {medications.map(med => (
            <div key={med.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: med.taken ? 'var(--text-sub)' : 'white', textDecoration: med.taken ? 'line-through' : 'none' }}>
                  {med.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Dose: {med.dose} • Scheduled: {med.time} ({med.frequency})
                </div>
              </div>

              <button
                onClick={() => toggleMedication(med.id)}
                style={{
                  background: med.taken ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${med.taken ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
                  color: med.taken ? '#10b981' : 'white',
                  borderRadius: '12px',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <CheckCircle size={15} />
                <span>{med.taken ? 'Taken' : 'Mark as Taken'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
