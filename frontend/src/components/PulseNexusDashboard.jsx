import React, { useState } from 'react';
import { Activity, Heart, BarChart3, Shield, Upload, AlertCircle, CheckCircle2, Clock, FileText, Video, Database, Loader2, Copy, User, Calendar, TrendingUp, Droplets, Wind, Thermometer, TrendingDown, AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Analytics Dashboard Component
const PatientDashboard = ({ analysisResult, patientData }) => {
  const vitalSignsData = [
    { time: '00:00', heartRate: 72, spo2: 98, temp: 36.8, respRate: 16 },
    { time: '02:00', heartRate: 68, spo2: 97, temp: 36.7, respRate: 15 },
    { time: '04:00', heartRate: 70, spo2: 92, temp: 36.9, respRate: 18 },
    { time: '06:00', heartRate: 75, spo2: 94, temp: 37.0, respRate: 17 },
    { time: '08:00', heartRate: 78, spo2: 96, temp: 36.9, respRate: 16 },
    { time: '10:00', heartRate: 82, spo2: 97, temp: 37.1, respRate: 15 },
  ];

  const activityData = [
    { hour: '0-4', steps: 120, active: 15 },
    { hour: '4-8', steps: 450, active: 45 },
    { hour: '8-12', steps: 890, active: 78 },
    { hour: '12-16', steps: 1200, active: 92 },
    { hour: '16-20', steps: 980, active: 85 },
    { hour: '20-24', steps: 340, active: 35 },
  ];

  const healthScores = [
    { category: 'Cardiovascular', score: 78 },
    { category: 'Respiratory', score: 72 },
    { category: 'Mobility', score: 85 },
    { category: 'Sleep', score: 68 },
    { category: 'Recovery', score: 75 },
  ];

  const alerts = [
    { time: '03:15 AM', message: 'SpO2 dropped to 92%', icon: Droplets, severity: 'medium' },
    { time: '04:30 AM', message: 'Heart rate variability decreased', icon: Heart, severity: 'low' },
    { time: '08:00 AM', message: 'Patient mobilized successfully', icon: CheckCircle2, severity: 'info' },
  ];

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 border-red-500';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500';
      case 'low': return 'bg-blue-500/10 border-blue-500';
      default: return 'bg-green-500/10 border-green-500';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Heart Rate</p>
              <p className="text-3xl font-bold">78 bpm</p>
              <p className="text-green-400 text-xs flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                Normal range
              </p>
            </div>
            <Heart className="w-10 h-10 text-blue-400 opacity-50" />
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border-l-4 border-cyan-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">SpO2 Level</p>
              <p className="text-3xl font-bold">96%</p>
              <p className="text-yellow-400 text-xs flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3 h-3" />
                Monitor closely
              </p>
            </div>
            <Droplets className="w-10 h-10 text-cyan-400 opacity-50" />
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Temperature</p>
              <p className="text-3xl font-bold">37.1°C</p>
              <p className="text-green-400 text-xs flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                Normal
              </p>
            </div>
            <Thermometer className="w-10 h-10 text-purple-400 opacity-50" />
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border-l-4 border-pink-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Resp. Rate</p>
              <p className="text-3xl font-bold">16 /min</p>
              <p className="text-green-400 text-xs flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                Stable
              </p>
            </div>
            <Wind className="w-10 h-10 text-pink-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            24-Hour Vital Signs Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vitalSignsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
              <Legend />
              <Line type="monotone" dataKey="heartRate" stroke="#3b82f6" strokeWidth={2} name="Heart Rate" />
              <Line type="monotone" dataKey="spo2" stroke="#06b6d4" strokeWidth={2} name="SpO2 %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Activity & Mobility
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hour" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="steps" fill="#10b981" name="Steps" />
              <Bar dataKey="active" fill="#8b5cf6" name="Active Minutes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Health Assessment & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 rounded-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            Comprehensive Health Assessment
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={healthScores}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="category" stroke="#94a3b8" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
              <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Recent Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div key={index} className={`p-3 rounded-lg border-2 ${getAlertColor(alert.severity)}`}>
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Agent Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-900/10 rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Data Analyst</h3>
              <p className="text-xs text-slate-400">Wearable Analytics</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>SpO2 anomaly at 03:15 AM</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>HRV decreased 15%</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 rounded-lg p-6 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Clinical Core</h3>
              <p className="text-xs text-slate-400">Guidelines</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>AHA protocol applied</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Monitor q2h recommended</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-900/10 rounded-lg p-6 border border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Bio Sentry</h3>
              <p className="text-xs text-slate-400">Risk Assessment</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span>No critical alerts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span>Infection risk: Low</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const PulseNexusDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [clinicalNote, setClinicalNote] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const patients = [
    { id: 305, name: 'Patient #305', status: 'Post-Op Day 3', age: 67, surgery: 'Cardiac Surgery' },
    { id: 412, name: 'Patient #412', status: 'Post-Op Day 1', age: 52, surgery: 'Hip Replacement' },
    { id: 523, name: 'Patient #523', status: 'Post-Op Day 5', age: 71, surgery: 'Thoracic Surgery' }
  ];

  const handleFileUpload = (file, type) => {
    if (type === 'csv') setCsvFile(file);
    else if (type === 'video') setVideoFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file, type);
  };

  const handleAnalyze = async () => {
    if (!clinicalNote || !csvFile) {
      alert('Please provide clinical note and upload wearable data CSV');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setShowDashboard(false);

    const agents = [
      { name: 'Data Analyst', duration: 2000 },
      { name: 'Clinical Core', duration: 2500 },
      { name: 'Bio Sentry', duration: 1500 }
    ];

    for (const agent of agents) {
      setCurrentAgent(agent.name);
      await new Promise(resolve => setTimeout(resolve, agent.duration));
    }

    const mockResult = {
      riskLevel: 'yellow',
      riskLabel: 'Watch Closely',
      reasoning: [
        'SpO2 levels dropped to 92% at 03:15 AM (normal range: 95-100%)',
        'Heart rate variability decreased by 15% from baseline',
        'Gait analysis shows slight imbalance in left leg (post-surgical side)',
        'AHA guidelines (2023) recommend close monitoring for SpO2 <94% in post-cardiac patients'
      ],
      handoverNote: `Patient #${selectedPatient.id} - Post-Op Day 3 Status Update

RISK ASSESSMENT: ⚠️ WATCH CLOSELY

KEY FINDINGS:
• SpO2 drop to 92% overnight (03:15 AM)
• Decreased heart rate variability (-15% from baseline)
• Gait asymmetry noted on surgical side

RECOMMENDATIONS:
1. Increase vital signs monitoring to q2h
2. Consider supplemental O2 if SpO2 remains <94%
3. Physical therapy evaluation for gait
4. Continue current medication regimen

GUIDELINE: AHA Post-Cardiac Surgery Protocol (2023)
Generated: ${new Date().toLocaleString()}`
    };

    setAnalysisResult(mockResult);
    setCurrentAgent(null);
    setIsAnalyzing(false);
    setShowDashboard(true);
  };

  const copyToClipboard = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(analysisResult.handoverNote);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'green': return <CheckCircle2 className="w-8 h-8" />;
      case 'yellow': case 'red': return <AlertCircle className="w-8 h-8" />;
      default: return <Clock className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-10 h-10 text-blue-400" />
            <div>
              <h1 className="text-4xl font-bold">Pulse Nexus</h1>
              <p className="text-slate-400">AI-Powered Clinical Decision Support</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="text-slate-400">Connected to Backend</p>
            <p className="text-green-400 flex items-center gap-2 justify-end">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              localhost:8000
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {!showDashboard && (
          <>
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Select Patient Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {patients.map(patient => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPatient?.id === patient.id
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                        {patient.id}
                      </div>
                      <div>
                        <h3 className="font-semibold">{patient.name}</h3>
                        <p className="text-xs text-slate-400">{patient.status}</p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <p>Age: {patient.age} years</p>
                      <p>Procedure: {patient.surgery}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Input Zone - Clinical Status
              </h2>
              <textarea
                value={clinicalNote}
                onChange={(e) => setClinicalNote(e.target.value)}
                placeholder="Enter patient's current status... (e.g., 'Patient reports feeling dizzy upon standing, mild shortness of breath')"
                className="w-full h-32 bg-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Wearable Data Upload
                </h2>
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'csv')}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                    csvFile ? 'border-green-500 bg-green-500/10' : 'border-slate-600 hover:border-blue-500'
                  }`}
                  onClick={() => document.getElementById('csv-input').click()}
                >
                  <input
                    id="csv-input"
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileUpload(e.target.files[0], 'csv')}
                    className="hidden"
                  />
                  {csvFile ? (
                    <div className="space-y-2">
                      <CheckCircle2 className="w-12 h-12 mx-auto text-green-400" />
                      <p className="font-semibold text-green-400">{csvFile.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 mx-auto text-slate-400" />
                      <p className="font-semibold">Drop CSV file here</p>
                      <p className="text-xs text-slate-400">or click to browse</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Gait Video (Optional)
                </h2>
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'video')}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                    videoFile ? 'border-green-500 bg-green-500/10' : 'border-slate-600 hover:border-blue-500'
                  }`}
                  onClick={() => document.getElementById('video-input').click()}
                >
                  <input
                    id="video-input"
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e.target.files[0], 'video')}
                    className="hidden"
                  />
                  {videoFile ? (
                    <div className="space-y-2">
                      <CheckCircle2 className="w-12 h-12 mx-auto text-green-400" />
                      <p className="font-semibold text-green-400">{videoFile.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 mx-auto text-slate-400" />
                      <p className="font-semibold">Drop video file here</p>
                      <p className="text-xs text-slate-400">or click to browse</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !selectedPatient || !clinicalNote || !csvFile}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed px-12 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-3"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Activity className="w-6 h-6" />
                    Analyze Patient
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {isAnalyzing && currentAgent && (
          <div className="bg-slate-800/70 rounded-lg p-6 border-2 border-blue-500">
            <div className="flex items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              <div>
                <p className="font-semibold text-lg">{currentAgent} is working...</p>
                <p className="text-sm text-slate-400">
                  {currentAgent === 'Data Analyst' && 'Scanning vital signs and wearable data'}
                  {currentAgent === 'Clinical Core' && 'Analyzing clinical guidelines and protocols'}
                  {currentAgent === 'Bio Sentry' && 'Checking biosecurity alerts and risk factors'}
                </p>
              </div>
            </div>
          </div>
        )}

        {showDashboard && analysisResult && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className={`${getRiskColor(analysisResult.riskLevel)} rounded-lg px-6 py-3 flex items-center gap-3`}>
                {getRiskIcon(analysisResult.riskLevel)}
                <div>
                  <p className="text-2xl font-bold">{analysisResult.riskLabel}</p>
                  <p className="text-sm opacity-90">{selectedPatient.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDashboard(false)}
                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
              >
                New Analysis
              </button>
            </div>

            <PatientDashboard analysisResult={analysisResult} patientData={selectedPatient} />

            <div className="bg-slate-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Clinical Handover Note
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  {isCopied ? <><CheckCircle2 className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy</>}
                </button>
              </div>
              <pre className="bg-slate-900 rounded-lg p-4 text-sm text-slate-300 whitespace-pre-wrap font-mono">
                {analysisResult.handoverNote}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PulseNexusDashboard;