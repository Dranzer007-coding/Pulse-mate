import React, { useState, useEffect } from 'react';
import { HealthDataProvider, useHealthData } from './context/HealthDataContext';
import { TopBar } from './components/layout/TopBar';
import { BottomNav } from './components/layout/BottomNav';
import { SidebarNav } from './components/layout/SidebarNav';
import { OfflineBanner } from './components/layout/OfflineBanner';
import { DemoToolbar } from './components/layout/DemoToolbar';
import { Smartphone, Monitor, Wifi, Battery, Sparkles } from 'lucide-react';

// Views
import { HomeView } from './views/HomeView';
import { HealthView } from './views/HealthView';
import { InsightsView } from './views/InsightsView';
import { DisasterView } from './views/DisasterView';
import { EmergencyView } from './views/EmergencyView';
import { LifestyleView } from './views/LifestyleView';
import { DevicesView } from './views/DevicesView';
import { ProfileView } from './views/ProfileView';

// Modals
import { ManualLoggingModal } from './components/modals/ManualLoggingModal';
import { FallDetectionModal } from './components/modals/FallDetectionModal';
import { EmergencySOSModal } from './components/modals/EmergencySOSModal';
import { HealthReportModal } from './components/modals/HealthReportModal';
import { NotificationCenterModal } from './components/modals/NotificationCenterModal';
import { AIDiagnosticStoryModal } from './components/modals/AIDiagnosticStoryModal';

const AppContent = () => {
  const { activeTab, userData } = useHealthData();
  const [viewMode, setViewMode] = useState('phone'); // 'phone' or 'full'
  const [currentTime, setCurrentTime] = useState('9:41');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'health':
        return <HealthView />;
      case 'insights':
        return <InsightsView />;
      case 'disaster':
        return <DisasterView />;
      case 'emergency':
        return <EmergencyView />;
      case 'lifestyle':
        return <LifestyleView />;
      case 'devices':
        return <DevicesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="app-viewport-wrapper">
      {/* Top Presentation Bar for Device Frame Switching */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: viewMode === 'phone' ? '420px' : '1280px',
        marginBottom: '0.75rem',
        padding: '0 0.25rem',
        transition: 'max-width 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="#00f2fe" />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'white', letterSpacing: '0.04em' }}>
            PULSE MATE MOBILE APP
          </span>
        </div>

        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '3px' }}>
          <button
            onClick={() => setViewMode('phone')}
            style={{
              background: viewMode === 'phone' ? 'linear-gradient(135deg, #00f2fe, #3b82f6)' : 'transparent',
              border: 'none',
              color: viewMode === 'phone' ? '#070a14' : 'var(--text-sub)',
              fontWeight: 700,
              fontSize: '0.72rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '9px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Smartphone size={13} />
            <span>Mobile Device</span>
          </button>

          <button
            onClick={() => setViewMode('full')}
            style={{
              background: viewMode === 'full' ? 'linear-gradient(135deg, #00f2fe, #3b82f6)' : 'transparent',
              border: 'none',
              color: viewMode === 'full' ? '#070a14' : 'var(--text-sub)',
              fontWeight: 700,
              fontSize: '0.72rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '9px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Monitor size={13} />
            <span>Full Width</span>
          </button>
        </div>
      </div>

      {/* Main Smartphone Shell Container */}
      <div className={viewMode === 'phone' ? 'phone-device-frame' : 'glass-card'} style={{
        width: '100%',
        maxWidth: viewMode === 'phone' ? '420px' : '1280px',
        transition: 'all 0.3s ease'
      }}>
        {/* Dynamic Island / Notch (Only in Phone Frame mode) */}
        {viewMode === 'phone' && (
          <>
            <div className="phone-notch">
              <div className="camera-lens" />
            </div>

            {/* Smartphone OS Status Bar */}
            <div className="phone-status-bar">
              <span>{currentTime}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Wifi size={13} />
                <span style={{ fontSize: '0.7rem' }}>5G</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <Battery size={14} color="#10b981" />
                  <span style={{ fontSize: '0.68rem', fontWeight: 800 }}>{userData.deviceBattery}%</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Scrollable Mobile Screen Content */}
        <div className="phone-screen-content">
          <TopBar onOpenMenu={() => setIsSidebarOpen(true)} />
          <OfflineBanner />

          <main style={{ padding: '0.85rem', flex: 1 }}>
            <DemoToolbar />
            {renderActiveView()}
          </main>

          {/* Un-cluttered Bottom Navigation Bar with Sidebar Trigger */}
          <BottomNav onOpenMenu={() => setIsSidebarOpen(true)} />
        </div>

        {/* iPhone Home Bar Indicator (Only in Phone Frame mode) */}
        {viewMode === 'phone' && <div className="phone-home-indicator" />}
      </div>

      {/* Navigation Sidebar Drawer */}
      <SidebarNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Modals */}
      <ManualLoggingModal />
      <FallDetectionModal />
      <EmergencySOSModal />
      <HealthReportModal />
      <NotificationCenterModal />
      <AIDiagnosticStoryModal />
    </div>
  );
};

export default function App() {
  return (
    <HealthDataProvider>
      <AppContent />
    </HealthDataProvider>
  );
}
