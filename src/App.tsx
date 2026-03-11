/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  MapPin, 
  Bell, 
  Battery, 
  Wifi, 
  Lock, 
  Smartphone, 
  Cloud, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X,
  Zap,
  Eye,
  Activity
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-dark/80 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="SAFENTRA Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(20,136,166,0.5)]" />
          <span className="text-2xl font-black tracking-tighter text-white">SAFENTRA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Tech', 'App', 'Privacy', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-neutral/80 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <button className="primary-button px-6 py-2.5 text-sm font-bold">
            Join the Waitlist
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-bg-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {['Tech', 'App', 'Privacy', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-semibold text-neutral/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button className="primary-button px-6 py-3 font-bold w-full">
              Join the Waitlist
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any, title: string, description: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className="glass-card p-8 transition-all duration-500 group"
  >
    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(20,136,166,0.4)] transition-all duration-500">
      <Icon className="w-7 h-7 text-primary group-hover:text-white" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-neutral/60 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const Step = ({ number, title, description, image, delay = 0 }: { number: number, title: string, description: string, image: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: number % 2 === 0 ? 20 : -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex flex-col items-center text-center group"
  >
    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mb-8 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-bg-darker text-primary group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(20,136,166,0.5)] transition-all duration-500`}>
      {number}
    </div>
    <div className="w-full aspect-[4/3] glass-card p-2 rounded-[2rem] overflow-hidden mb-8 group-hover:-translate-y-2 transition-transform duration-500">
      <img src={image} alt={title} className="w-full h-full object-cover rounded-[1.5rem]" referrerPolicy="no-referrer" />
    </div>
    <h4 className="text-2xl font-bold mb-4 text-white">{title}</h4>
    <p className="text-neutral/70 max-w-xs mx-auto text-sm">{description}</p>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 bg-bg-darker">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] animate-pulse delay-700 mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-8 text-center lg:text-left">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex glass-button px-5 py-2 rounded-full text-primary text-xs font-bold uppercase tracking-[0.2em] border border-primary/20"
            >
              Available for Pre-Order
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tighter"
            >
              Peace of Mind, <br />
              <span className="text-gradient drop-shadow-[0_0_15px_rgba(20,136,166,0.3)]">One Badge Away.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-neutral/70 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
            >
              The tamper-resistant safety badge that keeps your child safe and connected, everywhere they go. Aerospace-grade security for your most precious cargo.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <button className="primary-button px-10 py-5 text-lg font-bold flex items-center justify-center gap-2 group">
                Pre-Order Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="glass-button px-10 py-5 rounded-full text-white font-bold text-lg flex items-center justify-center gap-2 group">
                <Eye className="w-5 h-5 text-primary group-hover:text-white transition-colors" /> Watch Reveal
              </button>
            </motion.div>
          </div>

          <div className="relative flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              {/* Glowing Rings (High Contrast) */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border border-dashed border-primary/40 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border border-primary/10 rounded-full shadow-[inset_0_0_20px_rgba(20,136,166,0.1)]"
              />
              
              <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] glass-card p-3 rounded-[3rem] overflow-hidden group">
                {/* We use one of the cool product images from the reference folder */}
                <img 
                  src="/DT Jury/CMF/img1.png" 
                  alt="SAFENTRA Badge" 
                  className="w-full h-full object-cover rounded-[2.2rem] opacity-90 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                {/* Inner glass overlay for sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-[3rem] pointer-events-none" />
              </div>
              
              {/* Floating Status Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass p-4 rounded-2xl flex items-center gap-3 backdrop-blur-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(20,136,166,0.4)]">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral/50 uppercase tracking-wider">Live Status</p>
                  <p className="text-sm font-bold text-white">Active & Secure</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-32 bg-bg-dark px-6 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white mb-6"
            >
              Every Second Counts.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral/70 max-w-2xl mx-auto text-lg"
            >
              Existing solutions aren't built for the unpredictable nature of childhood adventures. We identified the three biggest fears of every parent.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Smartphone}
              title="Crowd Separation"
              description="The terrifying moment you lose sight of your child in a busy theme park or mall. SAFENTRA keeps you tethered."
              delay={0.1}
            />
            <FeatureCard 
              icon={MapPin}
              title="Location Anxiety"
              description="The constant worry of not knowing exactly where they are during school trips. Real-time tracking ends the guessing."
              delay={0.2}
            />
            <FeatureCard 
              icon={Zap}
              title="Fragile Trackers"
              description="Standard trackers are easily removed or broken. Our aerospace-grade shell is built for the playground."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="tech" className="py-32 px-6 bg-bg-darker relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight"
              >
                The Smartest Badge <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(20,136,166,0.3)]">Ever Built.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-neutral/70 text-xl"
              >
                Advanced technology packed into a lightweight, child-friendly design that kids actually want to wear.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tamper-Resistant",
                desc: "Our patented magnetic lock ensures the badge stays on until a guardian removes it.",
                img: "/DT Jury/Product/IMG-20260310-WA0184.jpg"
              },
              {
                title: "Real-Time GPS",
                desc: "Ultra-wideband and satellite tracking provide accuracy down to 3 feet anywhere globally.",
                img: "/DT Jury/Product/IMG-20260310-WA0185.jpg"
              },
              {
                title: "Smart Alerts",
                desc: "Instant notifications the moment your child enters or leaves customized geofenced zones.",
                img: "/DT Jury/Product/IMG-20260310-WA0187.jpg"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 transition-all duration-700 group border border-white/10 hover:border-primary/50 hover:shadow-[0_20px_50px_rgba(20,136,166,0.2)]"
              >
                <div className="rounded-[2rem] aspect-square mb-8 overflow-hidden bg-bg-dark border border-white/5">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                </div>
                <div className="px-6 pb-6">
                  <h4 className="text-2xl font-bold mb-3 text-white">{item.title}</h4>
                  <p className="text-neutral/60 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-bg-dark border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral/70 text-xl"
            >
              Safety made simple for busy parents. Three steps to peace of mind.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <Step 
              number={1}
              title="Attach Securely"
              description="Snap the badge onto clothing or a backpack using our guardian-only lock mechanism."
              image="/DT Jury/Product/IMG-20260310-WA0182.jpg"
              delay={0.1}
            />
            <Step 
              number={2}
              title="Sync App"
              description="Open the Guardian App and pair your new device in seconds with a single tap."
              image="/DT Jury/Product/IMG-20260310-WA0183.jpg"
              delay={0.2}
            />
            <Step 
              number={3}
              title="Monitor in Real-Time"
              description="Enjoy the freedom of knowing your child's exact location from anywhere in the world."
              image="/DT Jury/Product/IMG-20260310-WA0181.jpg"
              delay={0.3}
            />
            
            {/* Connector Line */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-white/10 -z-10" />
          </div>
        </div>
      </section>

      {/* Engineering Section */}
      <section className="py-32 px-6 bg-bg-dark text-white border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1488A6_0%,transparent_70%)] mix-blend-screen" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
            <img 
              src="/DT Jury/Product/IMG-20260310-WA0182.jpg" 
              alt="Engineering" 
              className="relative w-full h-auto rounded-[3rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)] border border-white/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="space-y-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black leading-tight"
            >
              Engineering Perfection for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(20,136,166,0.3)]">Ultimate Safety.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
              className="text-neutral/70 text-xl leading-relaxed"
            >
              We didn't just build a tracker; we engineered a life-saving device. Every component is chosen for reliability and longevity in the toughest environments.
            </motion.p>

            <ul className="space-y-8">
              {[
                { icon: Battery, title: "1-Year Battery Life", desc: "Optimized low-energy hardware means you only charge it once a year." },
                { icon: Shield, title: "IP68 Waterproof", desc: "Pools, mud, or rain—SAFENTRA is built to survive the playground." },
                { icon: Wifi, title: "Triple-Network Mesh", desc: "Utilizing GPS, Cellular, and Bluetooth mesh for maximum redundancy." }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_20px_rgba(20,136,166,0.5)] transition-all duration-500">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-bold text-2xl mb-2">{item.title}</h5>
                    <p className="text-neutral/60 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* App Interface */}
      <section id="app" className="py-32 px-6 bg-bg-darker relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Your Child's Safety, In Your Pocket.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral/70 text-xl"
          >
            The Guardian App provides an intuitive, crystal-clear dashboard for your most precious cargo.
          </motion.p>
        </div>

        <div className="flex justify-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-[320px] w-full border-[12px] border-[#0A0A0A] rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] bg-bg-dark overflow-hidden aspect-[9/19]"
          >
            {/* Notch */}
            <div className="absolute top-0 w-full h-8 bg-[#0A0A0A] flex justify-center items-end pb-1.5 z-20">
              <div className="w-24 h-5 bg-[#0A0A0A] rounded-full" />
            </div>

            <div className="p-5 pt-12 h-full flex flex-col relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h6 className="font-black text-xl tracking-tighter text-primary">SAFENTRA App</h6>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-neutral/80" />
                </div>
              </div>

              <div className="bg-[#121213] rounded-[2rem] flex-grow mb-6 relative overflow-hidden border border-white/10 shadow-inner">
                <img 
                  src="/DT Jury/pintrest/Snow and salt filter.jpg" 
                  alt="Map Reference" 
                  className="w-full h-full object-cover opacity-60 mix-blend-screen"
                  referrerPolicy="no-referrer"
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(20,136,166,0.6)]">
                    <div className="w-4 h-4 bg-primary rounded-full border-2 border-[#121213] shadow-lg" />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="bg-primary/10 p-4 rounded-2xl flex items-center gap-4 border border-primary/20"
                >
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-[0_5px_15px_rgba(20,136,166,0.4)]">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral/50 uppercase tracking-widest">Alert</p>
                    <p className="text-sm font-bold text-white">Leo left School Zone</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-secondary/10 p-4 rounded-2xl flex items-center gap-4 border border-secondary/20"
                >
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white shadow-[0_5px_15px_rgba(13,92,112,0.4)]">
                    <Battery className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral/50 uppercase tracking-widest">Status</p>
                    <p className="text-sm font-bold text-white">Battery at 98%</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-32 px-6 bg-bg-dark border-y border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-24 bg-primary/10 border border-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-12 shadow-[inset_0_0_20px_rgba(20,136,166,0.2)]"
          >
            <Lock className="w-10 h-10" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-white mb-16"
          >
            Privacy by Design.
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
            {[
              { title: "Military-Grade Encryption", desc: "All location data is end-to-end encrypted. Only verified guardians can access the device's location." },
              { title: "No Third-Party Tracking", desc: "We never sell your data. Your child's movement history is yours alone and is deleted after 30 days." },
              { title: "Parent-Only Access", desc: "Multi-factor authentication ensures that only you and your designated co-guardians can see the map." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <h4 className="font-bold text-2xl text-primary drop-shadow-[0_0_10px_rgba(20,136,166,0.3)]">{item.title}</h4>
                <p className="text-neutral/70 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-bg-darker text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-[150px] mix-blend-screen" 
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 glass-card p-16 rounded-[4rem]">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-10 tracking-tighter"
          >
            Ready to Secure <br /> Their Future?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-neutral/70 mb-16 max-w-2xl mx-auto"
          >
            Be the first to know when we launch. Join over 10,000 parents who trust SAFENTRA for their children's safety.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-stretch sm:items-center"
          >
            <input 
              className="deep-shadow-form px-8 py-5 rounded-[2rem] text-white w-full sm:max-w-md focus:outline-none focus:border-primary/50 text-lg font-medium placeholder:text-neutral/40" 
              placeholder="Enter your email" 
              type="email" 
            />
            <button className="primary-button px-12 py-5 font-bold text-xl whitespace-nowrap">
              Join the Waitlist
            </button>
          </motion.div>
          <p className="mt-8 text-sm text-neutral/50 font-medium">No credit card required. Launching Fall 2024.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="flex items-center gap-3 text-primary">
              <img src="/logo.png" alt="SAFENTRA Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(20,136,166,0.5)]" />
              <span className="text-3xl font-black tracking-tighter text-white">SAFENTRA</span>
            </div>
            <p className="text-neutral/60 text-lg leading-relaxed">
              The world's most advanced safety wearable for children. Designed with love in California.
            </p>
          </div>
          
          <div>
            <h6 className="font-bold text-white text-lg mb-8">Product</h6>
            <ul className="space-y-4 text-neutral/60">
              {['How it Works', 'Technology', 'Guardian App', 'Waitlist'].map(item => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-white text-lg mb-8">Company</h6>
            <ul className="space-y-4 text-neutral/60">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-white text-lg mb-8">Contact</h6>
            <ul className="space-y-6 text-neutral/60">
              <li><a href="mailto:support@safentra.com" className="hover:text-primary transition-colors text-lg font-medium">support@safentra.com</a></li>
              <li className="flex gap-4">
                {[Smartphone, Cloud, Lock].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral/80 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral/50 font-medium">© 2026 SAFENTRA Inc. All rights reserved.</p>
          <div className="flex gap-10 text-neutral/50 font-medium">
            {['Twitter', 'Instagram', 'LinkedIn'].map(item => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
