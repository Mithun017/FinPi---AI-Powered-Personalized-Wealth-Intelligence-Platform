import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, Mic, Paperclip, X, MessageSquare } from 'lucide-react';
import axios from 'axios';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  }, [messages, isStreaming, isOpen]);

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
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px', // Moved to bottom right
          width: '60px',
          height: '60px',
          borderRadius: '20px',
          background: 'var(--gradient-ocean)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 32px rgba(30, 77, 120, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '30px',
              width: '400px',
              height: '600px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1000,
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            {/* Header */}
            <div style={{ 
              padding: '20px 24px', 
              background: 'var(--gradient-ocean)', 
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '10px', 
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', margin: 0 }}>FinPi AI Advisor</h3>
                  <p style={{ fontSize: '12px', margin: 0, opacity: 0.8 }}>Online | Gemini 2.0 Flash</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    gap: '12px',
                    maxWidth: '90%',
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  {msg.role === 'ai' && (
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '10px', 
                      background: 'var(--neutral-dark)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--primary)',
                      flexShrink: 0
                    }}>
                      <Bot size={16} />
                    </div>
                  )}
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? 'var(--gradient-ocean)' : 'var(--neutral)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-on-light)',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}>
                    {msg.content}
                    {msg.role === 'ai' && isStreaming && msg.id === messages[messages.length - 1].id && (
                      <span className="streaming-cursor">|</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '20px' }}>
              <form 
                onSubmit={handleSend}
                style={{ 
                  background: 'var(--neutral)', 
                  borderRadius: '12px', 
                  padding: '8px', 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid var(--border-light)'
                }}
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  style={{
                    flex: 1,
                    border: 'none',
                    padding: '8px 12px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'transparent',
                    color: 'var(--text-on-light)'
                  }}
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isStreaming}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '8px', 
                    background: 'var(--primary)', 
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    opacity: (!input.trim() || isStreaming) ? 0.5 : 1
                  }}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        .streaming-cursor {
          display: inline-block;
          width: 2px;
          height: 14px;
          background: var(--tertiary);
          margin-left: 4px;
          vertical-align: middle;
          animation: blink 0.8s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default ChatWidget;
