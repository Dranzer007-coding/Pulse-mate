import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const TrendChart = ({ data = [], dataKey = "value", color = "#00f2fe", height = 220, unit = "" }) => {
  if (!data || data.length === 0) return <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No chart data available</div>;

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`area-grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              background: '#0f172a',
              border: '1px solid rgba(0,242,254,0.3)',
              borderRadius: '12px',
              color: '#f8fafc',
              fontSize: '0.8rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
            }}
            formatter={(val) => [`${val} ${unit}`, 'Reading']}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            fillOpacity={1}
            fill={`url(#area-grad-${color.replace('#', '')})`}
            dot={{ r: 4, fill: color, stroke: '#070a14', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: color, stroke: '#ffffff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
