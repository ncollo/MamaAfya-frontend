import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, HeartHandshake, Truck, ShieldAlert, Package, ArrowLeft, Save } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

export default function BirthPlan() {
  const navigate = useNavigate();
  const { user, phase, language, setSyncStatus } = useAppState();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    preferred_facility: 'Mathare Sub-County Hospital',
    birth_companion_name: 'John Wanjiru',
    birth_companion_phone: '+254700000003',
    transport_plan: 'Emergency Taxi / Boda Boda (Driver Ouma: +254722998877)',
    emergency_contact_name: 'John Wanjiru',
    emergency_contact_phone: '+254700000003',
    preferred_delivery_method: 'Spontaneous Vaginal Delivery (SVD)',
    special_requests: 'Partner presence in labor room, immediate skin-to-skin contact, delayed cord clamping.',
    items_prepared: {
      basin: true,
      cotton_wool: true,
      baby_clothes: true,
      maternity_pads: true,
      warm_blanket: false,
    },
  });

  // Calculate completion percentage
  const checklistItems = Object.values(form.items_prepared);
  const checkedCount = checklistItems.filter(Boolean).length;
  const basicFields = [
    form.preferred_facility,
    form.birth_companion_name,
    form.birth_companion_phone,
    form.transport_plan,
  ];
  const filledBasic = basicFields.filter((f) => f && f.trim().length > 0).length;
  const progressPercent = Math.round(((filledBasic + checkedCount) / (basicFields.length + checklistItems.length)) * 100);

  useEffect(() => {
    async function loadPlan() {
      if (user?.token) {
        try {
          const res = await fetch('/api/birth-plans/me', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setForm({
              preferred_facility: data.preferred_facility || '',
              birth_companion_name: data.birth_companion_name || '',
              birth_companion_phone: data.birth_companion_phone || '',
              transport_plan: data.transport_plan || '',
              emergency_contact_name: data.emergency_contact_name || '',
              emergency_contact_phone: data.emergency_contact_phone || '',
              preferred_delivery_method: data.preferred_delivery_method || '',
              special_requests: data.special_requests || '',
              items_prepared: data.items_prepared || form.items_prepared,
            });
          }
        } catch (err) {
          console.warn('Using local birth plan state:', err);
        }
      }
      setLoading(false);
    }
    loadPlan();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSyncStatus('pending');

    try {
      if (user?.token) {
        await fetch('/api/birth-plans/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(form),
        });
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err) {
      console.warn('Saved offline:', err);
    } finally {
      setSaving(false);
      setSyncStatus('synced');
    }
  };

  const toggleChecklist = (key) => {
    setForm((prev) => ({
      ...prev,
      items_prepared: {
        ...prev.items_prepared,
        [key]: !prev.items_prepared[key],
      },
    }));
  };

  // Phase Gating: If postpartum, display summary banner
  if (phase === 'postpartum') {
    return (
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '16px' }}>
        <Button variant="outline" size="sm" icon={<ArrowLeft size={16} />} onClick={() => navigate('/home')}>
          {language === 'sw' ? 'Rudi Nyumbani' : 'Back to Dashboard'}
        </Button>
        <Card style={{ marginTop: '20px', textAlign: 'center', padding: '30px 20px' }}>
          <CheckCircle size={52} color="#16A34A" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '8px' }}>
            {language === 'sw' ? 'Mpango wa Uzazi Umekamilika' : 'Birth Plan Completed'}
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.5 }}>
            {language === 'sw'
              ? 'Hongera Mama! Umejifungua salama na sasa uko katika awamu ya huduma ya baada ya kujifungua (Postpartum). Unaweza kupata muhtasari wa afya ya mtoto kwenye dashibodi yako.'
              : 'Congratulations Mama! You have welcomed your baby and are now in the postpartum recovery phase. You can track baby immunizations and your recovery on the dashboard.'}
          </p>
          <Button style={{ marginTop: '16px' }} onClick={() => navigate('/home')}>
            {language === 'sw' ? 'Fungua Dashibodi ya Mtoto' : 'Open Postpartum Dashboard'}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: '16px 16px 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button variant="outline" size="sm" icon={<ArrowLeft size={16} />} onClick={() => navigate('/home')}>
          {language === 'sw' ? 'Rudi' : 'Back'}
        </Button>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>
          {language === 'sw' ? 'Mimba Inayoendelea' : 'Antenatal Phase'}
        </span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', margin: '0 0 6px' }}>
          {language === 'sw' ? 'Mpango Wangu wa Uzazi' : 'My Digital Birth Plan'}
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
          {language === 'sw'
            ? 'Mpango huu unamsaidia Mhudumu wako wa Afya (CHW) na madaktari kujiandaa mapema kabla ya siku ya kujifungua.'
            : 'Shared with your CHW and clinic staff so they are ready before delivery day.'}
        </p>
      </div>

      {/* Progress Bar */}
      <Card style={{ backgroundColor: '#F8FAFC' }}>
        <ProgressBar
          value={progressPercent}
          max={100}
          label={language === 'sw' ? 'Maendeleo ya Mpango' : 'Plan Readiness'}
          height={10}
        />
        <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
          {progressPercent >= 80
            ? (language === 'sw' ? '✅ Umejiandaa vizuri kwa ajili ya uzazi!' : '✅ Great job! You are well prepared for delivery.')
            : (language === 'sw' ? 'Kamilisha maelezo yote hapa chini.' : 'Fill out remaining details below.')}
        </p>
      </Card>

      {savedSuccess && (
        <div
          style={{
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#166534',
            padding: '12px 16px',
            borderRadius: 10,
            marginBottom: 16,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <CheckCircle size={18} />
          {language === 'sw'
            ? 'Mpango wako wa uzazi umehifadhiwa na kusasishwa kwa CHW wako!'
            : 'Birth plan saved successfully and synced with your CHW!'}
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* 1. Health Facility */}
        <Card
          title={language === 'sw' ? '1. Kituo cha Afya Unachopendelea' : '1. Preferred Delivery Facility'}
          headerAction={<HeartHandshake size={20} color="var(--color-primary)" />}
        >
          <label style={{ display: 'block', marginBottom: 12 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
              {language === 'sw' ? 'Jina la Hospitali / Zahanati' : 'Facility Name'}
            </span>
            <input
              type="text"
              value={form.preferred_facility}
              onChange={(e) => setForm({ ...form, preferred_facility: e.target.value })}
              placeholder="e.g. Mathare Sub-County Hospital"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #CBD5E1',
                fontSize: '0.95rem',
              }}
              required
            />
          </label>
        </Card>

        {/* 2. Birth Companion & Support */}
        <Card
          title={language === 'sw' ? '2. Mwandamizi wa Uzazi' : '2. Birth Companion'}
          subtitle={language === 'sw' ? 'Mtu atakayekusindikiza hospitalini' : 'Person who will accompany you to labor'}
          headerAction={<HeartHandshake size={20} color="var(--color-primary)" />}
        >
          <label style={{ display: 'block', marginBottom: 12 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
              {language === 'sw' ? 'Jina Kamili' : 'Companion Full Name'}
            </span>
            <input
              type="text"
              value={form.birth_companion_name}
              onChange={(e) => setForm({ ...form, birth_companion_name: e.target.value })}
              placeholder="John Wanjiru"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #CBD5E1',
                fontSize: '0.95rem',
              }}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: 12 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
              {language === 'sw' ? 'Nambari ya Simu' : 'Companion Phone Number'}
            </span>
            <input
              type="tel"
              value={form.birth_companion_phone}
              onChange={(e) => setForm({ ...form, birth_companion_phone: e.target.value })}
              placeholder="+254700000003"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #CBD5E1',
                fontSize: '0.95rem',
              }}
              required
            />
          </label>
        </Card>

        {/* 3. Transport & Emergency */}
        <Card
          title={language === 'sw' ? '3. Usafiri wa Dharura' : '3. Emergency Transport Plan'}
          subtitle={language === 'sw' ? 'Mpango wako wa kufika hospitalini wakati uchungu ukianza' : 'How you will travel when labor starts'}
          headerAction={<Truck size={20} color="var(--color-primary)" />}
        >
          <label style={{ display: 'block', marginBottom: 12 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
              {language === 'sw' ? 'Mpango wa Usafiri na Namba ya Dereva' : 'Transport Details & Driver Contact'}
            </span>
            <input
              type="text"
              value={form.transport_plan}
              onChange={(e) => setForm({ ...form, transport_plan: e.target.value })}
              placeholder="e.g. Boda Boda voucher / Taxi Ouma: +254722998877"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #CBD5E1',
                fontSize: '0.95rem',
              }}
              required
            />
          </label>
        </Card>

        {/* 4. Essential Items Prepared */}
        <Card
          title={language === 'sw' ? '4. Vitu Muhimu vya Hospitali' : '4. Essential Delivery Items'}
          subtitle={language === 'sw' ? 'Chunguza vitu ulivyoviandaa kwenye begi la uzazi' : 'Check off items ready in your maternity bag'}
          headerAction={<Package size={20} color="var(--color-primary)" />}
        >
          {[
            { key: 'basin', en: 'Basin / Beseni la kuogea', sw: 'Beseni la kuogea' },
            { key: 'cotton_wool', en: 'Surgical cotton wool / Pamba safi', sw: 'Pamba safi ya hospitali' },
            { key: 'baby_clothes', en: 'Clean baby clothes & warm socks', sw: 'Nguo safi za mtoto na soksi za joto' },
            { key: 'maternity_pads', en: 'Maternity pads / Pedi za uzazi', sw: 'Pedi za uzazi' },
            { key: 'warm_blanket', en: 'Warm baby receiving shawl / Shuka safi', sw: 'Shuka safi ya kumfunga mtoto' },
          ].map((item) => (
            <label
              key={item.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 0',
                borderBottom: '1px solid #F1F5F9',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={Boolean(form.items_prepared[item.key])}
                onChange={() => toggleChecklist(item.key)}
                style={{ width: 18, height: 18, accentColor: 'var(--color-primary)' }}
              />
              <span style={{ fontSize: '0.9rem', color: '#1E293B' }}>
                {language === 'sw' ? item.sw : item.en}
              </span>
            </label>
          ))}
        </Card>

        {/* 5. Special Requests */}
        <Card
          title={language === 'sw' ? '5. Maombi Maalum kwa Wahudumu' : '5. Special Preferences'}
          headerAction={<ShieldAlert size={20} color="var(--color-primary)" />}
        >
          <label style={{ display: 'block' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
              {language === 'sw' ? 'Maombi (k.m. kumweka mtoto kifuani mara moja)' : 'Preferences (e.g., immediate skin-to-skin, partner presence)'}
            </span>
            <textarea
              value={form.special_requests}
              onChange={(e) => setForm({ ...form, special_requests: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #CBD5E1',
                fontSize: '0.95rem',
                fontFamily: 'inherit',
              }}
            />
          </label>
        </Card>

        <div style={{ marginTop: 24 }}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={saving}
            icon={<Save size={18} />}
          >
            {saving
              ? (language === 'sw' ? 'Inahifadhi...' : 'Saving Birth Plan...')
              : (language === 'sw' ? 'Hifadhi Mpango wa Uzazi' : 'Save Birth Plan')}
          </Button>
        </div>
      </form>
    </div>
  );
}
