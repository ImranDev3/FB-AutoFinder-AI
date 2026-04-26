import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, LayoutDashboard, BarChart2, Bell, User, Zap, Clock, Download, History, Settings as SettingsIcon, Users, Globe, Target, Activity
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { mockGroups } from './data/mockData';
import Analytics from './pages/Analytics';

// --- Hard Reset: Clear all possible corruption ---
localStorage.clear();

const useStore = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) setValue(JSON.parse(saved));
    } catch (e) { console.error(e); }
  }, []);
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

const App = () => {
  const [results, setResults] = useState(mockGroups);
  const [history, setHistory] = useStore('history', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsScanning(true);
    await new Promise(r => setTimeout(r, 1000));
    const filtered = mockGroups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setResults(filtered.length ? filtered : mockGroups);
    setHistory([{ term: searchTerm, date: new Date().toLocaleTimeString() }, ...history]);
    setIsScanning(false);
  };

  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', minHeight: '100vh', background: '#07090d', color: 'white' }}>
        <aside style={{ width: '280px', background: '#10141d', padding: '30px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#00f2ff', marginBottom: '40px' }}>FB-AUTO FREE</div>
          <nav>
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px', color: '#94a3b8', textDecoration: 'none' }}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            <NavLink to="/analytics" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px', color: '#94a3b8', textDecoration: 'none' }}>
              <BarChart2 size={20} /> Analytics
            </NavLink>
          </nav>
        </aside>

        <main style={{ flex: 1, padding: '40px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', background: '#00f2ff', borderRadius: '50%' }} />
              <span>SCRAPER ONLINE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
               <Globe size={18} />
               <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg, #00f2ff, #7000ff)', borderRadius: '50%' }} />
            </div>
          </header>

          <Routes>
            <Route path="/" element={
              <div>
                <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
                   <h1>Command Center</h1>
                   <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                      <input 
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSearch()}
                        placeholder="Search niches..." 
                        style={{ flex: 1, background: '#10141d', border: '1px solid rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px', color: 'white' }} 
                      />
                      <button onClick={handleSearch} className="glow-btn">SCAN</button>
                   </div>
                </div>

                <div style={{ display: 'grid', gap: '15px' }}>
                  {results.map(g => (
                    <div key={g.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                       <img src={g.image} style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
                       <div style={{ flex: 1 }}>
                          <h3>{g.name}</h3>
                          <p style={{ color: '#94a3b8', fontSize: '13px' }}>{g.members} members • {g.location}</p>
                       </div>
                       <button onClick={() => window.open(`https://facebook.com/search/groups/?q=${encodeURIComponent(g.name)}`, '_blank')} className="glow-btn">JOIN</button>
                    </div>
                  ))}
                </div>
              </div>
            } />
            <Route path="/analytics" element={<Analytics results={results} />} />
          </Routes>
        </main>
      </div>

      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="scanning-overlay">
            <Zap size={60} color="#00f2ff" className="pulse-animation" />
            <h2 style={{ marginTop: '20px' }}>Syncing Meta Nodes...</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
};

export default App;
