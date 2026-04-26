import React from 'react';
import { motion } from 'framer-motion';

const Analytics = ({ results = [] }) => {
  const data = results.length > 0 ? results.slice(0, 5) : [
    { name: 'Node A', members: '100K' },
    { name: 'Node B', members: '200K' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 style={{ marginBottom: '30px' }}>Global Analytics</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div className="card">
           <p style={{ color: '#94a3b8' }}>TOTAL NODES</p>
           <h2>{results.length}</h2>
        </div>
        <div className="card">
           <p style={{ color: '#94a3b8' }}>UPTIME</p>
           <h2 style={{ color: '#00f2ff' }}>99.9%</h2>
        </div>
        <div className="card">
           <p style={{ color: '#94a3b8' }}>STATUS</p>
           <h2 style={{ color: '#22c55e' }}>ONLINE</h2>
        </div>
      </div>

      <div className="card" style={{ marginTop: '30px', height: '300px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
         {data.map((d, i) => (
           <div key={i} style={{ flex: 1, background: '#00f2ff', height: '100px', borderRadius: '5px' }} />
         ))}
      </div>
    </motion.div>
  );
};

export default Analytics;
