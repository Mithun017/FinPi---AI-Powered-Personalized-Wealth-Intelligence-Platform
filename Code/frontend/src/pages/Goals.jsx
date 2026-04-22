import React from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Calendar } from 'lucide-react';

const Goals = () => {
    const goals = [
        { title: 'Emergency Fund', current: 15000, target: 20000, deadline: '2026-12-01', color: 'indigo' },
        { title: 'New MacBook Pro', current: 1200, target: 2500, deadline: '2026-06-15', color: 'emerald' },
        { title: 'House Downpayment', current: 45000, target: 100000, deadline: '2028-01-01', color: 'amber' },
    ];

    return (
        <div style={{ marginLeft: '5rem', padding: '2rem' }}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Financial Goals</h1>
                    <p className="text-slate-400">Plan and track your milestones with AI-driven insights.</p>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 smooth-transition shadow-lg">
                    <Plus size={20} />
                    New Goal
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {goals.map((goal, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-xl bg-${goal.color}-500/20 text-${goal.color}-400`}>
                                <Target size={24} />
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                                    <Calendar size={12} />
                                    {goal.deadline}
                                </p>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
                        <div className="flex justify-between text-sm mb-4">
                            <span className="text-slate-400">Progress</span>
                            <span className="font-bold">{Math.round((goal.current / goal.target) * 100)}%</span>
                        </div>

                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-6">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                                className={`h-full bg-${goal.color}-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]`}
                            />
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/5">
                            <div>
                                <p className="text-xs text-slate-400">Current</p>
                                <p className="font-bold">${goal.current.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-400">Target</p>
                                <p className="font-bold">${goal.target.toLocaleString()}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Goals;
