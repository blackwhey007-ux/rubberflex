import { motion } from 'framer-motion';

interface DataPoint {
  page: string;
  views: number;
  [key: string]: string | number;
}

interface BarChartProps {
  data: DataPoint[];
  xKey?: string;
  yKey?: string;
  color?: string;
}

export default function BarChart({ data, xKey = 'page', yKey = 'views', color = '#4CAF50' }: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
        Aucune donnée disponible
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d[yKey] as number));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {data.map((item, index) => {
        const width = ((item[yKey] as number) / maxValue) * 100;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
              <span style={{ color: '#e5e5e5', fontSize: '0.9em', minWidth: '200px' }}>
                {item[xKey]}
              </span>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '10px', height: '30px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '10px',
                    fontWeight: 'bold',
                    color: '#fff'
                  }}
                >
                  {item[yKey]}
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

