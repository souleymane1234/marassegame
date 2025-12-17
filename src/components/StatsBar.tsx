import './StatsBar.css';

interface Stat {
  label: string;
  value: string;
  icon: string;
}

const stats: Stat[] = [
  { label: 'Joueurs en ligne', value: '12,458', icon: '👥' },
  { label: 'Gains du jour', value: '1,6M FCFA', icon: '💰' },
  { label: 'Jackpots actifs', value: '47', icon: '🎯' },
  { label: 'Jeux disponibles', value: '500+', icon: '🎰' }
];

export default function StatsBar() {
  return (
    <div className="stats-bar">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
          <div className="stat-pulse"></div>
        </div>
      ))}
    </div>
  );
}

