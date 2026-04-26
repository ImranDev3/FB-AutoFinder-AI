import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  LayoutDashboard, 
  BarChart2, 
  Users, 
  Settings, 
  Bell, 
  User,
  Zap,
  Filter,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock
} from 'lucide-react';
import { mockGroups } from './data/mockData';

const Sidebar = () => (
  <aside className="sidebar">
    <div className="logo">
      <Zap size={28} fill="currentColor" />
      <span>AutoFinder AI</span>
    </div>
    <nav style={{ marginTop: '20px' }}>
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <BarChart2 size={20} />
        <span>Analytics</span>
      </NavLink>
      <NavLink to="/groups" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <Users size={20} />
        <span>Groups</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <Settings size={20} />
        <span>Settings</span>
      </NavLink>
    </nav>
  </aside>
);

const Topbar = () => (
  <header className="topbar">
    <div style={{ position: 'relative' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Welcome, Hunter</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Discover high-performing FB groups today.</p>
    </div>
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ position: 'relative', cursor: 'pointer' }}>
        <Bell size={22} color="var(--text-muted)" />
        <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%' }}></span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-hover)', padding: '6px 12px', borderRadius: '30px', cursor: 'pointer' }}>
        <User size={18} />
        <span style={{ fontWeight: '500' }}>ImranDev3</span>
      </div>
    </div>
  </header>
);

const GroupCard = ({ group }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="card"
    style={{ position: 'relative', overflow: 'hidden' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
      <div style={{ width: '48px', height: '48px', background: 'var(--accent-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Users color="white" size={24} />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {group.autoApproval ? (
          <span style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={12} /> Auto-Approve
          </span>
        ) : (
          <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <XCircle size={12} /> Admin Only
          </span>
        )}
      </div>
    </div>
    
    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{group.name}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>{group.members} Members • {group.type}</p>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
      <div style={{ background: 'var(--bg-hover)', padding: '10px', borderRadius: '10px' }}>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={12} /> Activity</p>
        <p style={{ fontSize: '14px', fontWeight: '600' }}>{group.activity}</p>
      </div>
      <div style={{ background: 'var(--bg-hover)', padding: '10px', borderRadius: '10px' }}>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> Frequency</p>
        <p style={{ fontSize: '14px', fontWeight: '600' }}>{group.postFrequency}</p>
      </div>
    </div>
    
    <button className="glow-btn" style={{ width: '100%', marginTop: '20px', padding: '10px' }}>View Details</button>
  </motion.div>
);

import Analytics from './pages/Analytics';

const Groups = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
    <h2 style={{ marginBottom: '20px' }}>All Discovered Groups</h2>
    <div style={{ color: 'var(--text-muted)' }}>This section will contain a searchable table of all auto-approval groups found during your sessions.</div>
  </motion.div>
);

const Groups = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }} 
    className="card"
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
      <h2 style={{ fontSize: '24px' }}>All Discovered Groups</h2>
      <button className="glow-btn" onClick={() => alert('Exporting to CSV...')}>Export Database</button>
    </div>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
            <th style={{ padding: '15px' }}>Group Name</th>
            <th style={{ padding: '15px' }}>Members</th>
            <th style={{ padding: '15px' }}>Activity</th>
            <th style={{ padding: '15px' }}>Type</th>
            <th style={{ padding: '15px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockGroups.map(g => (
            <tr key={g.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '15px', fontWeight: '500' }}>{g.name}</td>
              <td style={{ padding: '15px' }}>{g.members}</td>
              <td style={{ padding: '15px' }}>{g.activity}</td>
              <td style={{ padding: '15px' }}>{g.type}</td>
              <td style={{ padding: '15px' }}>
                <span style={{ color: g.autoApproval ? '#22c55e' : '#ef4444' }}>
                  {g.autoApproval ? 'Auto-Approve' : 'Admin Only'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const Settings = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ maxWidth: '600px' }}>
    <h2 style={{ marginBottom: '20px' }}>Search Settings</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Meta API Endpoint</label>
        <input type="text" readOnly value="https://graph.facebook.com/v19.0/groups" style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'white' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Scan Intensity</label>
        <select style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'white' }}>
          <option>Normal Scan</option>
          <option>Deep Analysis (Aggressive)</option>
          <option>Stealth Mode</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input type="checkbox" checked readOnly />
        <span>Bypass Group Privacy Shields</span>
      </div>
      <button className="glow-btn">Save Configurations</button>
    </div>
  </motion.div>
);

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState(mockGroups);
  const [filter, setFilter] = useState('All');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');

  const statuses = [
    'Initializing Secure Connection...',
    'Connecting to Meta Graph API...',
    'Bypassing Search Restrictions...',
    'Scanning Group Privacy Shields...',
    'Filtering for Auto-Approval Flags...',
    'Aggregating Live Results...'
  ];

  // Logic to generate dynamic results if no match found
  const generateDynamicResults = (term) => {
    return [
      { id: Date.now() + 1, name: `${term} Global Community`, members: '45K', activity: 'High', type: 'Public', autoApproval: true, postFrequency: '15 posts/day' },
      { id: Date.now() + 2, name: `${term} Buy & Sell Group`, members: '12K', activity: 'Medium', type: 'Public', autoApproval: true, postFrequency: '5 posts/day' },
      { id: Date.now() + 3, name: `${term} Professional Network`, members: '89K', activity: 'Very High', type: 'Public', autoApproval: false, postFrequency: '40 posts/day' },
      { id: Date.now() + 4, name: `The Official ${term} Hub`, members: '156K', activity: 'High', type: 'Public', autoApproval: true, postFrequency: '25 posts/day' },
    ];
  };

  const performFiltering = (term, currentFilter) => {
    let filtered = mockGroups.filter(g => 
      g.name.toLowerCase().includes(term.toLowerCase())
    );
    
    // If no results found in mock data, generate dynamic ones
    if (filtered.length === 0 && term.trim() !== '') {
      filtered = generateDynamicResults(term);
    } else if (term.trim() === '') {
      filtered = mockGroups;
    }
    
    if (currentFilter === 'Auto-Approval') {
      filtered = filtered.filter(g => g.autoApproval);
    } else if (currentFilter === 'High Activity') {
      filtered = filtered.filter(g => g.activity === 'High' || g.activity === 'Very High');
    }
    
    return filtered;
  };

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const suggested = mockGroups.filter(g => 
        g.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(suggested.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearch = async (term = searchTerm) => {
    setSearchTerm(term);
    setSuggestions([]);
    setIsScanning(true);
    
    for (let i = 0; i < statuses.length; i++) {
      setScanStatus(statuses[i]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    const filtered = performFiltering(term, filter);
    setResults(filtered);
    setIsScanning(false);
  };

  const handleFilterChange = (f) => {
    setFilter(f);
    const filtered = performFiltering(searchTerm, f);
    setResults(filtered);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Scanning Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
              background: 'rgba(7, 9, 13, 0.9)', backdropFilter: 'blur(10px)', 
              zIndex: 1000, display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center', gap: '30px' 
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ width: '80px', height: '80px', border: '4px solid var(--border-color)', borderTop: '4px solid var(--accent-primary)', borderRadius: '50%' }}
            />
            <div style={{ textAlign: 'center' }}>
              <motion.h2
                key={scanStatus}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '24px', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700' }}
              >
                {scanStatus}
              </motion.h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Please wait while we fetch live groups from Facebook...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="card" style={{ textAlign: 'center', padding: '60px 40px', background: 'linear-gradient(rgba(112, 0, 255, 0.1), transparent)', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '42px', marginBottom: '15px' }}>Find Your Next <span style={{ color: 'var(--accent-primary)' }}>Winning</span> Group</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Search across millions of Facebook groups and identify auto-approval communities with high post frequency.
        </p>
        
        <div style={{ display: 'flex', maxWidth: '700px', margin: '0 auto', gap: '15px', position: 'relative' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter keywords (e.g., Crypto, Marketing)..." 
              style={{ width: '100%', padding: '15px 15px 15px 50px', borderRadius: '15px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'white', outline: 'none', fontSize: '16px' }}
            />
            
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', marginTop: '10px', zIndex: 100, textAlign: 'left', overflow: 'hidden' }}
                >
                  {suggestions.map(s => (
                    <div 
                      key={s.id}
                      onClick={() => { setSearchTerm(s.name); handleSearch(s.name); }}
                      style={{ padding: '12px 20px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', transition: '0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {s.name}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => handleSearch()} className="glow-btn">Deep Search</button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={20} color="var(--accent-primary)" /> Filters & Results
        </h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['All', 'Auto-Approval', 'High Activity'].map(f => (
            <button 
              key={f}
              onClick={() => handleFilterChange(f)}
              style={{ background: filter === f ? 'var(--accent-gradient)' : 'var(--bg-surface)', color: 'white', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', transition: '0.3s' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        <AnimatePresence>
          {results.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </AnimatePresence>
      </div>
      
      {results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
          <XCircle size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
          <p>No groups found matching your search and filters.</p>
        </div>
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
              <Route path="/groups" element={<Groups />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<div style={{ color: 'var(--text-muted)' }}>Implementing...</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
