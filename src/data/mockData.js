export const initialUserData = {
  name: "Alex Rivera",
  age: 34,
  gender: "Male",
  bloodType: "O+",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  deviceConnected: "ASW-47 Ultra Smartwatch",
  deviceBattery: 88,
  lastSyncedMinutesAgo: 2,
  isOnline: true,
  healthScore: 82,
  healthScoreStatus: "Stable",
  healthScoreTrend: "+4% vs last week",
  allergies: ["Penicillin", "Peanuts"],
  medicalConditions: ["Mild Asthma"],
  emergencyContacts: [
    { name: "Elena Rivera", relation: "Spouse", phone: "+1 (555) 234-5678", isPrimary: true },
    { name: "Dr. Marcus Vance", relation: "Primary Physician", phone: "+1 (555) 987-6543", isPrimary: false }
  ]
};

export const initialVitals = {
  heartRate: {
    current: 72,
    unit: "BPM",
    status: "Stable",
    baseline: 64,
    safeMin: 55,
    safeMax: 90,
    deviation: "+12.5% vs baseline",
    sparkline: [68, 70, 71, 75, 78, 74, 72],
    history24h: [
      { time: "00:00", value: 62 },
      { time: "04:00", value: 58 },
      { time: "08:00", value: 74 },
      { time: "12:00", value: 82 },
      { time: "16:00", value: 78 },
      { time: "20:00", value: 72 }
    ]
  },
  spo2: {
    current: 98,
    unit: "%",
    status: "Optimal",
    baseline: 98,
    safeMin: 95,
    safeMax: 100,
    deviation: "On baseline",
    sparkline: [98, 97, 98, 99, 98, 98, 98],
    history24h: [
      { time: "00:00", value: 98 },
      { time: "04:00", value: 97 },
      { time: "08:00", value: 98 },
      { time: "12:00", value: 99 },
      { time: "16:00", value: 98 },
      { time: "20:00", value: 98 }
    ]
  },
  temperature: {
    current: 37.0,
    unit: "°C",
    status: "Stable",
    baseline: 36.6,
    safeMin: 36.1,
    safeMax: 37.3,
    deviation: "+0.4°C vs baseline",
    sparkline: [36.6, 36.7, 36.8, 37.1, 37.2, 37.0, 37.0],
    history24h: [
      { time: "00:00", value: 36.5 },
      { time: "04:00", value: 36.4 },
      { time: "08:00", value: 36.8 },
      { time: "12:00", value: 37.2 },
      { time: "16:00", value: 37.1 },
      { time: "20:00", value: 37.0 }
    ]
  },
  bloodPressure: {
    sys: 118,
    dia: 76,
    unit: "mmHg",
    status: "Normal",
    baseline: "116/74",
    safeRange: "90/60 - 120/80",
    deviation: "+2 mmHg sys",
    sparkline: [115, 116, 120, 118, 119, 117, 118],
    history24h: [
      { time: "00:00", value: 112 },
      { time: "04:00", value: 108 },
      { time: "08:00", value: 122 },
      { time: "12:00", value: 120 },
      { time: "16:00", value: 119 },
      { time: "20:00", value: 118 }
    ]
  },
  glucose: {
    current: 95,
    unit: "mg/dL",
    status: "Fasting Normal",
    baseline: 92,
    safeMin: 70,
    safeMax: 140,
    deviation: "+3 mg/dL",
    sparkline: [90, 92, 110, 105, 98, 94, 95],
    history24h: [
      { time: "08:00", value: 88 },
      { time: "10:00", value: 125 },
      { time: "13:00", value: 110 },
      { time: "16:00", value: 96 },
      { time: "19:00", value: 104 },
      { time: "21:00", value: 95 }
    ]
  },
  hrv: {
    current: 54,
    unit: "ms",
    status: "Moderate",
    baseline: 62,
    deviation: "-12.9% lower",
    sparkline: [65, 62, 58, 55, 52, 53, 54]
  },
  respiratoryRate: {
    current: 15,
    unit: "br/pm",
    status: "Normal",
    baseline: 14,
    sparkline: [14, 14, 15, 16, 15, 15, 15]
  }
};

export const initialAnomalies = [
  {
    id: "anom-1",
    title: "Elevated Resting Heart Rate",
    severity: "Attention",
    confidence: "89%",
    time: "Today, 14:30",
    description: "Your resting heart rate remained elevated at 78 BPM for 3 consecutive hours while activity level was low.",
    supportingSignals: [
      "Resting HR 14% above 30-day baseline",
      "Ambient Temperature was 38°C",
      "Hydration level below recommended target"
    ],
    recommendations: [
      "Prioritize indoor rest in a air-conditioned room",
      "Drink 500ml of electrolytes / water immediately",
      "Monitor resting HR over the next 2 hours"
    ]
  },
  {
    id: "anom-2",
    title: "Slight Recovery Suppression",
    severity: "Monitor",
    confidence: "76%",
    time: "Yesterday",
    description: "HRV was suppressed by 12.9% following late workout session.",
    supportingSignals: ["Deep sleep duration down by 22m", "Late evening caloric intake"],
    recommendations: ["Light recovery walk today", "Aim for sleep before 22:30"]
  }
];

export const initialRiskMatrix = [
  { name: "Heat Stress", risk: "Moderate", score: 45, color: "#f59e0b", icon: "Sun", trend: "Rising" },
  { name: "Cardiovascular", risk: "Low", score: 18, color: "#10b981", icon: "Heart", trend: "Stable" },
  { name: "Respiratory", risk: "Low", score: 22, color: "#10b981", icon: "Wind", trend: "Stable" },
  { name: "Dehydration", risk: "Moderate", score: 55, color: "#f59e0b", icon: "Droplet", trend: "Rising" },
  { name: "Fatigue & Strain", risk: "Low-Mod", score: 32, color: "#3b82f6", icon: "Battery", trend: "Decreasing" },
  { name: "Fall / Distress", risk: "Low", score: 5, color: "#10b981", icon: "Shield", trend: "Stable" }
];

export const initialEnvironmentData = {
  location: "Austin, TX (Downtown Zone 4)",
  temperature: 36.5,
  feelsLike: 40.2,
  humidity: 62,
  aqi: 74,
  aqiStatus: "Moderate",
  pm25: 23.4,
  pm10: 45.1,
  uvIndex: 8,
  heatRiskLevel: "MODERATE TO HIGH",
  disasterModeActive: false,
  disasterType: null, // "HEATWAVE", "FLOOD", "AIR_SURGE"
  disasterAlertText: ""
};

export const initialActivityData = {
  stepsCurrent: 7842,
  stepsTarget: 10000,
  caloriesBurned: 485,
  activeMinutes: 42,
  distanceKm: 5.6,
  streakDays: 7,
  weeklySteps: [
    { day: "Mon", steps: 8400 },
    { day: "Tue", steps: 9100 },
    { day: "Wed", steps: 6500 },
    { day: "Thu", steps: 10200 },
    { day: "Fri", steps: 8900 },
    { day: "Sat", steps: 11400 },
    { day: "Sun", steps: 7842 }
  ]
};

export const initialSleepData = {
  sleepScore: 85,
  recoveryScore: 82,
  totalDuration: "7h 45m",
  deepSleep: "1h 52m",
  lightSleep: "4h 28m",
  remSleep: "1h 05m",
  awakeTime: "20m",
  sleepConsistency: "92%"
};

export const initialMedications = [
  { id: 1, name: "Multivitamin Complex", dose: "1 Tablet", time: "08:00 AM", taken: true, frequency: "Daily" },
  { id: 2, name: "Omega-3 Fish Oil", dose: "1000mg", time: "01:00 PM", taken: true, frequency: "Daily" },
  { id: 3, name: "Electrolyte Hydration Powder", dose: "1 Packet with 500ml water", time: "04:30 PM", taken: false, frequency: "As needed during heat" }
];

export const initialHydration = {
  targetMl: 2800,
  currentMl: 1850,
  smartReminderReason: "Ambient heat is 36.5°C with active thermal strain.",
  logHistory: [
    { time: "08:00 AM", amountMl: 400 },
    { time: "11:30 AM", amountMl: 500 },
    { time: "02:15 PM", amountMl: 450 },
    { time: "05:00 PM", amountMl: 500 }
  ]
};

export const initialDevices = [
  {
    id: "dev-1",
    name: "ASW-47 Ultra Smartwatch",
    type: "Smartwatch",
    status: "Connected",
    battery: 88,
    supportedMetrics: ["Heart Rate", "SpO2", "Temperature", "Steps", "Sleep", "Fall Sensor"],
    unsupportedMetrics: ["Blood Pressure", "Continuous Blood Glucose"]
  },
  {
    id: "dev-2",
    name: "PulseFit BLE Oximeter",
    type: "Medical Sensor",
    status: "Standby",
    battery: 94,
    supportedMetrics: ["SpO2", "Pulse Rate"],
    unsupportedMetrics: []
  },
  {
    id: "dev-3",
    name: "Smart Cuff BP-900",
    type: "Bluetooth BP Cuff",
    status: "Disconnected",
    battery: 65,
    supportedMetrics: ["Blood Pressure", "Heart Rate"],
    unsupportedMetrics: []
  }
];

export const initialClinics = [
  {
    id: 1,
    name: "St. Jude Community Health Center",
    type: "Hospital & Urgent Care",
    distance: "1.2 km",
    openStatus: "Open 24/7",
    specialty: "General Practice, Emergency Care",
    rating: 4.8,
    phone: "+1 (555) 888-9999",
    address: "742 Evergreen Terrace, Austin"
  },
  {
    id: 2,
    name: "Austin Central Cardiology Clinic",
    type: "Specialist Clinic",
    distance: "2.8 km",
    openStatus: "Open until 6:00 PM",
    specialty: "Cardiology, Vascular Health",
    rating: 4.9,
    phone: "+1 (555) 777-3333",
    address: "105 Medical Arts Blvd, Austin"
  },
  {
    id: 3,
    name: "ExpressCare Airway & Pulmonary Lab",
    type: "Respiratory Center",
    distance: "3.5 km",
    openStatus: "Open until 8:00 PM",
    specialty: "Pulmonology, Allergy Care",
    rating: 4.7,
    phone: "+1 (555) 444-2222",
    address: "410 Health Park Way, Austin"
  }
];

export const initialTimeline = [
  { id: "t1", time: "14:30 PM", title: "Heat Strain Warning Issued", category: "Alert", icon: "AlertTriangle", description: "AI detected elevated HR during high ambient outdoor heat (36.5°C)." },
  { id: "t2", time: "13:00 PM", title: "Medication Taken", category: "Medication", icon: "Pill", description: "Omega-3 Fish Oil 1000mg marked as taken." },
  { id: "t3", time: "08:15 AM", title: "Morning Vitals Synced", category: "Vitals", icon: "Activity", description: "HR 72 bpm, SpO2 98%, Temp 37.0°C successfully recorded." },
  { id: "t4", time: "07:30 AM", title: "Sleep Architecture Complete", category: "Sleep", icon: "Moon", description: "7h 45m sleep logged with 85/100 sleep quality score." }
];
