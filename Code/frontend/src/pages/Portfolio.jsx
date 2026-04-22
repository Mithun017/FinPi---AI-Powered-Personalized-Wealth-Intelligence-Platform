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
