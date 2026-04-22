import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, Sparkles } from 'lucide-react';
import useAuthStore from '../stores/authStore';
import toast from 'react-hot-toast';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock Auth
        if (email === 'demo@finpi.ai' && password === 'demo123') {
            toast.success('Welcome back to FinPi!');
            login({ email, full_name: 'Mithun Demo' }, 'mock-jwt-token');
        } else {
            toast.error('Invalid credentials. Use demo@finpi.ai / demo123');
        }
    };

    return (
        <div className="flex items-center justify-center min-height-screen p-8" style={{ height: '100vh' }}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/50 mx-auto mb-4">
                        <Sparkles size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold">FinPi</h1>
                    <p className="text-slate-400">AI-Powered Wealth Intelligence</p>
                </div>

                <div className="flex gap-4 mb-8 bg-slate-800/50 p-1 rounded-xl">
                    <button 
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${isLogin ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400'}`}
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isLogin ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-slate-400 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-indigo-500 transition-colors"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-slate-400 ml-1">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-indigo-500 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/20 smooth-transition flex items-center justify-center gap-2 mt-2"
                    >
                        {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-500">
                        Demo Account: <span className="text-indigo-400">demo@finpi.ai</span> / <span className="text-indigo-400">demo123</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
