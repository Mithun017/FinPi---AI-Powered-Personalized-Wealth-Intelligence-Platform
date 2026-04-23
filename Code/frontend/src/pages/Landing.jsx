import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Landing = () => {
  const canvasRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    // GSAP floating particles animation
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 60;

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? '#4A8FA3' : '#8ECFCA'; // Teal or Mint
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // GSAP Hero text reveal
    const tl = gsap.timeline();
    tl.from('.hero-title', {
      duration: 1.2,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      stagger: 0.2
    })
    .from('.hero-subtitle', {
      duration: 0.8,
      opacity: 0,
      y: 20,
      ease: 'power2.out'
    }, '-=0.6')
    .from('.cta-btn', {
      duration: 0.6,
      scale: 0.8,
      opacity: 0,
      ease: 'back.out(1.7)'
    }, '-=0.4');

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="landing-container" style={{ background: 'var(--surface-bg)', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ 
        height: '100vh', 
        background: 'var(--gradient-hero)', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'var(--text-on-dark)'
      }}>
        <canvas 
          ref={canvasRef} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        />
        
        <header style={{ position: 'absolute', top: 0, width: '100%', padding: '32px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ fontSize: '28px', fontWeight: 'bold' }}>
            FinPi <span style={{ color: 'var(--tertiary)' }}>π</span>
          </div>
          <Link to="/login" className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
            Login / Register
          </Link>
        </header>

        <div style={{ zIndex: 1, padding: '0 20px', maxWidth: '900px' }}>
          <h1 className="hero-title" style={{ fontSize: '72px', marginBottom: '24px', color: 'var(--text-on-dark)', lineHeight: 1.1 }}>
            Infinite Intelligence for <br />
            <span style={{ color: 'var(--tertiary)' }}>Your Wealth Journey</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '20px', marginBottom: '40px', color: 'var(--text-on-dark)', opacity: 0.9 }}>
            India's most sophisticated AI-powered wealth intelligence platform. <br />
            Personalized advisory, automated tracking, and infinite growth.
          </p>
          <div className="cta-btn">
            <Link to="/login" className="btn-primary" style={{ fontSize: '18px', padding: '16px 40px' }}>
              Start Building Wealth π
            </Link>
          </div>
        </div>

        {/* Market Ticker Strip */}
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          width: '100%', 
          background: 'rgba(22, 58, 92, 0.8)', 
          backdropFilter: 'blur(10px)',
          padding: '12px 0',
          display: 'flex',
          overflow: 'hidden'
        }}>
          <div className="ticker-content" style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap', animation: 'ticker 30s linear infinite', padding: '0 20px' }}>
             {[
              { name: 'NIFTY 50', val: '22,451', chg: '+0.85%' },
              { name: 'SENSEX', val: '74,123', chg: '+0.72%' },
              { name: 'GOLD', val: '71,200', chg: '-0.15%' },
              { name: 'NIFTY NEXT 50', val: '62,110', chg: '+1.20%' },
              { name: 'USD/INR', val: '83.42', chg: '-0.05%' },
              { name: 'NIFTY 50', val: '22,451', chg: '+0.85%' },
              { name: 'SENSEX', val: '74,123', chg: '+0.72%' },
              { name: 'GOLD', val: '71,200', chg: '-0.15%' },
             ].map((item, i) => (
               <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
                 <span style={{ color: 'var(--text-on-dark-2)' }}>{item.name}</span>
                 <span className="jetbrains-mono">{item.val}</span>
                 <span style={{ color: item.chg.startsWith('+') ? 'var(--tertiary)' : 'var(--error)' }}>{item.chg}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Landing;
