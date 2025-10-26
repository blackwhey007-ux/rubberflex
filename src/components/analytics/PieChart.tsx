import { motion } from 'framer-motion';

interface DataPoint {
  type?: string;
  source?: string;
  count: number;
  [key: string]: string | number | undefined;
}

interface PieChartProps {
  data: DataPoint[];
  labelKey: string;
  valueKey: string;
}

const colors = ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#E91E63'];

export default function PieChart({ data, labelKey, valueKey }: PieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
        Aucune donnée disponible
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + (item[valueKey] as number), 0);
  
  let currentAngle = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
      {/* Légende */}
      <div style={{ flex: 1, minWidth: '200px' }}>
        {data.map((item, index) => {
          const percentage = ((item[valueKey] as number) / total * 100).toFixed(1);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '8px',
                background: 'rgba(255,255,255,0.05)'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                background: colors[index % colors.length],
                borderRadius: '4px'
              }} />
              <span style={{ color: '#e5e5e5', flex: 1 }}>
                {item[labelKey]}
              </span>
              <span style={{ color: '#999', fontSize: '0.9em' }}>
                {item[valueKey]}
              </span>
              <span style={{ color: '#666', fontSize: '0.85em' }}>
                ({percentage}%)
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Cercle SVG */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: '250px' }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', maxWidth: '300px' }}>
          {data.map((item, index) => {
            const percentage = (item[valueKey] as number) / total;
            const startAngle = currentAngle;
            const endAngle = currentAngle + (percentage * 360);
            
            const largeArcFlag = percentage > 0.5 ? 1 : 0;
            const x1 = 100 + 90 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 100 + 90 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 100 + 90 * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 100 + 90 * Math.sin((endAngle - 90) * Math.PI / 180);
            
            currentAngle = endAngle;
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');
            
            return (
              <motion.path
                key={index}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                d={pathData}
                fill={colors[index % colors.length]}
                stroke="#0a0a0a"
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
              />
            );
          })}
          
          {/* Centre du cercle */}
          <circle cx="100" cy="100" r="50" fill="#0a0a0a" />
          <text
            x="100"
            y="95"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
          >
            {total}
          </text>
          <text
            x="100"
            y="115"
            textAnchor="middle"
            fill="#999"
            fontSize="12"
          >
            total
          </text>
        </svg>
      </div>
    </div>
  );
}

