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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <img src="/logo.png" alt="SAFENTRA Logo" className="w-10 h-10 object-contain drop-shadow-md" />
          <span className="text-2xl font-black tracking-tighter">SAFENTRA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Tech', 'App', 'Privacy', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
              {item}
            </a>
          ))}
          <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
            Join the Waitlist
          </button>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Tech', 'App', 'Privacy', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-semibold text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold">
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
    className="glass p-8 rounded-[2.5rem] border border-white/50 shadow-sm hover:shadow-xl transition-all duration-500 group"
  >
    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
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
    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mb-8 border-8 ${number === 2 ? 'bg-secondary border-secondary/10' : 'bg-primary border-primary/10'} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
      {number}
    </div>
    <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 shadow-2xl border-4 border-white">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
    </div>
    <h4 className="text-2xl font-bold mb-4 text-slate-900">{title}</h4>
    <p className="text-slate-500 max-w-xs mx-auto">{description}</p>
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
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-8 text-center lg:text-left">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest"
            >
              Available for Pre-Order
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-slate-900 leading-[1.05] tracking-tighter"
            >
              Peace of Mind, <br />
              <span className="text-gradient">One Badge Away.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              The tamper-resistant safety badge that keeps your child safe and connected, everywhere they go. Aerospace-grade security for your most precious cargo.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2 group">
                Pre-Order Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95">
                Watch Reveal
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
              {/* Glowing Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border-2 border-dashed border-primary/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border border-secondary/30 rounded-full"
              />
              
              <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,58,138,0.3)] border-8 border-white">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsQqdp3pKUWYJcWKcQEK3_gGSFGOrF7xPHlRAsWXtc6fFTczq0BSSYdIvDf-7jbSQmqckFchalTXbn3HQW_3Z-t6vdsEgqxBJWorl7sEZaU-YSVgYtokTDNAjH50H14J4FB6tmhJGIeHUAAFaUpgZCoEV5uoWuWY3Hc_BVp5RiSd9_wytnt5yLvzCqL8kcflEsONc3f21Z9QjXbqYLTSikawmEna4B2ysZJmDIKvFf-YFCdPIKLFS4ysrgA1aOtVMMn1AVMUE7guM" 
                  alt="SAFENTRA Badge" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Stats */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Status</p>
                  <p className="text-sm font-bold text-slate-900">Active & Secure</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
            >
              Every Second Counts.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 max-w-2xl mx-auto text-lg"
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
      <section id="tech" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight"
              >
                The Smartest Badge <br />
                <span className="text-primary">Ever Built.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 text-xl"
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
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgTc_w9pSfXeVxoSiui7UR9EaIejinPHyjEGB4AeV8sHl5YpEVkGvHv6zDQbRaL6-fXigAhNto2nqC978iUN2CqAT-axOo0mauyv9FT5FIZLD2tCpdaz5WDVW8Rs9T7brDE6wRnpzN5lalndDKuhwN-1tEdMY94ES70vXVDOIDdKEwl2jp5VBa03yw9N6k9mbDZr21hafp1IJgG3PAswKWa3sVoIbV6mpJQ4cCEFlhz42ryhEQmctu-bkkSHqEi1YWdfZCvTOi67g"
              },
              {
                title: "Real-Time GPS",
                desc: "Ultra-wideband and satellite tracking provide accuracy down to 3 feet anywhere globally.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV8mk27fo7bdnwDo5BI0ZMZTE6QQRKBDztdS3aAkTVgQWbKpF7sC3wGGdRFg2Rx1eDreS34Ll5M7_t21ZGRRsiDg2l_PioMem5ASeni4poaPnmGwZrO5x1FZfh03LptapM63zscqHRWHyK5ipm_w8Hg6flYP4tPTINtNTn16dcuxoMkfnMO2-tjSOrKdeqEe4wsEGUMkULq-i2WGQ90mnsfUuuoXY9Ur1kZXOyNOHcYzG-Pi_kGDcMEW4hxADBPFrm4I0vx17fA3U"
              },
              {
                title: "Smart Alerts",
                desc: "Instant notifications the moment your child enters or leaves customized geofenced zones.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbYTYqNc1AFSUqmCOX4KCf47RpVVVRyVMbvYJZIL6CkO1362bq5qDHTbdjG3k_pN_EOd4_T_POY1wRYXG4ZiFnykWlh4LGfHWbykbi7eJq0eSrzlfjC2qFhAauVrKoQpLZB2MXJoSZUBhOsKOjH5POUQNY_JKNgy3J4Qh9fSsCslcMeD7XANXhMur77BXymzmgReUsBSkY5HFdu12tktMCvQHBSBWN_q0T9VC520uYbcQrO6INpkJwoxClv1S34RgpJc-fyRtnEbY"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-4 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-700 group"
              >
                <div className="rounded-[2.5rem] aspect-square mb-8 overflow-hidden bg-slate-100">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                </div>
                <div className="px-6 pb-8">
                  <h4 className="text-2xl font-bold mb-3 text-slate-900">{item.title}</h4>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-xl"
            >
              Safety made simple for busy parents. Three steps to peace of mind.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <Step 
              number={1}
              title="Attach Securely"
              description="Snap the badge onto clothing or a backpack using our guardian-only lock mechanism."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuAY1OuzpUPkDKoOGw_XqMRh0XILECYB7jS0tJQDCyJh9wdaCFbb1-3c1hICRrWILmnaoRMzBJNE3ikHNVfh3Jv6-1vGykp-ruHXb7JU3cbINPhdy5mbszBbHvu6_HUOh9Bn-3pH96pNxi5yYrrflLkSgJkFvAF4cEYOyAWlRffwYR0_w7NfN4LBydRxvgQ6qCq-H4CZxbwPnzcFxP9cKdPGNcal7mhid3fsmJvKlDeJ1UfhZYBWacsv2-dmBn9UEwfNFy37mpsZHa8"
              delay={0.1}
            />
            <Step 
              number={2}
              title="Sync App"
              description="Open the Guardian App and pair your new device in seconds with a single tap."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuBKABxeTHfFf8TIMHxz5Qvd_33orHioDcQIAhHeM9Wxp9EviDTnQgV4YYNkqg8_cC_UIgL9L0IFl-B8kte-1XVY45JJ7RYfKMXmXMIg6h_BK6D3Bg1f6TJAKZR1c6eFA85-VtEVPPJIlnTsguR8z32GWSKMpvJHvH3jKOjdxHS7q8KKrXAOJNpWqjTZDveCVY9d_5CSqGxwxrkrBmeulCpn8fVe8Dsz9_peTqz3q2KduLwIm4Cf2oJy67JK1H953dbKFuvPy4T_9wc"
              delay={0.2}
            />
            <Step 
              number={3}
              title="Monitor in Real-Time"
              description="Enjoy the freedom of knowing your child's exact location from anywhere in the world."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDj2VibGJCUmvLkMX0k_uom3PsBV3kN2TuOuRie9KBz_QQD_J89t_6vP9RXVACMvOZHbOcKwrAuPRG4XThCJhm8T6z8wYNfgGFL76ZDIECq6jEOtDIwe9tRWMASpaO54jO_zA00a2RIms02Pm5GeENCTz39_4pS12frclpy1y810VyjT4WPBhOX6Lkij0Yy2ttf_4kQMyzpeHz7GRfVfl_awC8X6A2vzqEabCHwBTCLh1c6j4cMzrIPzSrF41pkgWSxXWt02wLCk3U"
              delay={0.3}
            />
            
            {/* Connector Line */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200 -z-10" />
          </div>
        </div>
      </section>

      {/* Engineering Section */}
      <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1E3A8A_0%,transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKABxeTHfFf8TIMHxz5Qvd_33orHioDcQIAhHeM9Wxp9EviDTnQgV4YYNkqg8_cC_UIgL9L0IFl-B8kte-1XVY45JJ7RYfKMXmXMIg6h_BK6D3Bg1f6TJAKZR1c6eFA85-VtEVPPJIlnTsguR8z32GWSKMpvJHvH3jKOjdxHS7q8KKrXAOJNpWqjTZDveCVY9d_5CSqGxwxrkrBmeulCpn8fVe8Dsz9_peTqz3q2KduLwIm4Cf2oJy67JK1H953dbKFuvPy4T_9wc" 
              alt="Engineering" 
              className="relative w-full h-auto rounded-[3rem] shadow-2xl"
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
              Engineering Perfection for <span className="text-secondary">Ultimate Safety.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
              className="text-slate-400 text-xl leading-relaxed"
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
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-bold text-2xl mb-2">{item.title}</h5>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* App Interface */}
      <section id="app" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
          >
            Your Child's Safety, In Your Pocket.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-xl"
          >
            The Guardian App provides an intuitive, crystal-clear dashboard for your most precious cargo.
          </motion.p>
        </div>

        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-[320px] w-full border-[12px] border-slate-900 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] bg-white overflow-hidden aspect-[9/19]"
          >
            {/* Notch */}
            <div className="absolute top-0 w-full h-8 bg-slate-900 flex justify-center items-end pb-1.5">
              <div className="w-24 h-5 bg-slate-900 rounded-full" />
            </div>

            <div className="p-5 pt-12 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h6 className="font-black text-xl tracking-tighter text-primary">SAFENTRA App</h6>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2rem] flex-grow mb-6 relative overflow-hidden border border-slate-100">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWk8Z_EZAfUVeHxTetb_Hyq0FtdJYggieWJVy685Ffm5nvSfH9Wy2j-VLpFVjo2eUc2OiOV2Aj7R3-klLgm0EsccOyFu2IrIOxzA1sYUqTtj1_8qxzmyYXnDw8RrmR7Rr7TsH3ykYv8AzouU6nLHve1B2Vu1P2EjU-4xOESd0BDostgSDiTazExnaV5xgT0x6NCU28Hwl0CZGTmQmAG2nLb-r9R19V13a9XN52qye_m9Wx2khU0VOrj2wL2t12kfCbUNcl5MGFD-E" 
                  alt="Map" 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg" />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="bg-primary/5 p-4 rounded-2xl flex items-center gap-4 border border-primary/10"
                >
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alert</p>
                    <p className="text-sm font-bold text-slate-900">Leo left School Zone</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-secondary/5 p-4 rounded-2xl flex items-center gap-4 border border-secondary/10"
                >
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Battery className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                    <p className="text-sm font-bold text-slate-900">Battery at 98%</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-32 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-12"
          >
            <Lock className="w-10 h-10" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-slate-900 mb-16"
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
                <h4 className="font-bold text-2xl text-primary">{item.title}</h4>
                <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-white to-transparent rounded-full blur-[150px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gradient-to-tl from-secondary to-transparent rounded-full blur-[150px]" 
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
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
            className="text-2xl text-white/70 mb-16 max-w-2xl mx-auto"
          >
            Be the first to know when we launch. Join over 10,000 parents who trust SAFENTRA for their children's safety.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
          >
            <input 
              className="px-8 py-5 rounded-2xl text-slate-900 w-full sm:max-w-md focus:outline-none focus:ring-4 focus:ring-secondary/50 text-lg font-medium" 
              placeholder="Enter your email" 
              type="email" 
            />
            <button className="bg-secondary text-white px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-[0_20px_50px_rgba(20,184,166,0.4)] transition-all active:scale-95 whitespace-nowrap">
              Join the Waitlist
            </button>
          </motion.div>
          <p className="mt-8 text-sm text-white/40 font-medium">No credit card required. Launching Fall 2024.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="flex items-center gap-2 text-primary">
              <img src="/logo.png" alt="SAFENTRA Logo" className="w-10 h-10 object-contain drop-shadow-md" />
              <span className="text-3xl font-black tracking-tighter">SAFENTRA</span>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed">
              The world's most advanced safety wearable for children. Designed with love in California.
            </p>
          </div>
          
          <div>
            <h6 className="font-bold text-slate-900 text-lg mb-8">Product</h6>
            <ul className="space-y-4 text-slate-500">
              {['How it Works', 'Technology', 'Guardian App', 'Waitlist'].map(item => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-slate-900 text-lg mb-8">Company</h6>
            <ul className="space-y-4 text-slate-500">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-slate-900 text-lg mb-8">Contact</h6>
            <ul className="space-y-6 text-slate-500">
              <li><a href="mailto:support@safentra.com" className="hover:text-primary transition-colors text-lg font-medium">support@safentra.com</a></li>
              <li className="flex gap-4">
                {[Smartphone, Cloud, Lock].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-medium">© 2024 SAFENTRA Inc. All rights reserved.</p>
          <div className="flex gap-10 text-slate-400 font-medium">
            {['Twitter', 'Instagram', 'LinkedIn'].map(item => (
              <a key={item} href="#" className="hover:text-primary transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
