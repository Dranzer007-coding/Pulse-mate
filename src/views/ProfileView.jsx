import React, { useState } from 'react';
import { useHealthData } from '../context/HealthDataContext';
import { User, Shield, Users, Lock, HardDrive, CheckCircle2, ChevronRight, Share2, Bell } from 'lucide-react';

export const ProfileView = () => {
  const { userData } = useHealthData();
  const [localProcessingOnly, setLocalProcessingOnly] = useState(true);
  const [caregiverSharing, setCaregiverSharing] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Profile Card */}
      <div className="glass-card glass-card-glow-purple" style={{ padding: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', border: '3px solid #00f2fe', overflow: 'hidden' }}>
            <img src={userData.avatar} alt={userData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>{userData.name}</h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)' }}>
              Age {userData.age} • Gender {userData.gender} • Blood Type {userData.bloodType}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
              <span className="badge badge-stable" style={{ fontSize: '0.65rem' }}>Health Score: {userData.healthScore}/100</span>
              <span className="badge badge-monitor" style={{ fontSize: '0.65rem' }}>{userData.deviceConnected}</span>
            </div>
          </div>
        </div>

        <button className="btn btn-purple" style={{ fontSize: '0.82rem' }}>
          Edit Health Profile
        </button>
      </div>

      <div className="grid-2">
        {/* Privacy Command Center */}
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={20} color="#00f2fe" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Privacy Command Center</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '14px' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>Local On-Device AI Processing</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Process vital algorithms locally on your phone</div>
              </div>
              <input
                type="checkbox"
                checked={localProcessingOnly}
                onChange={() => setLocalProcessingOnly(!localProcessingOnly)}
                style={{ width: '18px', height: '18px', accentColor: '#00f2fe', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '14px' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>Caregiver Alert Sharing</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Share emergency alerts with family circle</div>
              </div>
              <input
                type="checkbox"
                checked={caregiverSharing}
                onChange={() => setCaregiverSharing(!caregiverSharing)}
                style={{ width: '18px', height: '18px', accentColor: '#00f2fe', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Family & Caregiver Circle */}
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} color="#a855f7" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Family & Caregiver Circle</h3>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#00f2fe', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
              + Add Member
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {userData.emergencyContacts.map((contact, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '14px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'white' }}>{contact.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>{contact.relation} • {contact.phone}</div>
                </div>
                <span className="badge badge-stable" style={{ fontSize: '0.65rem' }}>
                  {contact.isPrimary ? 'Primary SOS' : 'Caregiver'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
