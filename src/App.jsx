import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
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
  FileText
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { mockGroups } from './data/mockData';
import Analytics from './pages/Analytics';

// --- Enterprise Components ---

const Sidebar = () => (
  <aside className="sidebar">
    <div className="logo">
      <Zap size={28} fill="currentColor" />
      <span>MetaVision <span style={{ color: 'var(--accent-primary)', fontSize: '12px', verticalAlign: 'top' }}>ENTERPRISE</span></span>
    </div>
    <nav style={{ marginTop: '30px' }}>
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <LayoutDashboard size={20} />
        <span>Intelligence</span>
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <BarChart2 size={20} />
        <span>Market Insights</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <History size={20} />
        <span>Data History</span>
      </NavLink>
      <NavLink to="/pricing" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <CreditCard size={20} />
        <span>Subscriptions</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <SettingsIcon size={20} />
        <span>Core Settings</span>
      </NavLink>
    </nav>
    <div style={{ marginTop: 'auto', padding: '20px', background: 'linear-gradient(rgba(0, 242, 255, 0.1), transparent)', borderRadius: '15px', border: '1px solid rgba(0, 242, 255, 0.2)' }}>
      <p style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: '800', marginBottom: '8px' }}>CORPORATE PLAN</p>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' }}>
        <div style={{ width: '85%', height: '100%', background: 'var(--accent-primary)' }} />
      </div>
      <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>8,500 / 10,000 API Credits Used</p>
    </div>
  </aside>
);

const Topbar = () => (
  <header className="topbar">
    <div style={{ position: 'relative' }}>
      <h2 style={{ fontSize: '22px', fontWeight: '700' }}>Global <span style={{ color: 'var(--accent-primary)' }}>Intelligence</span> Node</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Syncing with Meta Global Edge Servers...</p>
    </div>
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-hover)', padding: '8px 15px', borderRadius: '10px', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
        <Globe size={16} color="var(--accent-primary)" />
        <span style={{ fontSize: '12px', fontWeight: '600' }}>English (US)</span>
      </div>
      <div style={{ position: 'relative', cursor: 'pointer' }}>
        <Bell size={20} color="var(--text-muted)" />
        <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid var(--bg-surface)' }}></span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-hover)', padding: '6px 12px', borderRadius: '30px', cursor: 'pointer', border: '1px solid var(--accent-primary)' }}>
        <div style={{ width: '28px', height: '28px', background: 'var(--accent-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800' }}>IH</div>
        <span style={{ fontWeight: '600', fontSize: '14px' }}>Imran Dev</span>
      </div>
    </div>
  </header>
);

const PricingPage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-content">
    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
      <h1 style={{ fontSize: '40px', marginBottom: '15px' }}>Enterprise <span style={{ color: 'var(--accent-primary)' }}>Scalability</span></h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Choose a plan that fits your business needs. Upgrade anytime to unlock global data nodes.</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', maxWidth: '1100px', margin: '0 auto' }}>
      {[
        { name: 'Starter', price: '$49', features: ['1,000 Scans/mo', 'Excel Export', 'Email Support', 'Basic Analytics'], pro: false },
        { name: 'Professional', price: '$149', features: ['10,000 Scans/mo', 'JSON/CSV Export', 'Priority API Access', 'Advanced Heatmaps'], pro: true },
        { name: 'Enterprise', price: '$499', features: ['Unlimited Scans', 'Custom PDF Reports', 'Dedicated Account Manager', 'White-labeling'], pro: false }
      ].map((plan, i) => (
        <div key={i} className="card" style={{ textAlign: 'center', padding: '40px', position: 'relative', border: plan.pro ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)' }}>
          {plan.pro && <span style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-gradient)', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>MOST POPULAR</span>}
          <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{plan.name}</h3>
          <h2 style={{ fontSize: '48px', marginBottom: '25px' }}>{plan.price}<span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/mo</span></h2>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px', textAlign: 'left' }}>
            {plan.features.map((f, idx) => (
              <li key={idx} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                <CheckCircle size={16} color="#22c55e" /> {f}
              </li>
            ))}
          </ul>
          <button className={plan.pro ? 'glow-btn' : 'export-btn'} style={{ width: '100%', padding: '15px' }}>{plan.name === 'Starter' ? 'Current Plan' : 'Upgrade Now'}</button>
        </div>
      ))}
    </div>
  </motion.div>
);

// --- Main App Logic ---

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('lastSearch') || '');
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('lastResults');
    return saved ? JSON.parse(saved) : mockGroups;
  });
  const [filter, setFilter] = useState(() => localStorage.getItem('lastFilter') || 'All');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => parseInt(localStorage.getItem('lastPage')) || 1);
  const itemsPerPage = 10;
  const [terminalLogs, setTerminalLogs] = useState([]);

  useEffect(() => {
    localStorage.setItem('lastResults', JSON.stringify(results));
    localStorage.setItem('lastSearch', searchTerm);
    localStorage.setItem('lastFilter', filter);
    localStorage.setItem('lastPage', currentPage.toString());
  }, [results, searchTerm, filter, currentPage]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(results);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MetaVision_Export");
    XLSX.writeFile(wb, `MetaVision_Data_${searchTerm || 'Global'}.xlsx`);
  };

  const handleSearch = async (term = searchTerm) => {
    if (!term.trim()) return;
    setIsScanning(true);
    setTerminalLogs([]);
    setCurrentPage(1);
    
    const logs = [
      `[AUTH] Authenticating Intelligence Node... SUCCESS`,
      `[NET] Connecting to Meta Backbone (Edge Location: US-WEST)...`,
      `[SCAN] Initializing Deep Packet Inspection for query: ${term}`,
      `[INFO] Parsing Group permission nodes... 145 items found`,
      `[DB] Indexing discovered entities... OK`
    ];

    for (let i = 0; i < 6; i++) {
      setScanStatus(['Initializing...', 'Proxy Handshake...', 'Bypassing WAF...', 'Parsing Data...', 'Applying Filters...', 'Syncing...'][i]);
      if (logs[i]) setTerminalLogs(p => [...p, logs[i]]);
      await new Promise(r => setTimeout(r, 600));
    }
    
    let filtered = mockGroups.filter(g => g.name.toLowerCase().includes(term.toLowerCase()));
    setResults(filtered.length ? filtered : mockGroups);
    setIsScanning(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="scanning-overlay">
             <div style={{ position: 'relative' }}>
                <Zap size={80} color="var(--accent-primary)" className="pulse-animation" />
                <div style={{ position: 'absolute', inset: -20, border: '2px solid var(--accent-primary)', borderRadius: '50%', opacity: 0.2, animation: 'pulse 2s infinite' }} />
             </div>
             <h2 style={{ fontSize: '36px', marginTop: '30px', letterSpacing: '2px' }}>{scanStatus}</h2>
             <div className="terminal-box">
                {terminalLogs.map((l, i) => <div key={i}>{l}</div>)}
                <div style={{ color: 'var(--accent-primary)' }}>>>> READY</div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px', marginBottom: '40px' }}>
         <div className="card" style={{ padding: '60px 40px', background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.1), transparent)' }}>
            <h1 style={{ fontSize: '42px', marginBottom: '20px' }}>Data <span style={{ color: 'var(--accent-primary)' }}>Intelligence</span> Explorer</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '18px' }}>Real-time extraction of Facebook group metrics and permission nodes.</p>
            <div className="search-bar-pro">
              <Search size={22} color="var(--text-muted)" />
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} placeholder="Query Intelligence Database..." />
              <button onClick={() => handleSearch()} className="glow-btn">SCRAPE LIVE</button>
            </div>
         </div>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '25px', textAlign: 'center' }}>
               <Target size={32} color="var(--accent-primary)" style={{ marginBottom: '10px' }} />
               <h4>Accuracy Rate</h4>
               <h2 style={{ color: '#22c55e' }}>99.8%</h2>
            </div>
            <div className="card" style={{ padding: '25px', textAlign: 'center' }}>
               <Layers size={32} color="var(--accent-primary)" style={{ marginBottom: '10px' }} />
               <h4>Active Nodes</h4>
               <h2>1.2M</h2>
            </div>
         </div>
      </div>

      <div className="results-header">
        <div style={{ display: 'flex', gap: '15px' }}>
           <button onClick={exportToExcel} className="export-btn"><FileText size={18} /> Professional Report</button>
        </div>
        <div className="filter-group">
          {['All', 'Auto-Approval', 'High Activity'].map(f => (
            <button key={f} onClick={() => { setFilter(f); setCurrentPage(1); }} className={`filter-btn ${filter === f ? 'active' : ''}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="results-container">
        {results.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage).map(g => (
          <div key={g.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', marginBottom: '15px', border: '1px solid var(--border-color)' }}>
             <img src={g.image} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
             <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700' }}>{g.name}</h4>
                <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '5px' }}>
                   <span>{g.members} members</span>
                   <span style={{ color: g.autoApproval ? '#22c55e' : '#ef4444' }}>{g.autoApproval ? 'AUTO-APPROVE' : 'MODERATED'}</span>
                   <span>{g.location}</span>
                </div>
             </div>
             <button onClick={() => window.open(`https://www.facebook.com/search/groups/?q=${encodeURIComponent(g.name)}`, '_blank')} className="export-btn">JOIN</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Topbar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/history" element={<div className="card"><h2>Scan History</h2><p>Enterprise data logging active.</p></div>} />
              <Route path="/settings" element={<div className="card"><h2>Settings</h2><p>System configuration panel.</p></div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
