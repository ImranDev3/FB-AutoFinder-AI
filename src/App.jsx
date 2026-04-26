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
  CreditCard,
  Target,
  Layers,
  FileText,
  ExternalLink,
  ShieldAlert,
  Activity,
  LogOut
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { mockGroups } from './data/mockData';
import Analytics from './pages/Analytics';

// --- Shared State Manager ---
const useStore = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

// --- Dashboard Layout Components ---

const Sidebar = ({ plan }) => (
  <aside className="sidebar">
    <div className="logo" style={{ padding: '0 10px', marginBottom: '40px' }}>
      <div style={{ width: '40px', height: '40px', background: 'var(--accent-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--accent-primary)' }}>
        <Zap size={24} color="white" fill="white" />
      </div>
      <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '1px' }}>FB-AUTO<span style={{ color: 'var(--accent-primary)' }}>PRO</span></span>
    </div>
    
    <nav>
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <LayoutDashboard size={20} /> <span>Dashboard</span>
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <BarChart2 size={20} /> <span>Analytics</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <History size={20} /> <span>Activity Log</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <SettingsIcon size={20} /> <span>API & Profile</span>
      </NavLink>
    </nav>

    <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>PLAN: </span>
        <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: '800' }}>{plan.toUpperCase()}</span>
      </div>
      <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ width: '75%', height: '100%', background: 'var(--accent-gradient)' }} />
      </div>
      <p style={{ fontSize: '10px', marginTop: '10px', color: 'var(--text-muted)' }}>Auto-API Connected</p>
    </div>
  </aside>
);

const Topbar = () => (
  <header className="topbar">
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div className="live-badge" />
      <span style={{ fontSize: '13px', fontWeight: '600', color: '#22c55e' }}>META SCRAPER v5.0 LIVE</span>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
      <div style={{ display: 'flex', gap: '15px', borderRight: '1px solid var(--border-color)', paddingRight: '20px' }}>
        <div style={{ textAlign: 'right' }}>
           <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Scans Remaining</p>
           <p style={{ fontSize: '13px', fontWeight: '800' }}>8,421</p>
        </div>
        <div style={{ textAlign: 'right' }}>
           <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Proxy Health</p>
           <p style={{ fontSize: '13px', fontWeight: '800', color: '#22c55e' }}>100%</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-hover)', padding: '6px 15px', borderRadius: '30px', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
        <div style={{ width: '28px', height: '28px', background: 'var(--accent-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '900' }}>AD</div>
        <span style={{ fontSize: '13px', fontWeight: '700' }}>Admin_Imran</span>
      </div>
    </div>
  </header>
);

// --- Page Components ---

const Dashboard = ({ results, setResults, history, setHistory }) => {
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

  const handleJoin = (groupName) => {
    const url = `https://www.facebook.com/search/groups/?q=${encodeURIComponent(groupName)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
      {/* Welcome Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div className="card" style={{ padding: '40px', background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.1), transparent)' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Intelligence <span style={{ color: 'var(--accent-primary)' }}>Command Center</span></h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Enter keywords to scan Facebook's global database for targeted groups.</p>
          <div className="search-bar-pro" style={{ padding: '10px 10px 10px 20px', borderRadius: '15px' }}>
            <Search size={20} color="var(--text-muted)" />
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} placeholder="Search niches: Paid VPN, Crypto, Marketing..." />
            <button onClick={handleSearch} className="glow-btn" style={{ borderRadius: '10px', padding: '10px 25px' }}>SCRAPE NOW</button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
              <Activity size={32} color="var(--accent-primary)" style={{ marginBottom: '10px' }} />
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DATA ACCURACY</p>
              <h2 style={{ fontSize: '28px' }}>99.9%</h2>
           </div>
           <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
              <ShieldCheck size={32} color="#22c55e" style={{ marginBottom: '10px' }} />
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>API SECURITY</p>
              <h2 style={{ fontSize: '28px', color: '#22c55e' }}>ENCRYPTED</h2>
           </div>
        </div>
      </div>

      {/* Results Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
         <h3>Discovery Feed ({results.length})</h3>
         <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { const ws = XLSX.utils.json_to_sheet(results); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Scrape"); XLSX.writeFile(wb, "Report.xlsx"); }} className="export-btn"><Download size={14} /> EXCEL REPORT</button>
         </div>
      </div>

      <div className="results-container">
        {results.map(g => (
          <motion.div key={g.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', marginBottom: '15px', border: '1px solid var(--border-color)' }}>
             <img src={g.image} style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
             <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '17px', fontWeight: '800' }}>{g.name}</h4>
                <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> {g.members}</span>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: g.autoApproval ? '#22c55e' : '#ef4444' }}><Zap size={12} fill="currentColor" /> {g.autoApproval ? 'Auto-Approve' : 'Moderated'}</span>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {g.postFrequency}</span>
                </div>
             </div>
             <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleJoin(g.name)} className="glow-btn" style={{ padding: '8px 20px', fontSize: '13px' }}>JOIN GROUP</button>
                <button onClick={() => setSelectedGroup(g)} className="export-btn" style={{ padding: '8px 15px', fontSize: '13px' }}>ANALYZE</button>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Modals & Overlays */}
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="scanning-overlay">
            <Zap size={64} color="var(--accent-primary)" className="pulse-animation" />
            <h2 style={{ marginTop: '25px', fontSize: '32px' }}>Scraping Meta CDN...</h2>
            <div className="terminal-box" style={{ maxWidth: '600px' }}>
               <div>[INFO] Authenticating Node #72... OK</div>
               <div>[NET] Injecting search query: {searchTerm}</div>
               <div>[META] Parsing encrypted HTML tree... OK</div>
               <div>[DATA] {results.length || 0} groups found in buffer.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedGroup && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedGroup(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="card" style={{ maxWidth: '600px', width: '90%', padding: '40px', border: '1px solid var(--accent-primary)' }} onClick={e => e.stopPropagation()}>
               <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                  <img src={selectedGroup.image} style={{ width: '80px', height: '80px', borderRadius: '15px' }} />
                  <div>
                    <h2 style={{ fontSize: '28px' }}>{selectedGroup.name}</h2>
                    <p style={{ color: 'var(--accent-primary)', fontWeight: '800' }}>{selectedGroup.members} Members • {selectedGroup.location}</p>
                  </div>
               </div>
               <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', marginBottom: '30px' }}>
                  <h4 style={{ marginBottom: '10px' }}>Group DNA & Rules</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedGroup.description || 'This group is an elite community for networking. Our scraper detected high activity and low moderation barriers.'}</p>
               </div>
               <button onClick={() => handleJoin(selectedGroup.name)} className="glow-btn" style={{ width: '100%', padding: '15px', fontSize: '16px' }}>OPEN ORIGINAL GROUP</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SettingsPage = ({ config, setConfig }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
    <h1 style={{ marginBottom: '30px' }}>System <span style={{ color: 'var(--accent-primary)' }}>Configuration</span></h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
       <div className="card" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><User size={20} color="var(--accent-primary)" /> Profile Info</h3>
          <div style={{ marginBottom: '20px' }}>
             <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Display Name</label>
             <input value="Admin_Imran" disabled style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
             <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Account ID</label>
             <input value="UID-8822-PRO" disabled style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '8px', marginTop: '5px' }} />
          </div>
          <button className="export-btn" style={{ width: '100%', color: '#ef4444' }}><LogOut size={16} /> Logout System</button>
       </div>
       
       <div className="card" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><SettingsIcon size={20} color="var(--accent-primary)" /> Scraper Settings</h3>
          <div style={{ marginBottom: '20px' }}>
             <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Global Proxy Node</label>
             <select value={config.proxy} onChange={e => setConfig({...config, proxy: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '8px', color: 'white', marginTop: '5px' }}>
                <option>US-EAST-FAST</option>
                <option>ASIA-BANG-OPT</option>
                <option>EUROPE-SECURE</option>
             </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
             <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Auto-API Status</label>
             <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '8px', fontSize: '13px', fontWeight: '700' }}>DEDICATED API CONNECTED</div>
          </div>
          <button onClick={() => alert('Settings Updated!')} className="glow-btn" style={{ width: '100%' }}>SAVE SETTINGS</button>
       </div>
    </div>
  </motion.div>
);

// --- App Root ---

const App = () => {
  const [results, setResults] = useStore('results', mockGroups);
  const [history, setHistory] = useStore('history', []);
  const [plan, setPlan] = useStore('plan', 'enterprise');
  const [config, setConfig] = useStore('config', { proxy: 'ASIA-BANG-OPT' });

  return (
    <Router>
      <div className="app-container">
        <Sidebar plan={plan} />
        <main className="main-content">
          <Topbar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard results={results} setResults={setResults} history={history} setHistory={setHistory} />} />
              <Route path="/analytics" element={<Analytics results={results} />} />
              <Route path="/history" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card"><h2>Activity Logs</h2><table style={{ width: '100%', marginTop: '20px' }}><thead><tr align="left"><th>Term</th><th>Date</th><th>Results</th></tr></thead><tbody>{history.map((h, i) => <tr key={i}><td>{h.term}</td><td>{h.date}</td><td>{h.count}</td></tr>)}</tbody></table></motion.div>} />
              <Route path="/settings" element={<SettingsPage config={config} setConfig={setConfig} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
