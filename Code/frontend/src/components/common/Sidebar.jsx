import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Bell, 
  FileText, 
  User,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
    { name: 'AI Advisor', path: '/advisor', icon: MessageSquare },
    { name: 'Goals', path: '/goals', icon: Target },
    { name: 'Market', path: '/market', icon: TrendingUp },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="sidebar"
      style={{
        width: '260px',
        height: '100vh',
        background: 'var(--surface-deep)',
        color: 'var(--text-on-dark)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        borderRight: '1px solid var(--border-dark)'
      }}
    >
      <div className="logo" style={{ padding: '0 24px 32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-on-dark)' }}>
          FinPi <span style={{ color: 'var(--tertiary)' }}>π</span>
        </span>
      </div>

      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 24px',
              color: isActive ? 'var(--tertiary)' : 'var(--text-on-dark)',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 500,
              background: isActive ? 'rgba(142, 207, 202, 0.15)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--tertiary)' : '3px solid transparent',
              transition: 'all 0.3s ease'
            })}
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ padding: '24px' }}>
        <button 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--text-on-dark)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            opacity: 0.7
          }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
