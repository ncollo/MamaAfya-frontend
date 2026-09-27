import { useState, useEffect } from 'react';
import { Search, Printer, AlertTriangle, ShieldCheck, Heart, Phone, FileText, UserCheck, CheckCircle } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

const DEMO_PATIENTS = [
  {
    id: 1,
    name: 'Amina Wanjiru',
    phone: '+254700000001',
    week: 'Week 32',
    blood_type: 'O+',
    allergies: 'Penicillin',
    chw: 'Jane Mutua (+254711000001)',
    companion: 'John Wanjiru (+254700000003)',
    transport: 'Emergency Taxi (Driver Ouma: +254722998877)',
    preferred_facility: 'Mathare Sub-County Hospital',
    delivery_mode: 'Spontaneous Vaginal Delivery (SVD)',
    special_requests: 'Partner presence in delivery room, delayed cord clamping, immediate skin-to-skin contact.',
    items_ready: ['Basin', 'Cotton Wool', 'Baby Clothes', 'Maternity Pads'],
    symptoms_history: [
      {
        time: 'Today, 25 mins ago',
        symptoms: ['severe_headache', 'blurred_vision'],
        risk: 'red',
        source: 'PWA Web App',
        note: 'Mother reported severe throbbing headache and blurred vision.',
      },
      {
        time: '3 days ago',
        symptoms: ['mild_headache'],
        risk: 'yellow',
        source: 'MamaBot AI',
        note: 'Reported mild headache after walking to market. Advised hydration.',
      },
      {
        time: '2 weeks ago',
        symptoms: ['routine_check'],
        risk: 'green',
        source: 'CHW Home Visit (Jane Mutua)',
        note: 'Routine home visit: Fetal heart rate regular, BP 118/76.',
      },
    ],
  },
  {
    id: 2,
    name: 'Beatrice Atieno',
    phone: '+254700000002',
    week: 'Week 24',
    blood_type: 'A+',
    allergies: 'None reported',
    chw: 'Jane Mutua (+254711000001)',
    companion: 'Mary Atieno (Mother: +254700000099)',
    transport: 'Boda Boda Voucher',
    preferred_facility: 'Pumwani Maternity Hospital',
    delivery_mode: 'SVD',
    special_requests: 'Female midwife preference.',
    items_ready: ['Baby Clothes', 'Warm Shawls'],
    symptoms_history: [
      {
        time: 'Yesterday',
        symptoms: ['swollen_feet'],
        risk: 'yellow',
        source: 'PWA Web App',
        note: 'Mild swelling in ankles. Urinalysis scheduled.',
      },
    ],
  },
];

export default function FacilityPortal() {
  const { user, language } = useAppState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(DEMO_PATIENTS[0]);

  const filteredPatients = DEMO_PATIENTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  return (
    <div style={{ padding: '24px', maxWidth: 1100, margin: '0 auto', backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      {/* Top Clinical Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #E2E8F0',
          paddingBottom: 16,
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                backgroundColor: '#0D9488',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              DOOR 3: FACILITY PORTAL
            </span>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Mathare Sub-County Hospital • Maternity Admissions
            </span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>
            Clinical Admission & Birth Plan Pull-up
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            <Printer size={16} />
            Print Admission Summary
          </button>
        </div>
      </div>

      {/* Patient Search Bar & Quick Selectors */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <Search size={18} color="#64748B" style={{ position: 'absolute', left: 12, top: 12 }} />
          <input
            type="text"
            placeholder="Search arriving mother by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 38px',
              borderRadius: 8,
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              fontSize: '0.9rem',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {filteredPatients.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPatient(p)}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: selectedPatient.id === p.id ? '#0D9488' : '#FFFFFF',
                color: selectedPatient.id === p.id ? '#FFFFFF' : '#334155',
                border: '1px solid',
                borderColor: selectedPatient.id === p.id ? '#0D9488' : '#CBD5E1',
                fontSize: '0.85rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {p.name} ({p.week})
            </button>
          ))}
        </div>
      </div>

      {/* Clinical Admission Intake Sheet (Fast Scanning) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          padding: '24px',
        }}
      >
        {/* Critical Patient Banner (Color coded, instant recognition) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            padding: '16px 20px',
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Patient Name & Contact
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '2px 0 4px' }}>
              {selectedPatient.name}
            </h2>
            <span style={{ fontSize: '0.9rem', color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Phone size={14} /> {selectedPatient.phone} • {selectedPatient.week}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Blood Type Badge */}
            <div
              style={{
                textAlign: 'center',
                backgroundColor: '#EFF6FF',
                border: '2px solid #3B82F6',
                borderRadius: 8,
                padding: '6px 14px',
              }}
            >
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1E40AF', display: 'block' }}>BLOOD GROUP</span>
              <strong style={{ fontSize: '1.4rem', color: '#1E3A8A', lineHeight: 1 }}>{selectedPatient.blood_type}</strong>
            </div>

            {/* Allergies Pill */}
            <div
              style={{
                textAlign: 'center',
                backgroundColor: selectedPatient.allergies !== 'None reported' ? '#FEF2F2' : '#F0FDF4',
                border: '2px solid',
                borderColor: selectedPatient.allergies !== 'None reported' ? '#EF4444' : '#22C55E',
                borderRadius: 8,
                padding: '6px 14px',
              }}
            >
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#991B1B', display: 'block' }}>ALLERGIES</span>
              <strong
                style={{
                  fontSize: '1rem',
                  color: selectedPatient.allergies !== 'None reported' ? '#991B1B' : '#166534',
                  lineHeight: 1.4,
                }}
              >
                {selectedPatient.allergies}
              </strong>
            </div>
          </div>
        </div>

        {/* 2-Column Clinical Details Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 28 }}>
          {/* Column A: Digital Birth Plan */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <FileText size={20} color="#0D9488" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Digital Birth Plan & Support
              </h3>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: '14px 16px', border: '1px solid #E2E8F0' }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>BIRTH COMPANION:</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E293B', margin: '2px 0 0' }}>
                  {selectedPatient.companion}
                </p>
              </div>

              <div style={{ marginBottom: 10 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>ASSIGNED COMMUNITY HEALTH WORKER:</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E293B', margin: '2px 0 0' }}>
                  {selectedPatient.chw}
                </p>
              </div>

              <div style={{ marginBottom: 10 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>EMERGENCY TRANSPORT PLAN:</span>
                <p style={{ fontSize: '0.9rem', color: '#1E293B', margin: '2px 0 0' }}>
                  {selectedPatient.transport}
                </p>
              </div>

              <div style={{ marginBottom: 10 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>DELIVERY PREFERENCE & REQUESTS:</span>
                <p style={{ fontSize: '0.88rem', color: '#0F172A', margin: '2px 0 0', lineHeight: 1.4 }}>
                  <strong>{selectedPatient.delivery_mode}</strong> — {selectedPatient.special_requests}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>MATERNITY ITEMS PREPARED:</span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                  {selectedPatient.items_ready.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: '#DCFCE7',
                        color: '#166534',
                        padding: '2px 8px',
                        borderRadius: 4,
                      }}
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column B: Symptom & Triage History */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <AlertTriangle size={20} color="#DC2626" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Symptom History & Triage Log
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {selectedPatient.symptoms_history.map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: log.risk === 'red' ? '#FFF5F5' : log.risk === 'yellow' ? '#FFFDF5' : '#F8FAFC',
                    border: '1px solid',
                    borderColor: log.risk === 'red' ? '#FECACA' : log.risk === 'yellow' ? '#FDE68A' : '#E2E8F0',
                    borderLeft: `5px solid ${log.risk === 'red' ? '#DC2626' : log.risk === 'yellow' ? '#D97706' : '#16A34A'}`,
                    borderRadius: 8,
                    padding: '12px 14px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: log.risk === 'red' ? '#991B1B' : '#475569' }}>
                      {log.time}
                    </span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: 4,
                        backgroundColor: '#E2E8F0',
                        color: '#334155',
                      }}
                    >
                      {log.source}
                    </span>
                  </div>

                  <strong style={{ fontSize: '0.85rem', color: '#0F172A', display: 'block' }}>
                    {log.symptoms.join(', ')}
                  </strong>
                  <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#475569', fontStyle: 'italic' }}>
                    "{log.note}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Clinical Admissions Actions */}
        <div
          style={{
            borderTop: '1px solid #E2E8F0',
            paddingTop: 16,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 12,
          }}
        >
          <button
            onClick={() => alert(`Admitted ${selectedPatient.name} to Maternity Labor Ward 2.`)}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              backgroundColor: '#0D9488',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <CheckCircle size={18} />
            Confirm Hospital Admission
          </button>
        </div>
      </div>
    </div>
  );
}
