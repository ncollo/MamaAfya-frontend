import { useState } from 'react';
import { Heart, Calendar, PhoneCall, AlertTriangle, ShieldCheck, CheckCircle, Info } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function PartnerPortal() {
  const { user, language } = useAppState();

  const partnerName = user?.full_name || 'John Wanjiru';
  const motherName = 'Amina Wanjiru';

  return (
    <div style={{ padding: '20px', maxWidth: 640, margin: '0 auto', backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span
            style={{
              backgroundColor: '#334155',
              color: '#FFFFFF',
              padding: '3px 8px',
              borderRadius: 6,
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            DOOR 4: PARTNER COMPANION
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Read-Only Portal</span>
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>
          {language === 'sw' ? `Habari, ${partnerName}` : `Welcome, ${partnerName}`}
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#475569' }}>
          {language === 'sw'
            ? `Taarifa za afya na miadi ya kliniki kwa ${motherName}.`
            : `Companion health summary & clinic dates for ${motherName}.`}
        </p>
      </div>

      {/* Emergency Alert Banner if Active */}
      <div
        style={{
          backgroundColor: '#FEF2F2',
          border: '2px solid #DC2626',
          borderRadius: 14,
          padding: '16px',
          marginBottom: 20,
          boxShadow: '0 8px 20px rgba(220, 38, 38, 0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <AlertTriangle size={24} color="#DC2626" />
          <strong style={{ color: '#991B1B', fontSize: '1rem' }}>
            {language === 'sw' ? 'Tahadhari ya Afya ya Dharura' : 'Urgent Health Notification'}
          </strong>
        </div>
        <p style={{ margin: 0, fontSize: '0.88rem', color: '#7F1D1D', lineHeight: 1.45 }}>
          {language === 'sw'
            ? `${motherName} ameripoti maumivu makali ya kichwa na giza machoni. Mhudumu wa Afya Jane Mutua amearifiwa. Tafadhali msaidie kupumzika upande wa kushoto na uwe tayari kwa safari ya hospitali.`
            : `${motherName} reported severe headache and blurred vision. CHW Jane Mutua has been alerted. Please ensure she rests on her left side and be ready for facility transfer if needed.`}
        </p>

        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          <a
            href="tel:+254711000001"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 8,
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <PhoneCall size={14} />
            {language === 'sw' ? 'Piga Simu kwa CHW (Jane)' : 'Call CHW (Jane Mutua)'}
          </a>

          <a
            href="tel:+254722998877"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 8,
              backgroundColor: '#FFFFFF',
              border: '1px solid #DC2626',
              color: '#DC2626',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <PhoneCall size={14} />
            {language === 'sw' ? 'Dereva wa Dharura (Ouma)' : 'Call Emergency Driver (Ouma)'}
          </a>
        </div>
      </div>

      {/* Pregnancy / Stage Progress Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          border: '1px solid #E2E8F0',
          padding: '20px',
          marginBottom: 18,
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase' }}>
            {language === 'sw' ? 'Hatua ya Ujauzito' : 'Pregnancy Stage'}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Week 32 of 40</span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', margin: '0 0 6px' }}>
          {language === 'sw' ? 'Ukuaji wa Mtoto (Trimester ya 3)' : 'Baby Growth (3rd Trimester)'}
        </h3>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.45 }}>
          {language === 'sw'
            ? 'Mtoto ana uzito wa takriban kilo 1.7 na anafungua macho. Wiki 8 zimebaki kuelekea siku ya uzazi.'
            : 'Baby weighs approximately 1.7kg and is practicing breathing movements. Approximately 8 weeks to due date.'}
        </p>
      </div>

      {/* Upcoming Clinic Appointment */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          border: '1px solid #E2E8F0',
          padding: '20px',
          marginBottom: 18,
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Calendar size={20} color="#0D9488" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            {language === 'sw' ? 'Miadi ya Kliniki Inayofuata' : 'Next Clinic Appointment'}
          </h3>
        </div>

        <div style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: '12px 14px', border: '1px solid #EEF2F6' }}>
          <strong style={{ fontSize: '0.95rem', color: '#0F172A', display: 'block' }}>
            ANC Visit 4 (Ultrasound & BP Check)
          </strong>
          <span style={{ fontSize: '0.85rem', color: '#475569', display: 'block', margin: '2px 0 6px' }}>
            Alhamisi, 9:00 AM • Mathare Sub-County Hospital
          </span>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#0D9488', fontWeight: 600 }}>
            💡 {language === 'sw' ? 'Kidokezo: Msindikize ili kupokea maelekezo ya daktari pamoja.' : 'Companion Tip: Attend with her to hear ultrasound results and birth plan review.'}
          </p>
        </div>
      </div>

      {/* Guidance Nudges for Companions */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          border: '1px solid #E2E8F0',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <ShieldCheck size={20} color="#0D9488" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            {language === 'sw' ? 'Mambo ya Kufanya Wiki Hii' : 'Companion Checklist This Week'}
          </h3>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            {
              en: 'Ensure clean drinking water and daily IFAS iron supplements are taken.',
              sw: 'Hakikisha mama anameza vidonge vyake vya madini ya chuma (IFAS) kila siku.',
            },
            {
              en: 'Keep taxi driver Ouma (+254722998877) saved on speed-dial for delivery ride.',
              sw: 'Weka namba ya dereva wa dharura Ouma kwenye simu yako kwa usafiri wa haraka.',
            },
            {
              en: 'Confirm maternity hospital bag items (baby clothes, basin, maternity pads) are packed.',
              sw: 'Kagua kwamba begi la hospitali lina vitu vyote muhimu (beseni, nguo safi za mtoto, pedi).',
            },
          ].map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontSize: '0.85rem',
                color: '#334155',
                lineHeight: 1.45,
              }}
            >
              <CheckCircle size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{language === 'sw' ? item.sw : item.en}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
