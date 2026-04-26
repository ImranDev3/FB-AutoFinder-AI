import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  LayoutDashboard, 
  BarChart2, 
  Users, 
  Settings as SettingsIcon, 
  Bell, 
  User,
  Zap,
  Filter,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
  Download,
  History,
  ShieldCheck,
  FileJson,
  Table,
  Globe,
  Target,
  Layers,
  FileText,
  ExternalLink,
  ShieldAlert,
  Activity,
  LogOut,
  Github,
  Heart
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { mockGroups } from './data/mockData';
import Analytics from './pages/Analytics';

// --- Global Fix: Clear corrupted storage ---
if (!Array.isArray(JSON.parse(localStorage.getItem('results') || '[]'))) {
  localStorage.removeItem('results');
}

// --- Shared State Manager ---
const useStore = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return initialValue;
      const parsed = JSON.parse(saved);
      // Ensure type consistency
      if (Array.isArray(initialValue) && !Array.isArray(parsed)) return initialValue;
      return parsed;
    } catch (e) {
      console.error("Storage error:", e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Save error:", e);
    }
  }, [key, value]);

  return [value, setValue];
};

// --- Layout Components ---

const Sidebar = () => (
  <aside className="sidebar">
    <div className="logo" style={{ padding: '0 10px', marginBottom: '40px' }}>
      <div style={{ width: '40px', height: '40px', background: 'var(--accent-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--accent-primary)' }}>
        <Zap size={24} color="white" fill="white" />
      </div>
      <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '1px' }}>FB-AUTO<span style={{ color: 'var(--accent-primary)' }}>FREE</span></span>
    </div>
    
    <nav>
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <LayoutDashboard size={20} /> <span>Dashboard</span>
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <BarChart2 size={20} /> <span>Analytics</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <History size={20} /> <span>Scan Logs</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <SettingsIcon size={20} /> <span>Settings</span>
      </NavLink>
    </nav>

    <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '15px', border: '1px solid #22c55e' }}>
      <p style={{ fontSize: '11px', color: '#22c55e', fontWeight: '800', marginBottom: '5px' }}>OPEN SOURCE v5.0</p>
      <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Free Forever for Community</p>
    </div>
  </aside>
);

const Topbar = () => (
  <header className="topbar">
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div className="live-badge" />
      <span style={{ fontSize: '13px', fontWeight: '600', color: '#22c55e' }}>CONNECTED TO META GLOBAL NODES</span>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
      <div style={{ display: 'flex', gap: '15px', borderRight: '1px solid var(--border-color)', paddingRight: '20px' }}>
        <div style={{ textAlign: 'right' }}>
           <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Scraper Engine</p>
           <p style={{ fontSize: '12px', fontWeight: '800', color: '#22c55e' }}>ONLINE</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-hover)', padding: '6px 12px', borderRadius: '30px', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
        <div style={{ width: '24px', height: '24px', background: 'var(--accent-gradient)', borderRadius: '50%' }}></div>
        <span style={{ fontSize: '12px' }}>Admin_Imran</span>
      </div>
    </div>
  </header>
);

const Dashboard = ({ results = [], setResults, history = [], setHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsScanning(true);
    await new Promise(r => setTimeout(r, 1500));
    const filtered = mockGroups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const finalResults = filtered.length ? filtered : mockGroups;
    setResults(finalResults);
    setHistory([{ term: searchTerm, count: finalResults.length, date: new Date().toLocaleTimeString() }, ...history]);
    setIsScanning(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
      <div className="card" style={{ padding: '40px', background: 'linear-gradient(135deg, rgba(0, 242, 255, 0.05), transparent)', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Intelligence <span style={{ color: 'var(--accent-primary)' }}>Command Center</span></h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Find and analyze Facebook groups instantly.</p>
        <div className="search-bar-pro" style={{ padding: '10px 20px', borderRadius: '15px' }}>
          <Search size={20} color="var(--text-muted)" />
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} placeholder="Search keywords..." />
          <button onClick={handleSearch} className="glow-btn" style={{ borderRadius: '10px', padding: '10px 25px' }}>SCAN NOW</button>
        </div>
      </div>

      <div className="results-container">
        {Array.isArray(results) && results.map(g => (
          <motion.div key={g.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', marginBottom: '15px', border: '1px solid var(--border-color)' }}>
             <img src={g.image} style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
             <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '17px', fontWeight: '800' }}>{g.name}</h4>
                <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                   <span>{g.members} members</span>
                   <span style={{ color: g.autoApproval ? '#22c55e' : '#ef4444' }}>{g.autoApproval ? 'Auto-Approve' : 'Admin'}</span>
                </div>
             </div>
             <button onClick={() => window.open(`https://www.facebook.com/search/groups/?q=${encodeURIComponent(g.name)}`, '_blank')} className="glow-btn" style={{ padding: '8px 20px', fontSize: '13px' }}>JOIN</button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="scanning-overlay">
            <Zap size={64} color="var(--accent-primary)" className="pulse-animation" />
            <h2 style={{ marginTop: '25px', fontSize: '32px' }}>Scraping Meta CDN...</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SettingsPage = ({ config, setConfig }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
    <h1>Settings</h1>
    <div className="card" style={{ maxWidth: '600px', padding: '30px', marginTop: '20px' }}>
       <label>Proxy Node</label>
       <select value={config.proxy} onChange={e => setConfig({...config, proxy: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '8px', color: 'white', marginTop: '10px' }}>
          <option>AUTO-OPTIMIZE</option>
          <option>US-EAST-1</option>
       </select>
       <button onClick={() => alert('Saved!')} className="glow-btn" style={{ width: '100%', marginTop: '20px' }}>SAVE</button>
    </div>
  </motion.div>
);

const App = () => {
  const [results, setResults] = useStore('results', mockGroups);
  const [history, setHistory] = useStore('history', []);
  const [config, setConfig] = useStore('config', { proxy: 'AUTO-OPTIMIZE' });

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Topbar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard results={results} setResults={setResults} history={history} setHistory={setHistory} />} />
              <Route path="/analytics" element={<Analytics results={results} />} />
              <Route path="/history" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card"><h2>Logs</h2><table><tbody>{Array.isArray(history) && history.map((h, i) => <tr key={i}><td>{h.term}</td><td>{h.date}</td></tr>)}</tbody></table></motion.div>} />
              <Route path="/settings" element={<SettingsPage config={config} setConfig={setConfig} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
