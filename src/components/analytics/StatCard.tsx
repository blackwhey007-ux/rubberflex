import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: `0 8px 25px ${color}40` }}
      style={{
        background: `${color}1A`,
        border: `1px solid ${color}4D`,
        borderRadius: '15px',
        padding: '25px',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <div style={{ fontSize: '3em', marginBottom: '10px' }}>{icon}</div>
      <h3 style={{ color: color, fontSize: '1.2em', marginBottom: '15px' }}>{title}</h3>
      <p style={{ fontSize: '2.5em', fontWeight: 'bold', margin: 0, color: 'white' }}>
        {value}
      </p>
    </motion.div>
  );
}

