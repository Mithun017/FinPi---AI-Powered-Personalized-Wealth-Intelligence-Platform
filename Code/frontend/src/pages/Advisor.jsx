import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/common/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, Mic, Paperclip } from 'lucide-react';
import axios from 'axios';

const Advisor = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: "Hello! I'm FinPi, your AI Wealth Advisor. How can I help you grow your wealth today?",
      id: 1
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: input, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    const aiMessageId = Date.now() + 1;
    setMessages(prev => [...prev, { role: 'ai', content: '', id: aiMessageId }]);

    try {
      // Setup SSE or Streaming fetch
      const response = await fetch('http://localhost:8000/api/ai/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.token) {
                fullContent += data.token;
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId ? { ...msg, content: fullContent } : msg
                ));
              }
              if (data.done) break;
            } catch (e) {
              console.error("Error parsing stream chunk", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, content: "Sorry, I encountered an error. Please try again." } : msg
      ));
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-bg)' }}>
      <Sidebar />
      
      <main style={{ flex: 1, marginLeft: '260px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <header style={{ 
          padding: '24px 40px', 
          background: 'white', 
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '24px' }}>FinPi AI Advisor</h1>
            <p style={{ color: 'var(--text-on-light-2)', fontSize: '14px' }}>Powered by Google Gemini 1.5 Flash</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span className="badge-positive" style={{ padding: '6px 12px' }}>Personalized</span>
            <span className="badge-positive" style={{ padding: '6px 12px', background: 'var(--primary-glow)', color: 'var(--primary)', borderColor: 'var(--primary-light)' }}>Secure</span>
          </div>
        </header>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '16px',
                  maxWidth: '85%',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {msg.role === 'ai' && (
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '12px', 
                    background: 'var(--gradient-ocean)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <Bot size={20} />
                  </div>
                )}
                
                <div style={{
                  padding: '16px 20px',
                  borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: msg.role === 'user' ? 'var(--gradient-ocean)' : 'white',
                  color: msg.role === 'user' ? 'white' : 'var(--text-on-light)',
                  boxShadow: 'var(--shadow-card)',
                  border: msg.role === 'ai' ? '1px solid var(--border-light)' : 'none',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  position: 'relative'
                }}>
                  {msg.content}
                  {msg.role === 'ai' && isStreaming && msg.id === messages[messages.length - 1].id && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      style={{ 
                        display: 'inline-block', 
                        width: '2px', 
                        height: '16px', 
                        background: 'var(--tertiary)',
                        marginLeft: '4px',
                        verticalAlign: 'middle'
                      }}
                    >|</motion.span>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '12px', 
                    background: 'var(--neutral-dark)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    flexShrink: 0
                  }}>
                    <User size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div style={{ padding: '0 40px 40px' }}>
          <form 
            onSubmit={handleSend}
            style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '12px', 
              display: 'flex', 
              alignItems: 'center',
              gap: '12px',
              boxShadow: 'var(--shadow-elevated)',
              border: '1px solid var(--border-light)'
            }}
          >
            <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask FinPi about your portfolio, market trends, or goal planning..."
              style={{
                flex: 1,
                border: 'none',
                padding: '12px',
                fontSize: '15px',
                outline: 'none',
                color: 'var(--text-on-light)'
              }}
            />
            <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <Mic size={20} />
            </button>
            <button 
              type="submit" 
              disabled={!input.trim() || isStreaming}
              className="btn-primary"
              style={{ padding: '10px', borderRadius: '12px', minWidth: '44px' }}
            >
              <Send size={20} />
            </button>
          </form>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
            {['Analyze my risk', 'Top mutual funds 2026', 'How to save ₹1Cr?'].map(chip => (
              <button 
                key={chip}
                onClick={() => setInput(chip)}
                style={{ 
                  background: 'white', 
                  border: '1px solid var(--secondary)', 
                  color: 'var(--secondary)',
                  borderRadius: '20px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Advisor;
