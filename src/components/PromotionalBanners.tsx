import './PromotionalBanners.css';

interface Promo {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const promos: Promo[] = [
  {
    id: '1',
    title: 'VIP Club',
    description: 'Rejoignez le club VIP',
    icon: '👑',
    color: 'linear-gradient(135deg, #1a0a0a 0%, #2d1a0a 50%, #1a0a0a 100%)'
  },
  {
    id: '2',
    title: 'Live Casino',
    description: 'Jeux en direct',
    icon: '🎥',
    color: 'linear-gradient(135deg, #0a1a0a 0%, #1a2a1a 50%, #0a1a0a 100%)'
  },
  {
    id: '3',
    title: 'Jackpots',
    description: 'Gagnez le gros lot',
    icon: '💎',
    color: 'linear-gradient(135deg, #1a1a0a 0%, #2d2d1a 50%, #1a1a0a 100%)'
  },
  {
    id: '4',
    title: 'Tournois',
    description: 'Participez aux tournois',
    icon: '🏆',
    color: 'linear-gradient(135deg, #1a0a1a 0%, #2a1a2a 50%, #1a0a1a 100%)'
  }
];

export default function PromotionalBanners() {
  return (
    <div className="promotional-banners">
      {promos.map((promo) => (
        <div
          key={promo.id}
          className="promo-card"
          style={{ background: promo.color }}
        >
          <div className="promo-icon">{promo.icon}</div>
          <div className="promo-content">
            <h3 className="promo-title">{promo.title}</h3>
            <p className="promo-description">{promo.description}</p>
          </div>
          <div className="promo-shine"></div>
        </div>
      ))}
    </div>
  );
}

