import { useState, useEffect, useMemo, useRef } from 'react';
import { io } from 'socket.io-client';
import { Stethoscope, UserPlus, Filter, Bell, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import PatientRow from '../components/PatientRow';
import ProxyDataEntryModal from '../components/ProxyDataEntryModal';
import { useAppState } from '../context/AppStateContext';
import { getRiskMeta } from '../shared/riskLabels';
import styles from './TriageDashboard.module.css';

const DEFAULT_DEMO_PATIENTS = [
  {
    id: '1',
    user_id: '4',
    name: 'Amina Wanjiru',
    week: 'Week 32',
    status: 'high',
    riskLevel: 'high',
    symptoms: ['severe_headache', 'blurred_vision'],
    triage_notes: 'Severe headache with blurred vision reported via PWA.',
    phone: '+254700000001',
    source: 'pwa',
  },
  {
    id: '2',
    user_id: '5',
    name: 'Beatrice Atieno',
    week: 'Week 24',
    status: 'medium',
    riskLevel: 'medium',
    symptoms: ['swollen_feet', 'mild_headache'],
    triage_notes: 'Swelling in ankles and slight fatigue.',
    phone: '+254700000002',
    source: 'pwa',
  },
  {
    id: '3',
    user_id: '6',
    name: 'Faith Cherono',
    week: 'Postpartum (Day 14)',
    status: 'routine',
    riskLevel: 'low',
    symptoms: ['routine_check'],
    triage_notes: 'Home visit: Baby latching well, mother recovering well.',
    phone: '+254700000004',
    source: 'chw_proxy',
    isProxy: true,
  },
  {
    id: '4',
    user_id: '7',
    name: 'Grace Nyambura',
    week: 'Week 16',
    status: 'routine',
    riskLevel: 'low',
    symptoms: ['routine_check'],
    triage_notes: 'Regular check-in, fetal heart sound normal.',
    phone: '+254700000005',
    source: 'pwa',
  },
];

export default function TriageDashboard() {
  const { user, language } = useAppState();
  const [patients, setPatients] = useState(DEFAULT_DEMO_PATIENTS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showProxyModal, setShowProxyModal] = useState(false);
  const [newAlertPatientId, setNewAlertPatientId] = useState(null);
  const [liveBanner, setLiveBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const socketRef = useRef(null);

  // 1. Fetch live queue from backend
  const fetchQueue = async () => {
    setLoading(true);
    try {
      const token = user?.token;
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/chw/triage', { headers });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPatients(data);
        }
      }
    } catch (err) {
      console.warn('Using local demo patients queue:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, [user]);

  // 2. Real-Time Socket.IO connection for live alert arrival
  useEffect(() => {
    // Connect to WebSocket server via proxy or origin
    const socket = io('/', {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      query: { chw_id: user?.id || '1' },
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('CHW Dashboard connected to WebSocket');
      socket.emit('join_dashboard', { chw_id: user?.id || '1' });
    });

    const handleIncomingAlert = (payload) => {
      console.log('Incoming real-time alert received:', payload);
      const isHigh =
        payload.risk_level === 'red' ||
        payload.risk_level === 'high' ||
        payload.risk_level === 'High Risk';

      // Visual announcement banner
      const alertTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLiveBanner({
        patient_name: payload.patient_name || 'Amina Wanjiru',
        risk_level: isHigh ? 'High Risk' : 'Update',
        symptoms: payload.symptoms || ['Emergency SOS Activated'],
        time: alertTime,
      });

      // Highlight this patient row
      const targetId = String(payload.patient_id || '1');
      setNewAlertPatientId(targetId);

      // Update patient list and float to top if high risk
      setPatients((prev) => {
        const existingIndex = prev.findIndex((p) => String(p.id) === targetId || String(p.user_id) === targetId);
        const updatedItem = {
          id: targetId,
          name: payload.patient_name || (existingIndex >= 0 ? prev[existingIndex].name : 'Amina Wanjiru'),
          week: existingIndex >= 0 ? prev[existingIndex].week : 'Week 32',
          status: isHigh ? 'high' : 'medium',
          riskLevel: isHigh ? 'high' : 'medium',
          symptoms: payload.symptoms || ['Emergency Alert'],
          triage_notes: payload.message || 'Danger sign reported via PWA Web App',
          phone: existingIndex >= 0 ? prev[existingIndex].phone : '+254700000001',
          source: payload.source || 'pwa',
        };

        if (existingIndex >= 0) {
          const clone = [...prev];
          clone.splice(existingIndex, 1);
          return [updatedItem, ...clone];
        }
        return [updatedItem, ...prev];
      });

      // Clear the restrained highlight after 7 seconds
      setTimeout(() => {
        setNewAlertPatientId(null);
      }, 7000);
    };

    socket.on('notify_chw_dashboard', handleIncomingAlert);
    socket.on('new_alert', handleIncomingAlert);
    socket.on('patient_update', handleIncomingAlert);

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // 3. Sorting logic: Recognition Over Recall (High Risk -> Medium Risk -> Routine)
  const sortedAndFilteredPatients = useMemo(() => {
    const list = [...patients];

    list.sort((a, b) => {
      const metaA = getRiskMeta(a.riskLevel || a.status || a.risk_level);
      const metaB = getRiskMeta(b.riskLevel || b.status || b.risk_level);
      return metaA.priority - metaB.priority;
    });

    if (activeFilter === 'All') return list;
    if (activeFilter === 'High') {
      return list.filter((p) => getRiskMeta(p.riskLevel || p.status).key === 'high');
    }
    if (activeFilter === 'Medium') {
      return list.filter((p) => getRiskMeta(p.riskLevel || p.status).key === 'medium');
    }
    if (activeFilter === 'Routine') {
      return list.filter((p) => getRiskMeta(p.riskLevel || p.status).key === 'routine');
    }
    return list;
  }, [patients, activeFilter]);

  // Stats calculation
  const highRiskCount = patients.filter((p) => getRiskMeta(p.riskLevel || p.status).key === 'high').length;
  const mediumRiskCount = patients.filter((p) => getRiskMeta(p.riskLevel || p.status).key === 'medium').length;
  const routineCount = patients.filter((p) => getRiskMeta(p.riskLevel || p.status).key === 'routine').length;

  return (
    <main className={styles.main}>
      {/* Real-time Alert Arrival Banner (Restrained announcement) */}
      {liveBanner && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            border: '2px solid #DC2626',
            borderRadius: 12,
            padding: '12px 18px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            boxShadow: '0 4px 14px rgba(220, 38, 38, 0.15)',
            animation: 'fadeIn 0.3s ease',
          }}
          role="alert"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#DC2626',
                animation: 'pulseSync 1s infinite',
              }}
            />
            <div>
              <strong style={{ color: '#991B1B', fontSize: '0.95rem' }}>
                🚨 {language === 'sw' ? 'TAARIFA MPYA YA HATARI (Live Alert):' : 'NEW HIGH RISK ALERT (Live):'}{' '}
                {liveBanner.patient_name}
              </strong>
              <span style={{ display: 'block', fontSize: '0.82rem', color: '#7F1D1D' }}>
                {Array.isArray(liveBanner.symptoms) ? liveBanner.symptoms.join(', ') : liveBanner.symptoms} • {liveBanner.time}
              </span>
            </div>
          </div>

          <button
            onClick={() => setLiveBanner(null)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            {language === 'sw' ? 'Nimeona' : 'Acknowledge'}
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 className={`headline-lg ${styles.pageTitle}`}>
              {language === 'sw' ? 'Dashibodi ya Triage ya CHW' : 'CHW Triage Queue'}
            </h2>
            <button
              onClick={fetchQueue}
              disabled={loading}
              title="Refresh queue"
              style={{ color: '#64748B', padding: 4 }}
            >
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
            </button>
          </div>
          <p className={`body-md ${styles.pageSubtitle}`}>
            {language === 'sw'
              ? 'Foleni iliyopewa kipaumbele kulingana na alama za hatari kutoka jamii.'
              : 'Prioritized clinical triage queue sorted by urgency (Recognition over recall).'}
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            className={styles.btnNewPatient}
            onClick={() => setShowProxyModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'var(--color-primary, #0D9488)',
              color: '#FFFFFF',
              padding: '10px 18px',
              borderRadius: 10,
              fontWeight: 600,
            }}
          >
            <Stethoscope size={18} />
            {language === 'sw' ? 'Rekodi Dalili (Proxy Entry)' : 'Proxy Data Entry'}
          </button>
        </div>
      </div>

      {/* Recognition-over-recall Stat Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 14,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 12,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertTriangle size={24} color="#DC2626" />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#991B1B' }}>
              {language === 'sw' ? 'Hatari Kubwa' : 'High Risk'}
            </span>
            <strong style={{ display: 'block', fontSize: '1.7rem', color: '#7F1D1D', lineHeight: 1.1 }}>
              {highRiskCount}
            </strong>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 12,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 20 }}>⚠️</span>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#92400E' }}>
              {language === 'sw' ? 'Hatari ya Wastani' : 'Medium Risk'}
            </span>
            <strong style={{ display: 'block', fontSize: '1.7rem', color: '#78350F', lineHeight: 1.1 }}>
              {mediumRiskCount}
            </strong>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: 12,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: '#DCFCE7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={24} color="#16A34A" />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#166534' }}>
              {language === 'sw' ? 'Kawaida (Salama)' : 'Routine'}
            </span>
            <strong style={{ display: 'block', fontSize: '1.7rem', color: '#14532D', lineHeight: 1.1 }}>
              {routineCount}
            </strong>
          </div>
        </div>
      </div>

      {/* Filter Chips & Active Queue */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Filter size={15} />
              {language === 'sw' ? 'Chuja:' : 'Filter:'}
            </span>
            {['All', 'High', 'Medium', 'Routine'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 9999,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: activeFilter === f ? 'var(--color-primary, #0D9488)' : '#F1F5F9',
                  color: activeFilter === f ? '#FFFFFF' : '#475569',
                  border: '1px solid',
                  borderColor: activeFilter === f ? 'var(--color-primary, #0D9488)' : '#CBD5E1',
                }}
              >
                {f === 'All' ? (language === 'sw' ? 'Wote' : 'All') : f}
              </button>
            ))}
          </div>

          <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
            {sortedAndFilteredPatients.length} {language === 'sw' ? 'wamama kwenye foleni' : 'mothers in queue'}
          </span>
        </div>

        {/* Scannable Patient Rows */}
        <div className={styles.patientList}>
          {sortedAndFilteredPatients.map((patient) => (
            <PatientRow
              key={patient.id || patient.user_id}
              patient={patient}
              isNewAlert={String(patient.id) === String(newAlertPatientId) || String(patient.user_id) === String(newAlertPatientId)}
            />
          ))}
        </div>
      </section>

      {/* Proxy Data Entry Modal */}
      <ProxyDataEntryModal
        isOpen={showProxyModal}
        onClose={() => setShowProxyModal(false)}
        patients={patients}
        onSaved={fetchQueue}
      />
    </main>
  );
}
