import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, Activity } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Auto-Approval Groups Found',
        data: [12, 19, 15, 25, 22, 30, 45],
        fill: true,
        backgroundColor: 'rgba(0, 242, 255, 0.1)',
        borderColor: '#00f2ff',
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ['Crypto', 'Marketing', 'Jobs', 'E-commerce', 'Design'],
    datasets: [
      {
        label: 'Group Activity Level',
        data: [85, 60, 75, 50, 90],
        backgroundColor: 'rgba(112, 0, 255, 0.6)',
        borderRadius: 10,
      },
    ],
  };

  const doughnutData = {
    labels: ['Auto-Approve', 'Admin Approval'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ['#00f2ff', '#7000ff'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card">
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '10px' }}><Users size={16} /> Total Scanned</p>
          <h2 style={{ fontSize: '28px' }}>1.2M</h2>
        </div>
        <div className="card">
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '10px' }}><Zap size={16} /> Auto-Approval</p>
          <h2 style={{ fontSize: '28px', color: 'var(--accent-primary)' }}>450K</h2>
        </div>
        <div className="card">
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '10px' }}><TrendingUp size={16} /> Growth Rate</p>
          <h2 style={{ fontSize: '28px', color: '#22c55e' }}>+24%</h2>
        </div>
        <div className="card">
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '10px' }}><Activity size={16} /> Active Filters</p>
          <h2 style={{ fontSize: '28px' }}>12</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '20px' }}>Scanned Groups Frequency</h3>
          <div style={{ height: '300px' }}>
            <Line data={lineData} options={options} />
          </div>
        </div>
        <div className="card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '20px' }}>Approval Status</h3>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px', height: '350px' }}>
        <h3 style={{ marginBottom: '20px' }}>Niche Activity Analytics</h3>
        <div style={{ height: '250px' }}>
          <Bar data={barData} options={options} />
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
