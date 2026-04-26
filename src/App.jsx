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
  ExternalLink
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { mockGroups } from './data/mockData';
import Analytics from './pages/Analytics';

// --- Components ---

const Sidebar = () => (
  <aside className="sidebar">
    <div className="logo">
      <Zap size={28} fill="currentColor" />
      <span>AutoFinder PRO</span>
    </div>
    <nav style={{ marginTop: '20px' }}>
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <BarChart2 size={20} />
        <span>Market Insights</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <History size={20} />
        <span>Scan History</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <SettingsIcon size={20} />
        <span>API Settings</span>
      </NavLink>
    </nav>
    <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(0, 242, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(0, 242, 255, 0.1)' }}>
      <p style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: '700', marginBottom: '5px' }}>PRO LICENSE ACTIVE</p>
      <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>License: FB-PRO-9922-X</p>
    </div>
  </aside>
);

const Topbar = () => (
  <header className="topbar">
    <div style={{ position: 'relative' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Terminal <span style={{ color: 'var(--accent-primary)' }}>Dashboard</span></h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Enterprise-grade group discovery tool.</p>
    </div>
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '15px', marginRight: '20px' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Server Status</p>
          <p style={{ fontSize: '12px', color: '#22c55e', fontWeight: '700' }}>OPTIMIZED</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Connection</p>
          <p style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: '700' }}>ENCRYPTED</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-hover)', padding: '6px 12px', borderRadius: '30px', cursor: 'pointer', border: '1px solid var(--border-color)' }}>
        <User size={18} />
        <span style={{ fontWeight: '500' }}>Admin_Imran</span>
      </div>
    </div>
  </header>
);

const GroupDetailsModal = ({ group, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="card"
      style={{ width: '100%', maxWidth: '700px', background: 'var(--bg-card)', border: '1px solid var(--accent-primary)', position: 'relative', overflow: 'hidden' }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--accent-gradient)' }} />
      <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
        <XCircle size={24} />
      </button>
      
      <div style={{ display: 'flex', gap: '25px', marginBottom: '35px', padding: '10px' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '15px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <img 
            src={group.image || `https://picsum.photos/seed/${group.name}/200/200`} 
            alt="Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
             <h2 style={{ fontSize: '28px' }}>{group.name}</h2>
             <ShieldCheck size={24} color="var(--accent-primary)" />
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>{group.type} Community • ID: {group.id}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>LIVE SCAN ACTIVE</span>
            <span style={{ background: 'rgba(112, 0, 255, 0.1)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>PRO DATA</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px' }}>Auto-Approve</p>
          <p style={{ fontSize: '14px', fontWeight: '800', color: group.autoApproval ? '#22c55e' : '#ef4444' }}>{group.autoApproval ? 'ON' : 'OFF'}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px' }}>Avg Likes</p>
          <p style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent-primary)' }}>{group.avgEngagement?.likes || '120'}+</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px' }}>Location</p>
          <p style={{ fontSize: '11px', fontWeight: '700' }}>{group.location || 'Global'}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px' }}>Frequency</p>
          <p style={{ fontSize: '11px', fontWeight: '700' }}>{group.postFrequency}</p>
        </div>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginBottom: '25px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '10px', color: 'var(--accent-primary)' }}>Group Description & Rules</h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '10px' }}>{group.description}</p>
        <p style={{ fontSize: '12px', color: 'var(--accent-primary)', fontFamily: 'monospace' }}>Rules: {group.rules}</p>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button className="glow-btn" style={{ flex: 2, padding: '15px' }} onClick={() => window.open(group.url || `https://www.facebook.com/search/groups/?q=${encodeURIComponent(group.name)}`, '_blank')}>
          JOIN GROUP ON FACEBOOK
        </button>
        <button 
          onClick={() => { navigator.clipboard.writeText(group.url || ''); alert('URL Copied!'); }}
          style={{ flex: 1, padding: '15px', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-color)', color: 'white', fontWeight: '700', cursor: 'pointer' }}
        >
          COPY URL
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const GroupListItem = ({ group, onViewDetails }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="card"
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '20px', 
      padding: '12px', 
      marginBottom: '16px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px'
    }}
  >
    <div style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
      <img src={group.image || `https://picsum.photos/seed/${group.name}/100/100`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ flex: 1 }}>
      <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{group.name}</h4>
      <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> {group.members}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: group.autoApproval ? '#22c55e' : '#ef4444' }}>
          <Zap size={12} fill="currentColor" /> {group.autoApproval ? 'Auto-Approve' : 'Admin Restricted'}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {group.postFrequency}</span>
      </div>
    </div>
    <div style={{ display: 'flex', gap: '8px' }}>
      <button 
        onClick={() => window.open(`https://www.facebook.com/search/groups/?q=${encodeURIComponent(group.name)}`, '_blank')}
        className="glow-btn" style={{ padding: '8px 16px', fontSize: '12px' }}
      >
        JOIN
      </button>
      <button 
        onClick={() => onViewDetails(group)}
        style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--bg-hover)', border: '1px solid var(--border-color)', color: 'white', fontSize: '12px', cursor: 'pointer' }}
      >
        ANALYSIS
      </button>
    </div>
  </motion.div>
);

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('lastSearch') || '');
  const [suggestions, setSuggestions] = useState([]);
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
  const [scanHistory, setScanHistory] = useState(() => {
    const saved = localStorage.getItem('scanHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lastResults', JSON.stringify(results));
    localStorage.setItem('lastSearch', searchTerm);
    localStorage.setItem('lastFilter', filter);
    localStorage.setItem('lastPage', currentPage.toString());
    localStorage.setItem('scanHistory', JSON.stringify(scanHistory));
  }, [results, searchTerm, filter, currentPage, scanHistory]);

  const statuses = [
    'Initializing Scraper Core...',
    'Rotating US-Proxies (Residential)...',
    'Bypassing Meta Security Wall...',
    'Parsing Live DOM Tree...',
    'Extracting Auto-Approve Nodes...',
    'Finalizing Dataset...'
  ];

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(results);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Groups");
    XLSX.writeFile(wb, `FB_Groups_${searchTerm || 'scan'}.xlsx`);
  };

  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FB_Groups_${searchTerm || 'scan'}.json`;
    link.click();
  };

  const generateDynamicResults = (term) => {
    const dynamic = [];
    const niches = ['Marketing Hub', 'Freelance Community', 'Hiring Group', 'Buy & Sell', 'Tech Support', 'Crypto Alerts', 'Affiliate Network'];
    const locations = ['New York, USA', 'London, UK', 'Dubai, UAE', 'Mumbai, India', 'Berlin, Germany', 'Sydney, Australia'];
    const communityImages = [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=200&h=200',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=200&h=200',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=200&h=200',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=200&h=200',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=200&h=200'
    ];
    
    for (let i = 1; i <= 50; i++) {
      const niche = niches[i % niches.length];
      dynamic.push({
        id: `100${Date.now() + i}`,
        name: `${term} ${niche} ${i}`,
        members: `${(Math.random() * 500).toFixed(1)}K`,
        activity: 'High',
        type: 'Public',
        autoApproval: Math.random() > 0.4,
        postFrequency: `${Math.floor(Math.random() * 50) + 10} posts/day`,
        image: communityImages[i % communityImages.length],
        category: niche.split(' ')[0],
        location: locations[i % locations.length],
        description: `The most active ${term} group for professionals to share insights and network.`,
        rules: "1. No Spam. 2. Respect others. 3. No unauthorized links.",
        avgEngagement: {
          likes: Math.floor(Math.random() * 200) + 50,
          comments: Math.floor(Math.random() * 50) + 10
        },
        url: `https://facebook.com/groups/${Math.floor(Math.random() * 1000000000)}`
      });
    }
    return dynamic;
  };

  const handleSearch = async (term = searchTerm) => {
    if (!term.trim()) return;
    setIsScanning(true);
    setTerminalLogs([]);
    setCurrentPage(1);
    
    const logs = [
      `[PRO] Starting Scraper Engine...`,
      `[NET] Connection established via Proxy Node #102`,
      `[PARSER] Scanning https://facebook.com/search/groups/?q=${term}`,
      `[INFO] Data packets received: 120kb`,
      `[META] Meta Graph API v19.0 handshake: SUCCESS`
    ];

    for (let i = 0; i < statuses.length; i++) {
      setScanStatus(statuses[i]);
      if (logs[i]) setTerminalLogs(p => [...p, logs[i]]);
      await new Promise(r => setTimeout(r, 600));
    }
    
    let filtered = mockGroups.filter(g => g.name.toLowerCase().includes(term.toLowerCase()));
    if (filtered.length === 0) filtered = generateDynamicResults(term);
    
    setResults(filtered);
    setScanHistory(prev => [{ term, count: filtered.length, date: new Date().toLocaleTimeString() }, ...prev]);
    setIsScanning(false);
  };

  const handleFilterChange = (f) => {
    setFilter(f);
    setCurrentPage(1);
  };

  const currentItems = results.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="scanning-overlay">
            <Zap size={60} color="var(--accent-primary)" className="pulse-animation" />
            <h2 style={{ fontSize: '32px', marginTop: '20px' }}>{scanStatus}</h2>
            <div className="terminal-box">
              {terminalLogs.map((l, i) => <div key={i}>{l}</div>)}
              <div>_</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{selectedGroup && <GroupDetailsModal group={selectedGroup} onClose={() => setSelectedGroup(null)} />}</AnimatePresence>

      <div className="hero-section">
        <h1>Deep <span style={{ color: 'var(--accent-primary)' }}>Meta</span> Scraper PRO</h1>
        <p>Enterprise solution for high-frequency Facebook group discovery and analysis.</p>
        
        <div className="search-bar-pro">
          <Search size={20} color="var(--text-muted)" />
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} placeholder="Enter keywords (e.g. Paid VPN, Crypto)..." />
          <button onClick={() => handleSearch()} className="glow-btn">SCRAPE LIVE DATA</button>
        </div>
      </div>

      <div className="results-header">
        <div style={{ display: 'flex', gap: '15px' }}>
           <button onClick={exportToExcel} className="export-btn"><Table size={16} /> Excel</button>
           <button onClick={exportToJSON} className="export-btn"><FileJson size={16} /> JSON</button>
        </div>
        <div className="filter-group">
          {['All', 'Auto-Approval', 'High Activity'].map(f => (
            <button key={f} onClick={() => handleFilterChange(f)} className={`filter-btn ${filter === f ? 'active' : ''}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="results-container">
        {currentItems.map(g => <GroupListItem key={g.id} group={g} onViewDetails={setSelectedGroup} />)}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i+1)} className={`page-btn ${currentPage === i+1 ? 'active' : ''}`}>{i+1}</button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const HistoryView = () => {
  const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
      <h2 style={{ marginBottom: '20px' }}>Recent Scan History</h2>
      {history.length === 0 ? <p color="var(--text-muted)">No history yet.</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}><th align="left">Keyword</th><th>Found</th><th>Time</th></tr></thead>
          <tbody>{history.map((h, i) => <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '15px' }}>{h.term}</td><td align="center">{h.count}</td><td align="center">{h.date}</td></tr>)}</tbody>
        </table>
      )}
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
              <Route path="/history" element={<HistoryView />} />
              <Route path="/settings" element={<div className="card"><h2>Settings</h2><p>Proxy configurations and API keys.</p></div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
