import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, Target, Brain, Shield, Info, AlertTriangle } from 'lucide-react';

const StatCard = ({ title, value, icon, trend, color }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 flex flex-col gap-4"
        style={{ minWidth: '240px' }}
    >
        <div className="flex justify-between items-center">
            <div className={`p-3 rounded-lg bg-${color}-500/20 text-${color}-400`}>
                {icon}
            </div>
            {trend && (
                <span className={`text-xs font-medium ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <div>
            <p className="text-slate-400 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [showReasoning, setShowReasoning] = useState(false);

    return (
        <div style={{ marginLeft: '5rem', padding: '2rem' }}>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between items-end mb-8"
            >
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, Mithun</h1>
                    <p className="text-slate-400">Your "Balanced" wealth personality is performing well today.</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm">
                        <Shield size={16} className="text-indigo-400" />
                        <span>Personality: <b>Balanced</b></span>
                    </div>
                </div>
            </motion.div>

            <div className="flex gap-6 mb-8 overflow-x-auto pb-4">
                <StatCard title="Net Worth" value="$124,500.00" icon={<Wallet size={24} />} trend={12.5} color="indigo" />
                <StatCard title="Monthly Income" value="$8,200.00" icon={<TrendingUp size={24} />} trend={4.2} color="emerald" />
                <StatCard title="Monthly Expenses" value="$3,450.00" icon={<TrendingDown size={24} />} trend={-2.1} color="rose" />
                <StatCard title="AI Wealth Score" value="82/100" icon={<Brain size={24} />} trend={5} color="amber" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '2rem' }}>
                <div className="flex flex-col gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Sparkles size={20} className="text-amber-400" />
                                AI Strategic Insights
                            </h3>
                            <button 
                                onClick={() => setShowReasoning(!showReasoning)}
                                className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                            >
                                <Info size={12} />
                                {showReasoning ? 'Hide Reasoning' : 'Explain Logic'}
                            </button>
                        </div>
                        
                        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
                            <p className="text-indigo-100 leading-relaxed">
                                "Based on your current trajectory, increasing your investment in <b>Low-Risk Index Funds</b> by 15% will likely accelerate your 'Europe Trip' goal by 3 months."
                            </p>
                        </div>

                        {showReasoning && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="p-4 rounded-xl bg-slate-800/50 text-xs text-slate-400 border border-white/5"
                            >
                                <p className="font-bold text-slate-300 mb-2">AI Reasoning Engine:</p>
                                <ul className="list-disc ml-4 flex flex-col gap-1">
                                    <li>Historical savings rate: 22% (consistent)</li>
                                    <li>Market volatility index: Low</li>
                                    <li>Goal priority weight: High</li>
                                    <li>Suggested action: Rebalance 5% from cash reserves</li>
                                </ul>
                            </motion.div>
                        )}
                    </motion.div>

                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
                        <div className="flex flex-col gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between items-center p-4 hover:bg-white/5 rounded-xl transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">🛍️</div>
                                        <div>
                                            <p className="font-medium">Amazon Purchase</p>
                                            <p className="text-xs text-slate-400">Shopping • 2 hours ago</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-rose-400">-$124.00</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-xl font-bold mb-6">Risk Heatmap</h3>
                        <div className="grid grid-cols-5 gap-2 h-32 mb-4">
                            {[...Array(15)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className="rounded-md" 
                                    style={{ 
                                        backgroundColor: i < 5 ? '#10b981' : i < 10 ? '#f59e0b' : '#ef4444',
                                        opacity: 0.3 + (Math.random() * 0.7)
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Conservative</span>
                            <span>Aggressive</span>
                        </div>
                    </motion.div>

                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold mb-6">Smart Alerts</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                                <AlertTriangle className="text-rose-400 shrink-0" size={20} />
                                <div>
                                    <p className="text-sm font-bold text-rose-100">High Spending</p>
                                    <p className="text-xs text-rose-300/70">You've spent 20% more on Food this week.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <TrendingUp className="text-amber-400 shrink-0" size={20} />
                                <div>
                                    <p className="text-sm font-bold text-amber-100">Opportunity</p>
                                    <p className="text-xs text-amber-300/70">Apple stock is 5% below your average buy price.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
