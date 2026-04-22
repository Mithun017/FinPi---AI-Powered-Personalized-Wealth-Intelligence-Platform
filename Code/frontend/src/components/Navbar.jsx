import React from 'react';
import { LayoutDashboard, Wallet, Brain, Target, Settings, LogOut } from 'lucide-react';
import useAuthStore from '../stores/authStore';

const Navbar = () => {
    const { logout } = useAuthStore();

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { icon: <Wallet size={20} />, label: 'Portfolio' },
        { icon: <Brain size={20} />, label: 'AI CFO' },
        { icon: <Target size={20} />, label: 'Goals' },
        { icon: <Settings size={20} />, label: 'Settings' },
    ];

    return (
        <nav className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-8 glass-card z-50">
            <div className="mb-12">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span style={{color: 'white', fontWeight: 'bold', fontSize: '1.25rem'}}>FP</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-8">
                {navItems.map((item, index) => (
                    <button 
                        key={index}
                        className="p-3 text-slate-400 hover-indigo rounded-xl smooth-transition group relative"
                        style={{ border: 'none', cursor: 'pointer' }}
                        title={item.label}
                    >
                        {item.icon}
                        <span className="absolute left-16 px-2 py-1 rounded text-xs opacity-0 pointer-events-none" style={{ backgroundColor: 'var(--bg-dark)', color: 'white', border: '1px solid var(--glass-border)' }}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            <button 
                onClick={logout}
                className="p-3 text-slate-400 rounded-xl smooth-transition"
                style={{ border: 'none', cursor: 'pointer', color: '#fb7185' }}
                title="Logout"
            >
                <LogOut size={20} />
            </button>
        </nav>
    );
};

export default Navbar;
