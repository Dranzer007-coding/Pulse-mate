import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialUserData,
  initialVitals,
  initialAnomalies,
  initialRiskMatrix,
  initialEnvironmentData,
  initialActivityData,
  initialSleepData,
  initialMedications,
  initialHydration,
  initialDevices,
  initialClinics,
  initialTimeline
} from '../data/mockData';
import { detectAnomalies, calculateRiskMatrixAndScore } from '../ai/engine';

const HealthDataContext = createContext();

export const HealthDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [vitals, setVitals] = useState(initialVitals);
  const [anomalies, setAnomalies] = useState(initialAnomalies);
  const [riskMatrix, setRiskMatrix] = useState(initialRiskMatrix);
  const [environmentData, setEnvironmentData] = useState(initialEnvironmentData);
  const [activityData, setActivityData] = useState(initialActivityData);
  const [sleepData, setSleepData] = useState(initialSleepData);
  const [medications, setMedications] = useState(initialMedications);
  const [hydration, setHydration] = useState(initialHydration);
  const [devices, setDevices] = useState(initialDevices);
  const [clinics, setClinics] = useState(initialClinics);
  const [timeline, setTimeline] = useState(initialTimeline);

  const [activeTab, setActiveTab] = useState('home');
  const [offlineMode, setOfflineMode] = useState(false);

  // Modals state
  const [isManualLogOpen, setIsManualLogOpen] = useState(false);
  const [isFallModalOpen, setIsFallModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);

  // Dynamic AI evaluation on vital or environmental state change
  useEffect(() => {
    const aiAnomalies = detectAnomalies(vitals, environmentData, userData, hydration);
    const { riskMatrix: computedRisk, healthScore, healthScoreStatus } = calculateRiskMatrixAndScore(
      vitals, environmentData, hydration, sleepData
    );

    setAnomalies(aiAnomalies);
    setRiskMatrix(computedRisk);
    setUserData(prev => ({
      ...prev,
      healthScore,
      healthScoreStatus
    }));
  }, [vitals.heartRate.current, vitals.temperature.current, vitals.spo2.current, environmentData.temperature, environmentData.aqi, hydration.currentMl]);

  // Quick state update helper
  const addManualVital = (type, value) => {
    if (type === 'heartRate') {
      setVitals(prev => ({
        ...prev,
        heartRate: {
          ...prev.heartRate,
          current: Number(value),
          sparkline: [...prev.heartRate.sparkline.slice(1), Number(value)]
        }
      }));
    } else if (type === 'temperature') {
      setVitals(prev => ({
        ...prev,
        temperature: {
          ...prev.temperature,
          current: Number(value),
          sparkline: [...prev.temperature.sparkline.slice(1), Number(value)]
        }
      }));
    } else if (type === 'glucose') {
      setVitals(prev => ({
        ...prev,
        glucose: {
          ...prev.glucose,
          current: Number(value)
        }
      }));
    }
    
    // Add event to timeline
    const newEntry = {
      id: "t-" + Date.now(),
      time: "Just now",
      title: `Manual ${type} Reading Logged`,
      category: "Vitals",
      icon: "PlusCircle",
      description: `Value of ${value} manually entered into system.`
    };
    setTimeline(prev => [newEntry, ...prev]);
  };

  const toggleMedication = (id) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const addHydration = (amountMl) => {
    setHydration(prev => ({
      ...prev,
      currentMl: Math.min(prev.targetMl, prev.currentMl + amountMl),
      logHistory: [{ time: "Just now", amountMl }, ...prev.logHistory]
    }));
  };

  // Demo simulator scenarios for hackathon judging / feature testing
  const triggerHeatWaveAlert = () => {
    setEnvironmentData({
      location: "Austin, TX (Extreme Heat Zone)",
      temperature: 42.8,
      feelsLike: 47.5,
      humidity: 78,
      aqi: 95,
      aqiStatus: "Moderate",
      pm25: 35.0,
      pm10: 60.0,
      uvIndex: 11,
      heatRiskLevel: "EXTREME HEAT HAZARD",
      disasterModeActive: true,
      disasterType: "HEATWAVE",
      disasterAlertText: "EXTREME HEATWAVE WARNING: Temperature 42.8°C (Feels like 47.5°C). Avoid outdoor exposure. Drink hydration fluids now."
    });

    setRiskMatrix(prev => prev.map(r => r.name === "Heat Stress" ? { ...r, risk: "EXTREME", score: 92, color: "#ef4444" } : r));
    
    setAnomalies(prev => [
      {
        id: "heat-emerg-" + Date.now(),
        title: "Extreme Environmental Heat Hazard",
        severity: "Urgent",
        confidence: "98%",
        time: "Just now",
        description: "Outdoor temperature of 42.8°C with high humidity places body under severe heat exhaustion strain.",
        supportingSignals: ["Heat index 47.5°C", "Thermal radiation maxed", "HR elevation expected"],
        recommendations: ["Move to air-conditioned shelter", "Drink chilled water/electrolytes immediately", "Avoid physical activity"]
      },
      ...prev
    ]);
  };

  const triggerHeartRateAnomaly = () => {
    setVitals(prev => ({
      ...prev,
      heartRate: {
        ...prev.heartRate,
        current: 114,
        status: "Elevated Tachycardia",
        deviation: "+78% above resting baseline",
        sparkline: [70, 72, 75, 88, 102, 110, 114]
      }
    }));

    setAnomalies(prev => [
      {
        id: "hr-anom-" + Date.now(),
        title: "Acute Tachycardia Spike Detected",
        severity: "Urgent",
        confidence: "94%",
        time: "Just now",
        description: "Resting heart rate spiked to 114 BPM while accelerometer shows zero physical movement.",
        supportingSignals: ["HR 114 BPM while seated", "SpO2 96%", "HRV dropped to 28ms"],
        recommendations: [
          "Sit down, stay calm, and take deep slow breaths",
          "If accompanied by chest tightness, activate Emergency SOS",
          "Notify emergency contact if symptoms persist"
        ]
      },
      ...prev
    ]);

    setUserData(prev => ({ ...prev, healthScore: 68, healthScoreStatus: "Attention Needed" }));
  };

  const triggerFallEvent = () => {
    setIsFallModalOpen(true);
  };

  const triggerAqiSpike = () => {
    setEnvironmentData(prev => ({
      ...prev,
      aqi: 188,
      aqiStatus: "Unhealthy",
      pm25: 112.5,
      pm10: 160.0,
      disasterAlertText: "AIR POLLUTION ALERT: AQI 188. High PM2.5 detected. Wear N95 mask outdoors."
    }));
    setRiskMatrix(prev => prev.map(r => r.name === "Respiratory" ? { ...r, risk: "High Risk", score: 78, color: "#ef4444" } : r));
  };

  const toggleOfflineMode = () => {
    setOfflineMode(prev => !prev);
    setUserData(prev => ({ ...prev, isOnline: offlineMode }));
  };

  const resetDemo = () => {
    setUserData(initialUserData);
    setVitals(initialVitals);
    setAnomalies(initialAnomalies);
    setRiskMatrix(initialRiskMatrix);
    setEnvironmentData(initialEnvironmentData);
    setActivityData(initialActivityData);
    setSleepData(initialSleepData);
    setMedications(initialMedications);
    setHydration(initialHydration);
    setDevices(initialDevices);
    setClinics(initialClinics);
    setTimeline(initialTimeline);
    setOfflineMode(false);
    setIsFallModalOpen(false);
    setIsSosModalOpen(false);
  };

  return (
    <HealthDataContext.Provider
      value={{
        userData,
        setUserData,
        vitals,
        setVitals,
        anomalies,
        setAnomalies,
        riskMatrix,
        setRiskMatrix,
        environmentData,
        setEnvironmentData,
        activityData,
        setActivityData,
        sleepData,
        setSleepData,
        medications,
        setMedications,
        hydration,
        setHydration,
        devices,
        setDevices,
        clinics,
        setClinics,
        timeline,
        setTimeline,
        activeTab,
        setActiveTab,
        offlineMode,
        setOfflineMode,
        isManualLogOpen,
        setIsManualLogOpen,
        isFallModalOpen,
        setIsFallModalOpen,
        isSosModalOpen,
        setIsSosModalOpen,
        isReportModalOpen,
        setIsReportModalOpen,
        isNotificationCenterOpen,
        setIsNotificationCenterOpen,
        addManualVital,
        toggleMedication,
        addHydration,
        triggerHeatWaveAlert,
        triggerHeartRateAnomaly,
        triggerFallEvent,
        triggerAqiSpike,
        toggleOfflineMode,
        resetDemo
      }}
    >
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => useContext(HealthDataContext);
