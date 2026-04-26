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
  Image as ImageIcon,
  MoreVertical,
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { mockGroups } from './data/mockData';
import Analytics from './pages/Analytics';

// --- Shared Dynamic Logic ---

const usePersistence = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

// --- Functional Components ---

const PricingPage = ({ currentPlan, setPlan }) => {
  const plans = [
    { id: 'starter', name: 'Starter', price: '$49', features: ['1,000 Scans/mo', 'Excel Export', 'Email Support'] },
    { id: 'pro', name: 'Professional', price: '$149', features: ['10,000 Scans/mo', 'JSON Export', 'Priority API Access'] },
    { id: 'enterprise', name: 'Enterprise', price: '$499', features: ['Unlimited Scans', 'PDF Reports', 'White-labeling'] }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px' }}>Manage <span style={{ color: 'var(--accent-primary)' }}>Subscriptions</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>Scale your intelligence operations effortlessly.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {plans.map(p => (
          <div key={p.id} className={`card ${currentPlan === p.id ? 'active-plan' : ''}`} style={{ padding: '30px', textAlign: 'center', border: currentPlan === p.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)' }}>
            <h3>{p.name}</h3>
            <h2 style={{ fontSize: '42px', margin: '20px 0' }}>{p.price}</h2>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px', textAlign: 'left', fontSize: '14px' }}>
              {p.features.map((f, i) => <li key={i} style={{ marginBottom: '10px' }}><CheckCircle size={14} color="#22c55e" /> {f}</li>)}
            </ul>
            <button 
              onClick={() => { setPlan(p.id); alert(`Plan changed to ${p.name}`); }}
              className={currentPlan === p.id ? 'glow-btn' : 'export-btn'} 
              style={{ width: '100%' }}
            >
              {currentPlan === p.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const HistoryPage = ({ history, clearHistory }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
      <h1>Scan <span style={{ color: 'var(--accent-primary)' }}>Activity</span></h1>
      <button onClick={clearHistory} className="export-btn" style={{ color: '#ef4444' }}>Clear History</button>
    </div>
    <div className="card">
      {history.length === 0 ? <p>No history found.</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}><th align="left">Query</th><th>Results</th><th>Time</th><th>Status</th></tr></thead>
          <tbody>{history.map((h, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '15px' }}>{h.term}</td>
              <td align="center">{h.count}</td>
              <td align="center">{h.date}</td>
              <td align="center"><span style={{ color: '#22c55e' }}>COMPLETED</span></td>
            </tr>
          ))}</tbody>
        </table>
      )}
    </div>
  </motion.div>
);

const SettingsPage = ({ config, setConfig }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
    <h1>System <span style={{ color: 'var(--accent-primary)' }}>Configuration</span></h1>
    <div className="card" style={{ maxWidth: '600px', marginTop: '30px' }}>
       <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Meta API Key</label>
          <input 
            type="password" 
            value={config.apiKey} 
            onChange={e => setConfig({...config, apiKey: e.target.value})}
            style={{ width: '100%', background: 'var(--bg-hover)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '8px', color: 'white' }}
            placeholder="mv_live_xxxxxxx"
          />
       </div>
       <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Global Proxy Node</label>
          <select 
            value={config.proxy} 
            onChange={e => setConfig({...config, proxy: e.target.value})}
            style={{ width: '100%', background: 'var(--bg-hover)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '8px', color: 'white' }}
          >
            <option>US-EAST-1 (High Speed)</option>
            <option>EU-WEST-2 (Privacy Focus)</option>
            <option>AS-SOUTH-1 (Optimized)</option>
          </select>
       </div>
       <button onClick={() => alert('Settings Saved!')} className="glow-btn" style={{ width: '100%' }}>SAVE CHANGES</button>
    </div>
  </motion.div>
);

// --- Main Engine ---

const Home = ({ results, setResults, history, setHistory }) => {
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('lastSearch') || '');
  const [isSearching, setIsSearching] = useState(results.length > 0);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsScanning(true);
    await new Promise(r => setTimeout(r, 1200));
    const filtered = mockGroups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const finalResults = filtered.length ? filtered : mockGroups;
    setResults(finalResults);
    setHistory([{ term: searchTerm, count: finalResults.length, date: new Date().toLocaleTimeString() }, ...history].slice(0, 10));
    setIsSearching(true);
    setIsScanning(false);
    localStorage.setItem('lastSearch', searchTerm);
  };

  const exportData = () => {
    const ws = XLSX.utils.json_to_sheet(results);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MetaSearch_Data");
    XLSX.writeFile(wb, "MetaSearch_Export.xlsx");
  };

  return (
    <div className="page-content">
      <AnimatePresence mode="wait">
        {!isSearching ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', marginTop: '10vh' }}>
             <Zap size={80} fill="var(--accent-primary)" color="var(--accent-primary)" className="pulse-animation" />
             <h1 style={{ fontSize: '64px', margin: '20px 0' }}>Meta<span style={{ color: 'var(--accent-primary)' }}>Search</span></h1>
             <div className="search-bar-pro" style={{ maxWidth: '600px', margin: '0 auto 30px', borderRadius: '30px', padding: '15px 25px' }}>
                <Search size={24} />
                <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} placeholder="Query Global Facebook Groups..." />
             </div>
             <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button onClick={handleSearch} className="glow-btn">Deep Scrape</button>
                <button className="export-btn">I'm Feeling Lucky</button>
             </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                   <div className="search-bar-pro" style={{ maxWidth: '600px', padding: '10px 20px', borderRadius: '24px' }}>
                      <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} />
                      <Search size={18} color="var(--accent-primary)" onClick={handleSearch} />
                   </div>
                   <button onClick={exportData} className="export-btn"><Download size={16} /> Export</button>
                </div>
             </div>
             <div style={{ maxWidth: '800px' }}>
                {results.map(g => (
                  <div key={g.id} className="card" style={{ marginBottom: '20px', padding: '20px', border: '1px solid var(--border-color)' }}>
                     <h3 style={{ color: 'var(--accent-primary)', marginBottom: '5px', cursor: 'pointer' }} onClick={() => setSelectedGroup(g)}>{g.name}</h3>
                     <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '10px' }}>{g.members} members • {g.location} • {g.category}</p>
                     <div style={{ display: 'flex', gap: '15px' }}>
                        <button onClick={() => window.open(g.url || `https://facebook.com/search/groups/?q=${encodeURIComponent(g.name)}`, '_blank')} className="glow-btn" style={{ padding: '6px 15px', fontSize: '12px' }}>JOIN NOW</button>
                        <button onClick={() => setSelectedGroup(g)} className="export-btn" style={{ padding: '6px 15px', fontSize: '12px' }}>ANALYZE</button>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isScanning && (
        <div className="scanning-overlay">
           <Zap size={60} color="var(--accent-primary)" className="pulse-animation" />
           <h2 style={{ marginTop: '20px' }}>Connecting to Meta Nodes...</h2>
        </div>
      )}

      {selectedGroup && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedGroup(null)}>
           <div className="card" style={{ maxWidth: '600px', width: '90%', padding: '30px' }} onClick={e => e.stopPropagation()}>
              <h2>{selectedGroup.name}</h2>
              <p style={{ color: 'var(--accent-primary)', margin: '10px 0' }}>{selectedGroup.members} Active Members</p>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginTop: '20px' }}>
                 <h4 style={{ marginBottom: '10px' }}>Group Insights</h4>
                 <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{selectedGroup.description || 'Enterprise intelligence data for this group is currently being synced. Expected accuracy: 99.8%.'}</p>
              </div>
              <button onClick={() => setSelectedGroup(null)} className="glow-btn" style={{ width: '100%', marginTop: '30px' }}>CLOSE DATA PANEL</button>
           </div>
        </div>
      )}
    </div>
  );
};

// --- App Shell ---

const App = () => {
  const [results, setResults] = usePersistence('results', []);
  const [history, setHistory] = usePersistence('history', []);
  const [plan, setPlan] = usePersistence('plan', 'starter');
  const [config, setConfig] = usePersistence('config', { apiKey: '', proxy: 'US-EAST-1 (High Speed)' });

  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <div className="logo" onClick={() => window.location.href = '/'}>
            <Zap size={24} fill="currentColor" />
            <span>MetaSearch</span>
          </div>
          <nav style={{ marginTop: '30px' }}>
            <NavLink to="/" className="nav-link"><Search size={18} /><span>Engine</span></NavLink>
            <NavLink to="/analytics" className="nav-link"><BarChart2 size={18} /><span>Insights</span></NavLink>
            <NavLink to="/history" className="nav-link"><History size={18} /><span>History</span></NavLink>
            <NavLink to="/pricing" className="nav-link"><CreditCard size={18} /><span>Billing</span></NavLink>
            <NavLink to="/settings" className="nav-link"><SettingsIcon size={18} /><span>Settings</span></NavLink>
          </nav>
          <div style={{ marginTop: 'auto', padding: '15px', background: 'rgba(0, 242, 255, 0.05)', borderRadius: '10px' }}>
             <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PLAN: <span style={{ color: 'var(--accent-primary)', fontWeight: '800' }}>{plan.toUpperCase()}</span></p>
          </div>
        </aside>
        <main className="main-content">
          <header className="topbar">
             <div style={{ flex: 1 }}></div>
             <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Globe size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} onClick={() => alert('Language Switcher: English / Bengali')} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-hover)', padding: '5px 12px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                   <div style={{ width: '24px', height: '24px', background: 'var(--accent-gradient)', borderRadius: '50%' }}></div>
                   <span style={{ fontSize: '12px' }}>Enterprise_Admin</span>
                </div>
             </div>
          </header>
          <Routes>
            <Route path="/" element={<Home results={results} setResults={setResults} history={history} setHistory={setHistory} />} />
            <Route path="/analytics" element={<Analytics results={results} />} />
            <Route path="/history" element={<HistoryPage history={history} clearHistory={() => setHistory([])} />} />
            <Route path="/pricing" element={<PricingPage currentPlan={plan} setPlan={setPlan} />} />
            <Route path="/settings" element={<SettingsPage config={config} setConfig={setConfig} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
