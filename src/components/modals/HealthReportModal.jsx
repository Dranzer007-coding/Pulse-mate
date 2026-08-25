import React from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { X, FileText, Download, Share2, QrCode, CheckCircle2 } from 'lucide-react';

export const HealthReportModal = () => {
  const { isReportModalOpen, setIsReportModalOpen, userData, vitals, anomalies, medications } = useHealthData();

  if (!isReportModalOpen) return null;

  const handleDownloadPdf = () => {
    alert("Pulse_Mate_Doctor_Ready_Health_Report.pdf generated and downloaded!");
    setIsReportModalOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card glass-card-glow-purple" style={{ width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={22} color="#a855f7" />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Doctor-Ready Health Summary Report</h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>Exportable medical summary for clinical consultations</p>
            </div>
          </div>
          <button onClick={() => setIsReportModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Report Preview Document */}
        <div style={{
          background: '#070a14',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.25rem',
          marginBottom: '1.25rem',
          fontSize: '0.85rem',
          lineHeight: 1.6
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'white' }}>{userData.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Age: {userData.age} • Gender: {userData.gender} • Blood Type: {userData.bloodType}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, color: '#00f2fe' }}>Pulse Mate Summary</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Generated: August 24, 2026</div>
            </div>
          </div>

          <div style={{ marginBottom: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase' }}>Recorded Vitals Baseline & Means</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem', marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
              <div>• Heart Rate Mean: {vitals.heartRate.current} BPM (Resting Baseline {vitals.heartRate.baseline} BPM)</div>
              <div>• Blood Pressure: {vitals.bloodPressure.sys}/{vitals.bloodPressure.dia} mmHg</div>
              <div>• SpO2 Oxygen Saturation: {vitals.spo2.current}%</div>
              <div>• Body Temperature: {vitals.temperature.current}°C</div>
            </div>
          </div>

          <div style={{ marginBottom: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase' }}>Recent AI Health Watch Findings</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
              {anomalies.length > 0 ? (
                <span>Detected: {anomalies[0].title} — {anomalies[0].description}</span>
              ) : (
                <span>No critical health anomalies detected in the past 30 days.</span>
              )}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase' }}>Active Medications & Adherence</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
              {medications.map(m => `${m.name} (${m.dose}) - ${m.frequency}`).join(', ')}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={handleDownloadPdf}
            className="btn btn-purple"
            style={{ flex: 1, padding: '0.7rem' }}
          >
            <Download size={16} />
            <span>Download PDF Report</span>
          </button>

          <button
            onClick={() => alert("Secure QR Code access link generated!")}
            className="btn btn-secondary"
            style={{ padding: '0.7rem' }}
          >
            <QrCode size={16} />
            <span>Share via QR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
