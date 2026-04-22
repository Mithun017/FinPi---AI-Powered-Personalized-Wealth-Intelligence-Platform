import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, Brain, Target, Settings, LogOut } from 'lucide-react';
import useAuthStore from '../stores/authStore';

const Navbar = () => {
    const { logout } = useAuthStore();

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
        { icon: <Wallet size={20} />, label: 'Portfolio', path: '/portfolio' },
        { icon: <Brain size={20} />, label: 'AI CFO', path: '/ai-chat' },
        { icon: <Target size={20} />, label: 'Goals', path: '/goals' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
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
                    <NavLink 
                        key={index}
                        to={item.path}
                        className={({ isActive }) => 
                            `p-3 rounded-xl smooth-transition group relative ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover-indigo'}`
                        }
                        title={item.label}
                    >
                        {item.icon}
                        <span className="absolute left-16 px-2 py-1 rounded text-xs opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'var(--bg-dark)', color: 'white', border: '1px solid var(--glass-border)', whiteSpace: 'nowrap' }}>
                            {item.label}
                        </span>
                    </NavLink>
                ))}
            </div>

            <button 
                onClick={logout}
                className="p-3 text-slate-400 rounded-xl smooth-transition"
                style={{ border: 'none', cursor: 'pointer', background: 'transparent' }}
                onMouseEnter={(e) => e.target.style.color = '#fb7185'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                title="Logout"
            >
                <LogOut size={20} />
            </button>
        </nav>
    );
};

export default Navbar;
