import './BonusMarquee.css';

const bonusMessages = [
  { id: 1, text: '🎁 Bonus de bienvenue 100% jusqu\'à 325 000 FCFA', icon: '💰' },
  { id: 2, text: '⚡ 200 tours gratuits sur votre premier dépôt', icon: '🎰' },
  { id: 3, text: '💎 Programme VIP exclusif disponible', icon: '👑' },
  { id: 4, text: '🔥 Jackpot progressif : 800 000 000 FCFA', icon: '🎯' },
  { id: 5, text: '🎲 Nouveau jeu disponible chaque semaine', icon: '✨' },
  { id: 6, text: '💵 Retraits instantanés garantis', icon: '⚡' },
];

export default function BonusMarquee() {
  // Dupliquer les messages pour un défilement continu
  const duplicatedMessages = [...bonusMessages, ...bonusMessages];

  return (
    <div className="bonus-marquee-container">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {duplicatedMessages.map((message, index) => (
            <div key={`${message.id}-${index}`} className="marquee-item">
              <span className="marquee-icon">{message.icon}</span>
              <span className="marquee-text">{message.text}</span>
            </div>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {duplicatedMessages.map((message, index) => (
            <div key={`${message.id}-${index}-clone`} className="marquee-item">
              <span className="marquee-icon">{message.icon}</span>
              <span className="marquee-text">{message.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

