import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import { motion } from 'framer-motion';
import { Plus, Download, Filter, Search, TrendingUp, TrendingDown, Info } from 'lucide-react';

const Portfolio = () => {
  const [holdings, setHoldings] = useState([
    { id: 1, name: 'Parag Parikh Flexi Cap Fund', isin: 'INF123456789', cat: 'Equity', units: '3,058.10', avgNav: '52.40', currNav: '65.40', value: '2,00,000', gain: '+24.8%', isPositive: true },
    { id: 2, name: 'HDFC Mid-Cap Opportunities', isin: 'INF987654321', cat: 'Equity', units: '703.23', avgNav: '128.50', currNav: '142.20', value: '1,00,000', gain: '+10.6%', isPositive: true },
    { id: 3, name: 'Nippon India Small Cap', isin: 'INF456789123', cat: 'Equity', units: '738.00', avgNav: '145.20', currNav: '135.50', value: '1,00,000', gain: '-6.7%', isPositive: false },
    { id: 4, name: 'SBI Bluechip Fund', isin: 'INF321654987', cat: 'Equity', units: '609.01', avgNav: '78.20', currNav: '82.10', value: '50,000', gain: '+5.0%', isPositive: true },
  ]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-bg)' }}>
      <Sidebar />
      
      <main style={{ flex: 1, marginLeft: '260px', padding: '40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Portfolio Manager</h1>
              <p style={{ color: 'var(--text-on-light-2)', fontSize: '16px' }}>Manage your investments and track performance across asset classes.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" style={{ background: 'white', color: 'var(--primary)', border: '1px solid var(--primary)', boxShadow: 'none' }}>
                <Download size={18} style={{ marginRight: '8px' }} /> Export PDF
              </button>
              <button className="btn-primary">
                <Plus size={18} style={{ marginRight: '8px' }} /> Add Investment
              </button>
            </div>
          </header>

          {/* Portfolio Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
            {[
              { label: 'Current Value', val: '₹5,00,000', sub: '+12.4%', color: 'var(--primary)' },
              { label: 'Total Invested', val: '₹4,45,000', sub: '₹55k Gain', color: 'var(--text-on-light)' },
              { label: '1Y Returns', val: '14.2%', sub: 'vs Nifty +12%', color: 'var(--secondary)' },
              { label: 'Risk Grade', val: 'Moderate', sub: 'Balanced', color: 'var(--chart-5)' },
            ].map((stat, i) => (
              <div key={i} className="finpi-card" style={{ padding: '20px' }}>
                <p style={{ color: 'var(--text-on-light-2)', fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>{stat.label}</p>
                <h3 className="jetbrains-mono" style={{ fontSize: '24px', color: stat.color }}>{stat.val}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Holdings Table */}
          <div className="finpi-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px' }}>Your Holdings</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Search funds..." 
                    style={{ 
                      padding: '8px 12px 8px 36px', 
                      borderRadius: '8px', 
                      border: '1px solid var(--border-light)',
                      fontSize: '14px',
                      width: '240px',
                      outline: 'none'
                    }}
                  />
                </div>
                <button style={{ background: 'none', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer' }}>
                  <Filter size={16} />
                </button>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--surface-bg)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>FUND NAME</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>UNITS</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>AVG. NAV</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>CURR. NAV</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>VALUE</th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>GAIN/LOSS</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h, i) => (
                  <tr key={h.id} style={{ borderBottom: '1px solid var(--border-light)', background: i % 2 === 0 ? 'white' : 'var(--surface-elevated)' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--primary)' }}>{h.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{h.isin} • {h.cat}</div>
                    </td>
                    <td className="jetbrains-mono" style={{ padding: '16px 24px', fontSize: '14px' }}>{h.units}</td>
                    <td className="jetbrains-mono" style={{ padding: '16px 24px', fontSize: '14px' }}>₹{h.avgNav}</td>
                    <td className="jetbrains-mono" style={{ padding: '16px 24px', fontSize: '14px' }}>₹{h.currNav}</td>
                    <td className="jetbrains-mono" style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600 }}>₹{h.value}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span className={h.isPositive ? 'badge-positive' : 'badge-negative'}>
                        {h.isPositive ? <TrendingUp size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> : <TrendingDown size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />}
                        {h.gain}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Rebalancing Section */}
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="finpi-card" style={{ background: 'var(--gradient-ocean)', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                  <TrendingUp size={24} color="var(--tertiary)" />
                </div>
                <h3 style={{ fontSize: '20px' }}>AI Portfolio Rebalancing</h3>
              </div>
              <p style={{ opacity: 0.9, marginBottom: '24px', fontSize: '15px' }}>
                Your current allocation is drifting from your 70:30 Equity/Debt target. FinPi suggests the following adjustments:
              </p>
              <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {[
                  'Sell ₹15,000 of Nippon India Small Cap (Lock in 18% tactical gains)',
                  'Invest ₹10,000 in HDFC Debt Fund (Rebalance to safety)',
                  'Invest ₹5,000 in SBI Bluechip Fund (Maintain core stability)'
                ].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--tertiary)' }} />
                    <span style={{ fontSize: '14px' }}>{tip}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ background: 'var(--tertiary)', color: 'var(--primary)' }}>
                Execute Rebalance
              </button>
            </div>

            <div className="finpi-card">
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Risk Exposure</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Large Cap', val: 45, color: 'var(--primary)' },
                  { label: 'Mid Cap', val: 30, color: 'var(--secondary)' },
                  { label: 'Small Cap', val: 25, color: 'var(--tertiary)' },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                      <span>{item.label}</span>
                      <span className="jetbrains-mono">{item.val}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--neutral-dark)', borderRadius: '3px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        transition={{ duration: 1, delay: 0.2 + i*0.1 }}
                        style={{ height: '100%', background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px', padding: '12px', background: 'var(--error-light)', borderRadius: '8px', border: '1px solid rgba(232, 83, 58, 0.2)', display: 'flex', gap: '10px' }}>
                <Info size={16} color="var(--error)" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '12px', color: 'var(--error-dark)' }}>
                  Your small-cap exposure is 5% higher than recommended for a 'Moderate' profile.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Portfolio;
