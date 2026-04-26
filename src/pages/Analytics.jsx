import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

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

  const pieData = [
    { name: 'Auto-Approval', value: results.filter(g => g.autoApproval).length || 10 },
    { name: 'Moderated', value: results.filter(g => !g.autoApproval).length || 5 },
  ];

  const COLORS = ['#00f2ff', '#7000ff', '#22c55e', '#ef4444'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
      <div style={{ marginBottom: '30px' }}>
        <h1>Data <span style={{ color: 'var(--accent-primary)' }}>Analytics</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time visualization of current scraping results.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ height: '350px', padding: '20px' }}>
          <h3 style={{ marginBottom: '20px' }}>Member Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip 
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              />
              <Bar dataKey="members" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ height: '350px', padding: '20px' }}>
          <h3 style={{ marginBottom: '20px' }}>Approval Status Ratio</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ height: '300px', padding: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Engagement Growth (Projected)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
            <YAxis stroke="var(--text-muted)" fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="activity" stroke="var(--accent-primary)" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Analytics;
