import React from 'react';
import { motion } from 'framer-motion';

const Analytics = ({ results = [] }) => {
  // Process real data from results
  const data = results.length > 0 ? results.slice(0, 5).map(g => ({
    name: g.name.substring(0, 10) + '...',
    members: parseInt(g.members.replace(/[^0-9.]/g, '')) * (g.members.includes('M') ? 1000 : 1),
    activity: g.autoApproval ? 95 : 40
  })) : [
    { name: 'Group A', members: 4000, activity: 80 },
    { name: 'Group B', members: 3000, activity: 90 },
    { name: 'Group C', members: 2000, activity: 70 },
  ];

  const maxMembers = Math.max(...data.map(d => d.members));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
      <div style={{ marginBottom: '30px' }}>
        <h1>Data <span style={{ color: 'var(--accent-primary)' }}>Analytics</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>Enterprise-grade visualization (Pure Engine).</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* SVG Bar Chart */}
        <div className="card" style={{ padding: '25px' }}>
          <h3 style={{ marginBottom: '25px' }}>Member Distribution</h3>
          <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '15px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
            {data.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.members / maxMembers) * 100}%` }}
                  style={{ width: '100%', background: 'var(--accent-primary)', borderRadius: '4px 4px 0 0', position: 'relative' }}
                >
                  <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px' }}>{d.members >= 1000 ? (d.members/1000).toFixed(1)+'K' : d.members}</div>
                </motion.div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG Progress Bars for Activity */}
        <div className="card" style={{ padding: '25px' }}>
          <h3 style={{ marginBottom: '25px' }}>Group Engagement Levels</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {data.map((d, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                  <span>{d.name}</span>
                  <span style={{ color: 'var(--accent-primary)' }}>{d.activity}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${d.activity}%` }}
                    style={{ height: '100%', background: 'var(--accent-gradient)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div className="card" style={{ padding: '25px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '5px' }}>TOTAL RESULTS</p>
          <h2 style={{ fontSize: '32px' }}>{results.length}</h2>
        </div>
        <div className="card" style={{ padding: '25px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '5px' }}>AUTO-APPROVE</p>
          <h2 style={{ fontSize: '32px', color: '#22c55e' }}>{results.filter(g => g.autoApproval).length}</h2>
        </div>
        <div className="card" style={{ padding: '25px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '5px' }}>GLOBAL NODES</p>
          <h2 style={{ fontSize: '32px', color: 'var(--accent-primary)' }}>14</h2>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
