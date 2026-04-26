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
  ChevronRight
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { mockGroups } from './data/mockData';
import Analytics from './pages/Analytics';

// --- Google Style Search Components ---

const LandingPage = ({ onSearch, searchTerm, setSearchTerm }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}
  >
    <motion.div 
      initial={{ scale: 0.8, y: 20 }} 
      animate={{ scale: 1, y: 0 }}
      style={{ marginBottom: '40px', textAlign: 'center' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
        <Zap size={64} fill="var(--accent-primary)" color="var(--accent-primary)" className="pulse-animation" />
        <h1 style={{ fontSize: '72px', fontWeight: '800', letterSpacing: '-2px' }}>
          Meta<span style={{ color: 'var(--accent-primary)' }}>Search</span>
        </h1>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '18px', letterSpacing: '2px' }}>THE ULTIMATE FACEBOOK INTELLIGENCE ENGINE</p>
    </motion.div>

    <div className="search-bar-pro" style={{ width: '100%', maxWidth: '600px', padding: '15px 25px', borderRadius: '30px', marginBottom: '30px' }}>
      <Search size={24} color="var(--text-muted)" />
      <input 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        onKeyPress={e => e.key === 'Enter' && onSearch()} 
        placeholder="Search public groups, members, or niches..." 
        style={{ fontSize: '18px' }}
      />
      <Zap size={20} color="var(--accent-primary)" style={{ cursor: 'pointer' }} />
    </div>

    <div style={{ display: 'flex', gap: '15px' }}>
      <button onClick={() => onSearch()} className="glow-btn" style={{ padding: '12px 30px', borderRadius: '8px' }}>Meta Search</button>
      <button className="export-btn" style={{ padding: '12px 30px', borderRadius: '8px' }}>I'm Feeling Lucky</button>
    </div>

    <div style={{ marginTop: '50px', color: 'var(--text-muted)', fontSize: '14px' }}>
      MetaSearch offered in: <span style={{ color: 'var(--accent-primary)', cursor: 'pointer' }}>বাংলা</span>
    </div>
  </motion.div>
);

const SearchResults = ({ results, searchTerm, onSearch, setSearchTerm, onViewDetails }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {/* Google Style Header */}
    <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '30px', paddingBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <div className="search-bar-pro" style={{ width: '100%', maxWidth: '650px', padding: '10px 20px', borderRadius: '24px' }}>
          <input 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            onKeyPress={e => e.key === 'Enter' && onSearch()} 
          />
          <Search size={18} color="var(--accent-primary)" onClick={onSearch} style={{ cursor: 'pointer' }} />
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>About {results.length} results (0.42 seconds)</p>
      </div>

      <div style={{ display: 'flex', gap: '30px', fontSize: '14px', color: 'var(--text-muted)', marginLeft: '20px' }}>
        <span style={{ color: 'var(--accent-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700', cursor: 'pointer' }}>
          <Search size={14} /> All Groups
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><ImageIcon size={14} /> Images</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><BarChart2 size={14} /> Analytics</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><History size={14} /> History</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}><MoreVertical size={14} /> More</span>
      </div>
    </div>

    {/* Result Items */}
    <div style={{ maxWidth: '800px', marginLeft: '20px' }}>
      {results.map(g => (
        <motion.div 
          key={g.id} 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '30px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '5px' }}>
            <span>facebook.com › groups › {g.name.toLowerCase().replace(/ /g, '_')}</span>
            <MoreVertical size={12} />
          </div>
          <h3 
            onClick={() => onViewDetails(g)}
            style={{ fontSize: '20px', color: 'var(--accent-primary)', cursor: 'pointer', marginBottom: '5px', fontWeight: '600' }}
          >
            {g.name} - {g.members} Active Members
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5', marginBottom: '10px' }}>
            {g.description || `The premier group for ${g.category} in ${g.location}. Join ${g.members} professionals discussing ${g.name} and sharing insights daily.`}
          </p>
          <div style={{ display: 'flex', gap: '15px', fontSize: '13px' }}>
             <span style={{ color: '#22c55e', fontWeight: '700' }}>✓ Auto-Approval ON</span>
             <span style={{ color: 'var(--text-muted)' }}>• {g.postFrequency}</span>
             <span style={{ color: 'var(--accent-primary)', cursor: 'pointer' }} onClick={() => window.open(`https://facebook.com/search/groups/?q=${encodeURIComponent(g.name)}`, '_blank')}>Join Now <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></span>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('lastSearch') || '');
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('lastResults');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSearching, setIsSearching] = useState(results.length > 0);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsScanning(true);
    
    // Simulate Scrape
    await new Promise(r => setTimeout(r, 1500));
    
    const filtered = mockGroups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setResults(filtered.length ? filtered : mockGroups);
    setIsSearching(true);
    setIsScanning(false);
    localStorage.setItem('lastSearch', searchTerm);
    localStorage.setItem('lastResults', JSON.stringify(filtered.length ? filtered : mockGroups));
  };

  return (
    <div className="page-content">
      <AnimatePresence mode="wait">
        {!isSearching ? (
          <LandingPage key="landing" onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        ) : (
          <SearchResults 
            key="results"
            results={results} 
            searchTerm={searchTerm} 
            onSearch={handleSearch} 
            setSearchTerm={setSearchTerm} 
            onViewDetails={setSelectedGroup}
          />
        )}
      </AnimatePresence>

      {isScanning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="scanning-overlay">
          <Zap size={60} color="var(--accent-primary)" className="pulse-animation" />
          <h2 style={{ marginTop: '20px' }}>Scraping Meta Nodes...</h2>
        </motion.div>
      )}

      {selectedGroup && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
           <div className="card" style={{ maxWidth: '600px', width: '90%' }}>
              <h2>{selectedGroup.name}</h2>
              <p>{selectedGroup.description}</p>
              <button onClick={() => setSelectedGroup(null)} className="glow-btn" style={{ marginTop: '20px' }}>Close</button>
           </div>
        </div>
      )}
    </div>
  );
};

// --- App Shell ---

const App = () => (
  <Router>
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo" onClick={() => window.location.href = '/'}>
          <Zap size={24} fill="currentColor" />
          <span>MetaSearch</span>
        </div>
        <nav style={{ marginTop: '30px' }}>
          <NavLink to="/" className="nav-link"><Search size={18} /><span>Search</span></NavLink>
          <NavLink to="/analytics" className="nav-link"><BarChart2 size={18} /><span>Insights</span></NavLink>
          <NavLink to="/history" className="nav-link"><History size={18} /><span>Activity</span></NavLink>
          <NavLink to="/pricing" className="nav-link"><CreditCard size={18} /><span>Billing</span></NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <header className="topbar">
           <div style={{ flex: 1 }}></div>
           <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Globe size={18} color="var(--text-muted)" />
              <div style={{ width: '32px', height: '32px', background: 'var(--accent-gradient)', borderRadius: '50%' }}></div>
           </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/pricing" element={<div>Pricing</div>} />
          <Route path="/history" element={<div>History</div>} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
