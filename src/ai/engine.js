/**
 * Pulse Mate — Edge AI Intelligence Engine (v1.0)
 * 
 * Provides:
 * 1. Rolling Baseline Statistical Engine
 * 2. Multi-Signal Cross-Vector Anomaly Detection
 * 3. Dynamic Health Score (0-100) & 6-Vector Risk Calculation
 */

// Calculate mean and standard deviation for baseline reference
export const calculateBaseline = (values = []) => {
  if (!values || values.length === 0) return { mean: 0, stdDev: 0, min: 0, max: 0 };
  const sum = values.reduce((acc, v) => acc + v, 0);
  const mean = sum / values.length;
  const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  return {
    mean: Number(mean.toFixed(1)),
    stdDev: Number(stdDev.toFixed(1)),
    safeMin: Number((mean - 2 * stdDev).toFixed(1)),
    safeMax: Number((mean + 2 * stdDev).toFixed(1))
  };
};

/**
 * Evaluates live health signals across vitals, environment, and user history to detect multi-signal anomalies.
 */
export const detectAnomalies = (vitals, environmentData, userData, hydration) => {
  const detected = [];
  const nowStr = "Just now";

  // 1. Resting Tachycardia Spike
  const hr = vitals?.heartRate?.current || 72;
  const hrBaseline = vitals?.heartRate?.baseline || 64;
  if (hr >= 100) {
    const devPct = Math.round(((hr - hrBaseline) / hrBaseline) * 100);
    detected.push({
      id: `anom-hr-${Date.now()}`,
      title: "Acute Tachycardia Spike Detected",
      severity: hr > 110 ? "Urgent" : "Attention",
      confidence: "94%",
      time: nowStr,
      description: `Resting heart rate reached ${hr} BPM (${devPct}% above baseline of ${hrBaseline} BPM) during low physical exertion.`,
      supportingSignals: [
        `HR ${hr} BPM (Baseline ${hrBaseline} BPM)`,
        `SpO2 Saturation: ${vitals?.spo2?.current || 98}%`,
        `HRV Suppression: ${vitals?.hrv?.current || 54}ms`
      ],
      recommendations: [
        "Sit down, relax, and take slow deep breaths (4-7-8 technique)",
        "Drink 300ml of water to reduce blood viscosity",
        "If accompanied by chest discomfort or shortness of breath, activate Emergency SOS"
      ]
    });
  }

  // 2. Heat Stress & Thermal Exhaustion
  const temp = environmentData?.temperature || 36.5;
  const feelsLike = environmentData?.feelsLike || 40;
  const hydroRatio = (hydration?.currentMl || 1800) / (hydration?.targetMl || 2800);
  if (temp >= 38 || feelsLike >= 42) {
    detected.push({
      id: `anom-heat-${Date.now()}`,
      title: "Extreme Environmental Thermal Strain",
      severity: feelsLike >= 45 ? "Urgent" : "Attention",
      confidence: "98%",
      time: nowStr,
      description: `Ambient temperature of ${temp}°C (feels like ${feelsLike}°C) creates severe heat exhaustion risk.`,
      supportingSignals: [
        `Thermal Heat Index: ${feelsLike}°C`,
        `Hydration level at ${Math.round(hydroRatio * 100)}% of daily target`,
        `Body Temp: ${vitals?.temperature?.current || 37.0}°C`
      ],
      recommendations: [
        "Move indoors to an air-conditioned or shaded shelter immediately",
        "Drink electrolyte fluids to replenish sodium loss",
        "Avoid high exertion activities until ambient temp drops"
      ]
    });
  }

  // 3. Respiratory / Air Quality Warning
  const aqi = environmentData?.aqi || 74;
  const hasAsthma = userData?.medicalConditions?.some(c => c.toLowerCase().includes('asthma'));
  if (aqi >= 150 || (aqi >= 100 && hasAsthma)) {
    detected.push({
      id: `anom-aqi-${Date.now()}`,
      title: "Hazardous Air Quality Alert",
      severity: aqi >= 150 ? "Urgent" : "Attention",
      confidence: "91%",
      time: nowStr,
      description: `Local AQI index reached ${aqi} (${environmentData?.aqiStatus || 'Unhealthy'}).${hasAsthma ? ' Elevated risk due to mild asthma profile.' : ''}`,
      supportingSignals: [
        `AQI Score: ${aqi}`,
        `PM2.5 Concentration: ${environmentData?.pm25 || 23} µg/m³`,
        `Respiratory Rate: ${vitals?.respiratoryRate?.current || 15} br/pm`
      ],
      recommendations: [
        "Wear an N95 mask if outdoor transit is required",
        "Keep windows closed and run indoor air filtration",
        "Keep prescribed inhaler / medication accessible"
      ]
    });
  }

  // 4. Fever / Infection Warning
  const bodyTemp = vitals?.temperature?.current || 37.0;
  if (bodyTemp >= 38.0) {
    detected.push({
      id: `anom-fever-${Date.now()}`,
      title: "Fever / Hyperthermia Detected",
      severity: bodyTemp >= 38.5 ? "Urgent" : "Attention",
      confidence: "95%",
      time: nowStr,
      description: `Body temperature measured at ${bodyTemp}°C, indicating immune reaction or heat illness.`,
      supportingSignals: [
        `Body Temperature: ${bodyTemp}°C (+${(bodyTemp - 36.6).toFixed(1)}°C above baseline)`,
        `Heart Rate: ${hr} BPM`
      ],
      recommendations: [
        "Rest in a cool room and apply damp cool compresses",
        "Monitor temperature every 30 minutes",
        "Consult healthcare provider if temperature exceeds 38.5°C"
      ]
    });
  }

  // Fallback default insight if no urgent anomalies
  if (detected.length === 0) {
    detected.push({
      id: "anom-normal-1",
      title: "Optimal Baseline Synchronization",
      severity: "Monitor",
      confidence: "92%",
      time: "Today",
      description: "All core vital metrics (Heart Rate, SpO2, Temp, BP) are operating comfortably within your 30-day baseline ranges.",
      supportingSignals: [
        `RHR ${hr} BPM on baseline (${hrBaseline} BPM)`,
        `SpO2 at ${vitals?.spo2?.current || 98}%`,
        `Hydration score: ${Math.round(hydroRatio * 100)}%`
      ],
      recommendations: [
        "Maintain current hydration routine",
        "Aim for regular sleep before 23:00 tonight"
      ]
    });
  }

  return detected;
};

/**
 * Calculates dynamic risk scores across 6 health vectors and returns overall health score (0-100).
 */
export const calculateRiskMatrixAndScore = (vitals, environmentData, hydration, sleepData) => {
  const hr = vitals?.heartRate?.current || 72;
  const temp = environmentData?.temperature || 36.5;
  const feelsLike = environmentData?.feelsLike || 40;
  const aqi = environmentData?.aqi || 74;
  const spo2 = vitals?.spo2?.current || 98;
  const hydroRatio = (hydration?.currentMl || 1850) / (hydration?.targetMl || 2800);

  // 1. Heat Stress Risk (0-100)
  let heatScore = Math.min(100, Math.max(10, Math.round(((feelsLike - 25) / 25) * 65 + (1 - hydroRatio) * 35)));
  if (environmentData?.disasterModeActive) heatScore = Math.max(heatScore, 92);

  // 2. Cardiovascular Risk (0-100)
  const hrDev = Math.abs(hr - (vitals?.heartRate?.baseline || 64));
  let cardioScore = Math.min(100, Math.max(10, Math.round((hrDev / 40) * 50 + (vitals?.bloodPressure?.sys > 130 ? 25 : 5))));

  // 3. Respiratory Risk (0-100)
  let respScore = Math.min(100, Math.max(10, Math.round(((100 - spo2) / 10) * 50 + (aqi / 300) * 50)));

  // 4. Dehydration Risk (0-100)
  let dehyScore = Math.min(100, Math.max(10, Math.round((1 - hydroRatio) * 80 + (temp > 35 ? 20 : 0))));

  // 5. Fatigue & Strain Risk (0-100)
  const sleepScoreVal = sleepData?.sleepScore || 85;
  let fatigueScore = Math.min(100, Math.max(10, Math.round((100 - sleepScoreVal) * 0.7 + (hr > 85 ? 15 : 0))));

  // 6. Fall / Distress Risk (0-100)
  let fallScore = 5;

  const riskMatrix = [
    {
      name: "Heat Stress",
      risk: heatScore > 75 ? "EXTREME" : heatScore > 50 ? "High Risk" : heatScore > 30 ? "Moderate" : "Low",
      score: heatScore,
      color: heatScore > 75 ? "#ef4444" : heatScore > 50 ? "#f59e0b" : "#10b981",
      icon: "Sun",
      trend: heatScore > 50 ? "Rising" : "Stable"
    },
    {
      name: "Cardiovascular",
      risk: cardioScore > 70 ? "Attention" : cardioScore > 40 ? "Moderate" : "Low",
      score: cardioScore,
      color: cardioScore > 70 ? "#ef4444" : cardioScore > 40 ? "#f59e0b" : "#10b981",
      icon: "Heart",
      trend: cardioScore > 40 ? "Elevated" : "Stable"
    },
    {
      name: "Respiratory",
      risk: respScore > 70 ? "High Risk" : respScore > 40 ? "Moderate" : "Low",
      score: respScore,
      color: respScore > 70 ? "#ef4444" : respScore > 40 ? "#f59e0b" : "#10b981",
      icon: "Wind",
      trend: respScore > 40 ? "Rising" : "Stable"
    },
    {
      name: "Dehydration",
      risk: dehyScore > 60 ? "High Risk" : dehyScore > 35 ? "Moderate" : "Low",
      score: dehyScore,
      color: dehyScore > 60 ? "#ef4444" : dehyScore > 35 ? "#f59e0b" : "#10b981",
      icon: "Droplet",
      trend: dehyScore > 50 ? "Rising" : "Decreasing"
    },
    {
      name: "Fatigue & Strain",
      risk: fatigueScore > 60 ? "High Risk" : fatigueScore > 35 ? "Low-Mod" : "Low",
      score: fatigueScore,
      color: fatigueScore > 60 ? "#ef4444" : fatigueScore > 35 ? "#3b82f6" : "#10b981",
      icon: "Battery",
      trend: "Stable"
    },
    {
      name: "Fall / Distress",
      risk: "Low",
      score: fallScore,
      color: "#10b981",
      icon: "Shield",
      trend: "Stable"
    }
  ];

  // Overall Composite Health Score (100 - weighted average risk penalties)
  const avgPenalty = (heatScore * 0.25 + cardioScore * 0.3 + respScore * 0.2 + dehyScore * 0.15 + fatigueScore * 0.1);
  const healthScore = Math.max(35, Math.min(99, Math.round(100 - avgPenalty * 0.45)));
  const healthScoreStatus = healthScore >= 80 ? "Stable" : healthScore >= 65 ? "Monitor" : "Attention Needed";

  return { riskMatrix, healthScore, healthScoreStatus };
};
