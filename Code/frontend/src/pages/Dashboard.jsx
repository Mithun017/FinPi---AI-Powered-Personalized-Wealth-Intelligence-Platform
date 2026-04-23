import React, { useEffect, useRef } from 'react';
import Sidebar from '../components/common/Sidebar';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Sparkles, Calendar } from 'lucide-react';

const Dashboard = () => {
  const netWorthRef = useRef(null);

  const portfolioData = [
    { name: 'Jan', value: 400000 },
    { name: 'Feb', value: 420000 },
    { name: 'Mar', value: 415000 },
    { name: 'Apr', value: 435000 },
    { name: 'May', value: 450000 },
    { name: 'Jun', value: 480000 },
    { name: 'Jul', value: 500000 },
  ];

  const allocationData = [
    { name: 'Equity', value: 350000 },
    { name: 'Debt', value: 100000 },
    { name: 'Gold', value: 50000 },
  ];

  const COLORS = ['#1E4D78', '#4A8FA3', '#8ECFCA'];

  useEffect(() => {
    // GSAP count up animation for Net Worth
    gsap.to(netWorthRef.current, {
      innerText: 500000,
      duration: 2,
      ease: 'power2.out',
      snap: { innerText: 1 },
      onUpdate: function() {
        netWorthRef.current.innerText = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(this.targets()[0].innerText);
      }
    });
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-bg)' }}>
      <Sidebar />
      
      <main style={{ flex: 1, marginLeft: '260px', padding: '40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Good Morning, Mithun 👋</h1>
            <p style={{ color: 'var(--text-on-light-2)', fontSize: '16px' }}>Here's your wealth intelligence summary for today.</p>
          </header>

          {/* Top Row: Net Worth & Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
            <div className="finpi-card">
              <p style={{ color: 'var(--text-on-light-2)', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>TOTAL NET WORTH</p>
              <h2 ref={netWorthRef} className="jetbrains-mono" style={{ fontSize: '36px', color: 'var(--primary)' }}>₹0</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <span className="badge-positive">+12.4%</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>vs last month</span>
              </div>
            </div>

            <div className="finpi-card">
              <p style={{ color: 'var(--text-on-light-2)', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>FINPI SCORE</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h2 className="jetbrains-mono" style={{ fontSize: '36px', color: 'var(--secondary)' }}>742</h2>
                <div style={{ flex: 1, height: '8px', background: 'var(--neutral-dark)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '87%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ height: '100%', background: 'var(--gradient-teal)' }}
                  />
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>Your financial wellness is <strong>Excellent</strong>.</p>
            </div>

            <div className="finpi-card" style={{ background: 'var(--gradient-ocean)', color: 'var(--text-on-dark)' }}>
              <p style={{ color: 'var(--text-on-dark-2)', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>MONTHLY SIP</p>
              <h2 className="jetbrains-mono" style={{ fontSize: '36px' }}>₹25,000</h2>
              <p style={{ fontSize: '13px', opacity: 0.8, marginTop: 12 }}>Next deduction: <strong>05 May 2026</strong></p>
            </div>
          </div>

          {/* Middle Row: Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div className="finpi-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px' }}>Portfolio Performance</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['1W', '1M', '3M', '1Y', 'ALL'].map(t => (
                    <button key={t} style={{ 
                      padding: '4px 12px', 
                      borderRadius: '6px', 
                      border: '1px solid var(--border-light)',
                      background: t === '1Y' ? 'var(--primary)' : 'transparent',
                      color: t === '1Y' ? 'white' : 'var(--text-muted)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--neutral-dark)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7A9BAD' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7A9BAD' }} tickFormatter={(v) => `₹${v/1000}k`} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="finpi-card">
              <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Asset Allocation</h3>
              <div style={{ height: '240px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>TOTAL</p>
                  <p className="jetbrains-mono" style={{ fontSize: '18px', fontWeight: 'bold' }}>₹5L</p>
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                {allocationData.map((item, i) => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: COLORS[i] }} />
                      <span style={{ fontSize: '14px' }}>{item.name}</span>
                    </div>
                    <span className="jetbrains-mono" style={{ fontSize: '14px', fontWeight: 600 }}>{((item.value / 500000) * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row: AI Insight & Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
             <div className="finpi-card" style={{ borderLeft: '4px solid var(--secondary)', background: 'var(--surface-elevated)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Sparkles size={20} color="var(--secondary)" />
                  <h3 style={{ fontSize: '18px', color: 'var(--primary)' }}>FinPi AI Insight 🔮</h3>
                </div>
                <p style={{ color: 'var(--text-on-light)', fontSize: '15px', lineHeight: '1.6' }}>
                  "Markets are showing strong resilience. Based on your risk profile, you have a slight overweight position in mid-caps. 
                  Consider shifting ₹15,000 to the <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>FinPi Moderate Debt Fund</span> to maintain your 70:30 allocation target."
                </p>
                <button className="btn-primary" style={{ marginTop: '20px', padding: '8px 20px', fontSize: '13px' }}>
                  Apply Recommendation
                </button>
             </div>

             <div className="finpi-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Calendar size={20} color="var(--primary)" />
                  <h3 style={{ fontSize: '18px' }}>Upcoming SIPs</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { name: 'Parag Parikh Flexi Cap', date: '05 May', amt: '₹10,000' },
                    { name: 'HDFC Mid-Cap Opportunities', date: '12 May', amt: '₹5,000' },
                    { name: 'Nippon India Small Cap', date: '15 May', amt: '₹10,000' },
                  ].map((sip, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--neutral)', borderRadius: '8px' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{sip.name}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Scheduled for {sip.date}</p>
                      </div>
                      <p className="jetbrains-mono" style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{sip.amt}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
