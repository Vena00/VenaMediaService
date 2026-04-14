/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Music2, 
  AppWindow, 
  MoreHorizontal, 
  Youtube, 
  Send, 
  Facebook, 
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Zap,
  Bot,
  X,
  Loader2,
  User
} from 'lucide-react';
import { askGemini } from './services/geminiService';

type Category = 'Instagram' | 'TikTok' | 'Facebook' | 'YouTube' | 'Premium Apps' | 'Lainnya';

interface ServiceItem {
  name: string;
  price: string;
}

interface ServiceCategory {
  title: string;
  icon: ReactNode;
  items: ServiceItem[];
  waText: string;
}

const SERVICES: Record<Category, ServiceCategory[]> = {
  'Instagram': [
    {
      title: 'IG FOLLOWERS UMUM',
      icon: <Instagram className="w-6 h-6 text-pink-500" />,
      waText: 'Halo VenaMedia, saya mau order Followers Instagram Umum',
      items: [
        { name: '100 Fol', price: 'Rp7.000' },
        { name: '500 Fol', price: 'Rp35.000' },
        { name: '1.000 Fol', price: 'Rp65.000' },
      ]
    },
    {
      title: 'IG FOLLOWERS INDO',
      icon: <Instagram className="w-6 h-6 text-red-500" />,
      waText: 'Halo VenaMedia, saya mau order Followers Instagram Indonesia',
      items: [
        { name: '100 Fol', price: 'Rp10.000' },
        { name: '500 Fol', price: 'Rp45.000' },
        { name: '1.000 Fol', price: 'Rp85.000' },
      ]
    },
    {
      title: 'INSTAGRAM LIKES',
      icon: <Instagram className="w-6 h-6 text-pink-400" />,
      waText: 'Halo VenaMedia, saya mau order Likes Instagram',
      items: [
        { name: '100 Like', price: 'Rp3.000' },
        { name: '500 Like', price: 'Rp13.000' },
        { name: '1.000 Like', price: 'Rp25.000' },
      ]
    },
    {
      title: 'INSTAGRAM VIEWS',
      icon: <Instagram className="w-6 h-6 text-purple-400" />,
      waText: 'Halo VenaMedia, saya mau order Views Instagram',
      items: [
        { name: '1.000 Views', price: 'Rp1.500' },
        { name: '5.000 Views', price: 'Rp6.000' },
        { name: '10.000 Views', price: 'Rp12.000' },
      ]
    }
  ],
  'TikTok': [
    {
      title: 'TIKTOK FOLLOWERS',
      icon: <Music2 className="w-6 h-6 text-cyan-400" />,
      waText: 'Halo VenaMedia, saya mau order Followers TikTok',
      items: [
        { name: '100 Fol', price: 'Rp9.000' },
        { name: '500 Fol', price: 'Rp43.000' },
        { name: '1.000 Fol', price: 'Rp75.000' },
      ]
    },
    {
      title: 'TIKTOK LIKES',
      icon: <Music2 className="w-6 h-6 text-pink-500" />,
      waText: 'Halo VenaMedia, saya mau order Likes TikTok',
      items: [
        { name: '100 Like', price: 'Rp2.000' },
        { name: '500 Like', price: 'Rp8.000' },
        { name: '1.000 Like', price: 'Rp15.000' },
      ]
    },
    {
      title: 'TIKTOK VIEWS',
      icon: <Music2 className="w-6 h-6 text-white" />,
      waText: 'Halo VenaMedia, saya mau order Views TikTok',
      items: [
        { name: '1.000 Views', price: 'Rp1.000' },
        { name: '5.000 Views', price: 'Rp5.000' },
        { name: '10.000 Views', price: 'Rp10.000' },
      ]
    },
    {
      title: 'TIKTOK SHARES',
      icon: <Send className="w-6 h-6 text-accent" />,
      waText: 'Halo VenaMedia, saya mau order Shares TikTok',
      items: [
        { name: '100 Share', price: 'Rp2.000' },
        { name: '500 Share', price: 'Rp8.000' },
        { name: '1.000 Share', price: 'Rp15.000' },
      ]
    }
  ],
  'Facebook': [
    {
      title: 'FB FOLLOWERS',
      icon: <Facebook className="w-6 h-6 text-blue-600" />,
      waText: 'Halo VenaMedia, saya mau order Followers Facebook',
      items: [
        { name: '100 Fol', price: 'Rp9.000' },
        { name: '200 Fol', price: 'Rp18.000' },
        { name: '500 Fol', price: 'Rp43.000' },
        { name: '1.000 Fol', price: 'Rp75.000' },
      ]
    },
    {
      title: 'FB LIKES',
      icon: <Facebook className="w-6 h-6 text-blue-500" />,
      waText: 'Halo VenaMedia, saya mau order Likes Facebook',
      items: [
        { name: '100 Like', price: 'Rp2.000' },
        { name: '500 Like', price: 'Rp10.000' },
        { name: '1.000 Like', price: 'Rp15.000' },
      ]
    },
    {
      title: 'FB VIEWS',
      icon: <Facebook className="w-6 h-6 text-blue-400" />,
      waText: 'Halo VenaMedia, saya mau order Views Facebook',
      items: [
        { name: '1.000 Views', price: 'Rp1.000' },
        { name: '10.000 Views', price: 'Rp10.000' },
      ]
    }
  ],
  'YouTube': [
    {
      title: 'YOUTUBE MEMBERS',
      icon: <Youtube className="w-6 h-6 text-red-600" />,
      waText: 'Halo VenaMedia, saya mau order YouTube Members',
      items: [
        { name: '100 Member', price: 'Rp15.000' },
        { name: '500 Member', price: 'Rp65.000' },
        { name: '1.000 Member', price: 'Rp120.000' },
      ]
    },
    {
      title: 'YOUTUBE VIEWS',
      icon: <Youtube className="w-6 h-6 text-red-500" />,
      waText: 'Halo VenaMedia, saya mau order YouTube Views',
      items: [
        { name: '1.000 Views', price: 'Rp15.000' },
        { name: '5.000 Views', price: 'Rp70.000' },
        { name: '10.000 Views', price: 'Rp130.000' },
      ]
    }
  ],
  'Premium Apps': [
    {
      title: 'APLIKASI PREMIUM',
      icon: <AppWindow className="w-6 h-6 text-yellow-500" />,
      waText: 'Halo VenaMedia, saya mau order App Premium',
      items: [
        { name: 'Youtube Prem', price: 'Rp10.000' },
        { name: 'Canva Pro', price: 'Rp5.000' },
        { name: 'Netflix Sharing', price: 'Rp35.000' },
        { name: 'Gemini AI Pro', price: 'Rp17.000' },
        { name: 'Spotify Student', price: 'Rp10.000' },
        { name: 'Disney+ Sharing', price: 'Rp26.000' },
      ]
    }
  ],
  'Lainnya': [
    {
      title: 'ROBLOX SERVICES',
      icon: <Smartphone className="w-6 h-6 text-red-600" />,
      waText: 'Halo VenaMedia, saya mau order Roblox Services',
      items: [
        { name: '100 Followers', price: 'Rp15.000' },
        { name: '100 Friender', price: 'Rp8.000' },
      ]
    },
    {
      title: 'TELEGRAM MEMBERS',
      icon: <Send className="w-6 h-6 text-sky-500" />,
      waText: 'Halo VenaMedia, saya mau order Telegram Members',
      items: [
        { name: '100 Member', price: 'Rp7.000' },
        { name: '500 Member', price: 'Rp25.000' },
        { name: '1.000 Member', price: 'Rp50.000' },
      ]
    },
    {
      title: 'WHATSAPP CHANNEL',
      icon: <MessageCircle className="w-6 h-6 text-green-500" />,
      waText: 'Halo VenaMedia, saya mau order WhatsApp Channel Members',
      items: [
        { name: '100 Member', price: 'Rp8.000' },
        { name: '500 Member', price: 'Rp35.000' },
        { name: '1.000 Member', price: 'Rp70.000' },
      ]
    }
  ]
};

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Category>('Instagram');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Halo! Saya asisten AI Vena Media. Ada yang bisa saya bantu terkait optimasi media sosial atau rekomendasi aplikasi premium?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = ['Instagram', 'TikTok', 'Facebook', 'YouTube', 'Premium Apps', 'Lainnya'];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const aiResponse = await askGemini(userMessage);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse || 'Maaf, saya tidak bisa menjawab itu sekarang.' }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark text-slate-50 font-sans selection:bg-accent/30">
      {/* Header Section */}
      <header className="relative h-[400px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-40 scale-110"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase mb-2">
            <Zap className="w-3 h-3" />
            Fast & Reliable Service
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-2xl">
            VENA MEDIA SERVICE
          </h1>
          <p className="text-accent text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Social Media Optimization & Premium Apps
          </p>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`
                px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border
                ${activeTab === cat 
                  ? 'bg-accent text-dark border-accent shadow-[0_0_20px_rgba(56,189,248,0.3)]' 
                  : 'bg-card-bg text-slate-400 border-slate-700 hover:border-accent/50 hover:text-slate-200'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES[activeTab].map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card-bg border border-slate-800 rounded-2xl p-6 hover:border-accent/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <div className="p-2 rounded-lg bg-slate-900/50">
                    {service.icon}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {service.items.map((item) => (
                    <div key={item.name} className="flex flex-col gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-accent/20 transition-all">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 font-medium flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          {item.name}
                        </span>
                        <span className="font-mono font-bold text-accent text-sm">
                          {item.price}
                        </span>
                      </div>
                      <a
                        href={`https://wa.me/6285829750779?text=${encodeURIComponent(`${service.waText}: ${item.name} (${item.price})`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 bg-slate-800 hover:bg-accent hover:text-dark text-slate-300 text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all"
                      >
                        Order Now
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/6285829750779?text=${encodeURIComponent(`Halo VenaMedia, saya ingin bertanya tentang layanan ${service.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900/50 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 font-bold rounded-xl transition-all text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasi Lainnya
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* AI Assistant Section */}
        <section className="mt-24 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Bot className="w-32 h-32" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-white">Butuh Konsultasi Strategi?</h2>
            <p className="text-slate-400">
              Tanyakan pada AI Assistant kami tentang cara optimasi media sosial Anda atau rekomendasi aplikasi premium terbaik untuk kebutuhan Anda.
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-accent/20"
            >
              <Bot className="w-5 h-5" />
              Chat dengan AI Pro
            </button>
          </div>
        </section>

        {/* Trust Badges */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-slate-800 pt-16">
          <div className="space-y-2">
            <div className="text-accent font-bold text-2xl">10k+</div>
            <div className="text-slate-500 text-sm uppercase tracking-widest">Orders Done</div>
          </div>
          <div className="space-y-2">
            <div className="text-accent font-bold text-2xl">24/7</div>
            <div className="text-slate-500 text-sm uppercase tracking-widest">Support</div>
          </div>
          <div className="space-y-2">
            <div className="text-accent font-bold text-2xl">100%</div>
            <div className="text-slate-500 text-sm uppercase tracking-widest">Safe & Secure</div>
          </div>
          <div className="space-y-2">
            <div className="text-accent font-bold text-2xl">Fast</div>
            <div className="text-slate-500 text-sm uppercase tracking-widest">Delivery</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-800 bg-slate-950/50 py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-bold text-white">VENA MEDIA SERVICE</h2>
            <p className="text-slate-500 max-w-xs">
              Your trusted partner for social media growth and premium digital subscriptions.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6">
              <a 
                href="https://instagram.com/ketutvena" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-medium">@ketutvena</span>
              </a>
              <a 
                href="https://wa.me/6285829750779" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-green-500 transition-colors"
              >
                <Smartphone className="w-5 h-5" />
                <span className="font-medium">0858 2975 0779</span>
              </a>
            </div>
            <p className="text-slate-600 text-sm">
              &copy; {new Date().getFullYear()} Vena Media Service. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-card-bg border border-slate-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Vena AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-accent text-dark' : 'bg-slate-800 text-accent'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-accent text-dark font-medium rounded-tr-none' 
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-accent flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-slate-900 p-3 rounded-2xl rounded-tl-none border border-slate-800">
                      <Loader2 className="w-4 h-4 animate-spin text-accent" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tanyakan sesuatu..."
                  className="w-full bg-dark border border-slate-800 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button (when closed) */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-accent text-dark rounded-full shadow-2xl shadow-accent/20 flex items-center justify-center hover:scale-110 transition-transform z-40 group"
          >
            <Bot className="w-8 h-8 group-hover:animate-bounce" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-dark rounded-full" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
