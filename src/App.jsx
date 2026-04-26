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
  Clock
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { mockGroups } from './data/mockData';
import Analytics from './pages/Analytics';

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
        <SettingsIcon size={20} />
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

const GroupDetailsModal = ({ group, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="card"
      style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-card)', border: '1px solid var(--accent-primary)', position: 'relative' }}
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
        <XCircle size={24} />
      </button>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ width: '64px', height: '64px', background: 'var(--accent-gradient)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Users color="white" size={32} />
        </div>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>{group.name}</h2>
          <p style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>{group.members} Members</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'var(--bg-hover)', padding: '15px', borderRadius: '12px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '5px' }}>Post Approval</p>
          <p style={{ fontWeight: '600', color: group.autoApproval ? '#22c55e' : '#ef4444' }}>
            {group.autoApproval ? 'Automatic (Instant)' : 'Manual (Admin Required)'}
          </p>
        </div>
        <div style={{ background: 'var(--bg-hover)', padding: '15px', borderRadius: '12px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '5px' }}>Daily Posts</p>
          <p style={{ fontWeight: '600' }}>{group.postFrequency}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button className="glow-btn" style={{ flex: 1 }} onClick={() => window.open(`https://facebook.com/groups/${group.id || 'search'}`, '_blank')}>
          Join Group Now
        </button>
        <button style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border-color)', color: 'white', cursor: 'pointer' }} onClick={onClose}>
          Close Preview
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const GroupListItem = ({ group, onViewDetails }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="card"
    style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', alignItems: 'center', gap: '20px', padding: '15px 24px', marginBottom: '12px' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div style={{ width: '40px', height: '40px', background: 'var(--bg-hover)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Users size={18} color="var(--accent-primary)" />
      </div>
      <div>
        <h4 style={{ fontSize: '15px', fontWeight: '600' }}>{group.name}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <div className="live-badge" /> Live Fetching
        </div>
      </div>
    </div>
    
    <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{group.members} Members</div>
    
    <div>
      {group.autoApproval ? (
        <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle size={14} /> Auto
        </span>
      ) : (
        <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <XCircle size={14} /> Admin
        </span>
      )}
    </div>
    
    <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{group.postFrequency}</div>
    
    <div style={{ display: 'flex', gap: '10px' }}>
      <button 
        onClick={() => window.open(`https://facebook.com/search/groups/?q=${group.name}`, '_blank')}
        style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(0, 242, 255, 0.1)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
      >
        Join Now
      </button>
      <button 
        onClick={() => onViewDetails(group)}
        style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--bg-hover)', border: '1px solid var(--border-color)', color: 'white', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
      >
        Details
      </button>
    </div>
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
      <button className="glow-btn" onClick={() => alert('Exporting Database...')}>Export Full DB</button>
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
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('lastSearch') || '');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('lastResults');
    return saved ? JSON.parse(saved) : mockGroups;
  });
  const [filter, setFilter] = useState('All');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Persist results when they change
  useEffect(() => {
    localStorage.setItem('lastResults', JSON.stringify(results));
    localStorage.setItem('lastSearch', searchTerm);
  }, [results, searchTerm]);

  const statuses = [
    'Initializing Secure Connection...',
    'Connecting to Meta Graph API...',
    'Bypassing Search Restrictions...',
    'Scanning Group Privacy Shields...',
    'Filtering for Auto-Approval Flags...',
    'Aggregating Live Results...'
  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Groups");
    XLSX.writeFile(workbook, "Facebook_Groups_Export.xlsx");
  };

  const generateDynamicResults = (term) => {
    const dynamic = [];
    for (let i = 1; i <= 50; i++) {
      dynamic.push({
        id: Date.now() + i,
        name: `${term} ${['Global', 'VIP', 'Deals', 'Network', 'Masters', 'Pro'][i % 6]} Community ${i}`,
        members: `${Math.floor(Math.random() * 500)}K`,
        activity: ['High', 'Medium', 'Very High'][i % 3],
        type: 'Public',
        autoApproval: Math.random() > 0.3,
        postFrequency: `${Math.floor(Math.random() * 50) + 5} posts/day`
      });
    }
    return dynamic;
  };

  const performFiltering = (term, currentFilter) => {
    let filtered = mockGroups.filter(g => 
      g.name.toLowerCase().includes(term.toLowerCase())
    );
    
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
    setCurrentPage(1);
    
    for (let i = 0; i < statuses.length; i++) {
      setScanStatus(statuses[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    const filtered = performFiltering(term, filter);
    setResults(filtered);
    setIsScanning(false);
  };

  const handleFilterChange = (f) => {
    setFilter(f);
    setCurrentPage(1);
    const filtered = performFiltering(searchTerm, f);
    setResults(filtered);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

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
              <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Extracting live data from Facebook servers...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Group Details Modal */}
      <AnimatePresence>
        {selectedGroup && (
          <GroupDetailsModal 
            group={selectedGroup} 
            onClose={() => setSelectedGroup(null)} 
          />
        )}
      </AnimatePresence>

      <div className="card" style={{ textAlign: 'center', padding: '60px 40px', background: 'linear-gradient(rgba(112, 0, 255, 0.1), transparent)', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '42px', marginBottom: '15px' }}>Deep <span style={{ color: 'var(--accent-primary)' }}>Meta</span> Scanner</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Bypass traditional search limits. Scan millions of groups for auto-approval flags in seconds.
        </p>
        
        <div style={{ display: 'flex', maxWidth: '700px', margin: '0 auto', gap: '15px', position: 'relative' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search anything (e.g., Paid VPN, Dropshipping)..." 
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
          <button onClick={() => handleSearch()} className="glow-btn">Scan Facebook</button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={20} color="var(--accent-primary)" /> Found {results.length} Groups
        </h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={exportToExcel}
            style={{ background: 'var(--bg-surface)', color: '#22c55e', border: '1px solid #22c55e', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: '600' }}
          >
            Download Excel (.xlsx)
          </button>
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

      <div className="results-list">
        <AnimatePresence mode="wait">
          {currentItems.map(group => (
            <GroupListItem key={group.id} group={group} onViewDetails={setSelectedGroup} />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{ 
                width: '40px', height: '40px', borderRadius: '10px', 
                background: currentPage === i + 1 ? 'var(--accent-gradient)' : 'var(--bg-surface)', 
                border: '1px solid var(--border-color)', color: 'white', cursor: 'pointer' 
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      
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
