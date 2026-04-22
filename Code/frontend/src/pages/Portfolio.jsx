import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, TrendingUp } from 'lucide-react';

const Portfolio = () => {
    return (
        <div style={{ marginLeft: '5rem', padding: '2rem' }}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Investment Portfolio</h1>
                    <p className="text-slate-400">Track and manage your assets across different classes.</p>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 smooth-transition shadow-lg">
                    <Plus size={20} />
                    Add Asset
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div className="glass-card p-6">
                    <p className="text-slate-400 text-sm">Stock Market</p>
                    <h3 className="text-2xl font-bold mt-2">$84,200.00</h3>
                    <p className="text-emerald-400 text-xs mt-1">+14.2% overall</p>
                </div>
                <div className="glass-card p-6">
                    <p className="text-slate-400 text-sm">Crypto Assets</p>
                    <h3 className="text-2xl font-bold mt-2">$12,450.00</h3>
                    <p className="text-rose-400 text-xs mt-1">-2.5% overall</p>
                </div>
                <div className="glass-card p-6">
                    <p className="text-slate-400 text-sm">Mutual Funds</p>
                    <h3 className="text-2xl font-bold mt-2">$27,850.00</h3>
                    <p className="text-emerald-400 text-xs mt-1">+8.1% overall</p>
                </div>
            </div>

            <div className="glass-card p-6 mb-8 border-indigo-500/30 bg-indigo-500/5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Brain size={20} className="text-indigo-400" />
                        AI Rebalancing Suggestions
                    </h3>
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
                        94% Confidence
                    </span>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="flex-1">
                        <p className="text-sm text-slate-300 mb-4">
                            Your crypto exposure is currently 12% above your "Balanced" target. We suggest rebalancing to lock in profits and reduce volatility.
                        </p>
                        <div className="flex gap-3">
                            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm smooth-transition">
                                Execute Rebalance
                            </button>
                            <button className="text-slate-400 hover:text-white px-4 py-2 text-sm smooth-transition">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="w-48 h-24 flex items-end gap-1">
                        {[40, 70, 45, 90, 65, 80].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                className="flex-1 bg-indigo-500/40 rounded-t-sm"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-6">Asset Allocation</h3>
                <div className="flex flex-col gap-4">
                    {[
                        { name: 'Apple Inc.', symbol: 'AAPL', type: 'Stock', value: 15400, change: 2.4 },
                        { name: 'Bitcoin', symbol: 'BTC', type: 'Crypto', value: 8200, change: -1.2 },
                        { name: 'S&P 500 Index', symbol: 'SPY', type: 'ETF', value: 24500, change: 0.8 },
                    ].map((asset, i) => (
                        <div key={i} className="flex justify-between items-center p-4 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs">
                                    {asset.symbol}
                                </div>
                                <div>
                                    <p className="font-medium">{asset.name}</p>
                                    <p className="text-xs text-slate-400">{asset.type}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">${asset.value.toLocaleString()}</p>
                                <p className={`text-xs ${asset.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {asset.change > 0 ? '▲' : '▼'} {Math.abs(asset.change)}%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
