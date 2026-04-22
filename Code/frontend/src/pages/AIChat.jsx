import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Brain, User, Sparkles } from 'lucide-react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/endpoints';
import toast from 'react-hot-toast';

const AIChat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your FinPi AI CFO. How can I help you optimize your wealth today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await api.post(ENDPOINTS.AI.CHAT, { query: input });
            if (response.success) {
                const aiMsg = { 
                    id: Date.now() + 1, 
                    text: response.data.data.response, 
                    sender: 'ai' 
                };
                setMessages(prev => [...prev, aiMsg]);
            }
        } catch (error) {
            toast.error("AI Brain is currently offline.");
            console.error(error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div style={{ marginLeft: '5rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="p-8 border-b border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                    <Brain size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">AI CFO Chat</h1>
                    <p className="text-slate-400 text-sm flex items-center gap-1">
                        <Sparkles size={14} className="text-amber-400" />
                        AI-Powered Wealth Guidance
                    </p>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 flex flex-col gap-6"
                style={{ scrollBehavior: 'smooth' }}
            >
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-3 max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-indigo-500' : 'bg-slate-800 border border-white/10'}`}>
                                    {msg.sender === 'user' ? <User size={16} /> : <Brain size={16} className="text-amber-400" />}
                                </div>
                                <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-500 text-white rounded-tr-none' : 'glass-card rounded-tl-none'}`}>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 p-4 glass-card w-16 items-center justify-center rounded-xl">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </motion.div>
                )}
            </div>

            <div className="p-8">
                <div className="glass-card p-2 flex gap-2 items-center">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask your AI CFO anything about your wealth..."
                        className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm"
                    />
                    <button 
                        onClick={handleSend}
                        className="bg-indigo-500 hover:bg-indigo-600 p-3 rounded-xl smooth-transition"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
