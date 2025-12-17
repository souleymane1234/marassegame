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
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: '2',
    title: 'Live Casino',
    description: 'Jeux en direct',
    icon: '🎥',
    color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  },
  {
    id: '3',
    title: 'Jackpots',
    description: 'Gagnez le gros lot',
    icon: '💎',
    color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: '4',
    title: 'Tournois',
    description: 'Participez aux tournois',
    icon: '🏆',
    color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
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

