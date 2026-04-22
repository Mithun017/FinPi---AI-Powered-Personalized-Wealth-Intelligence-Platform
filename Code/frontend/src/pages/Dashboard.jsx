import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, Target, Brain } from 'lucide-react';

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
    return (
        <div style={{ marginLeft: '5rem', padding: '2rem' }}>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold">Welcome back, Mithun</h1>
                <p className="text-slate-400">Here's your wealth intelligence overview.</p>
            </motion.div>

            <div className="flex gap-6 mb-8 overflow-x-auto pb-4">
                <StatCard title="Net Worth" value="$124,500.00" icon={<Wallet size={24} />} trend={12.5} color="indigo" />
                <StatCard title="Monthly Income" value="$8,200.00" icon={<TrendingUp size={24} />} trend={4.2} color="emerald" />
                <StatCard title="Monthly Expenses" value="$3,450.00" icon={<TrendingDown size={24} />} trend={-2.1} color="rose" />
                <StatCard title="AI Wealth Score" value="82/100" icon={<Brain size={24} />} trend={5} color="amber" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6"
                >
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
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6"
                >
                    <h3 className="text-xl font-bold mb-6">Active Goals</h3>
                    <div className="flex flex-col gap-6">
                        {[
                            { title: 'New Car', current: 12000, target: 35000, color: 'indigo' },
                            { title: 'Europe Trip', current: 4500, target: 5000, color: 'emerald' }
                        ].map((goal, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>{goal.title}</span>
                                    <span className="text-slate-400">${goal.current} / ${goal.target}</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                                        className={`h-full bg-${goal.color}-500`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
