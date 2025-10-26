import { motion } from 'framer-motion';

interface DataPoint {
  date: string;
  visits: number;
  [key: string]: string | number;
}

interface LineChartProps {
  data: DataPoint[];
  xKey: string;
  yKey: string;
  color?: string;
}

export default function LineChart({ data, xKey, yKey, color = '#2196F3' }: LineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
        Aucune donnée disponible
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d[yKey] as number));

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
      border: '1px solid rgba(220, 38, 38, 0.2)',
      borderRadius: '15px',
      padding: '30px',
      height: '400px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      gap: '10px'
    }}>
      {data.map((point, index) => {
        const height = ((point[yKey] as number) / maxValue) * 100;
        const displayDate = point[xKey] as string;
        const shortDate = new Date(displayDate).toLocaleDateString('fr-FR', {
          month: 'short',
          day: 'numeric'
        });
        
        return (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{
                width: '100%',
                background: `linear-gradient(180deg, ${color}FF 0%, ${color}80 100%)`,
                borderRadius: '8px 8px 0 0',
                minHeight: '10px',
                cursor: 'pointer',
                position: 'relative'
              }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
            >
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '0.9em',
                whiteSpace: 'nowrap',
                opacity: 0,
                transition: 'opacity 0.3s'
              }} className="tooltip">
                {point[yKey]} visites
              </div>
            </motion.div>
            <span style={{ fontSize: '0.8em', color: '#999' }}>
              {shortDate}
            </span>
          </div>
        );
      })}
      <style>{`
        .tooltip:hover {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}

