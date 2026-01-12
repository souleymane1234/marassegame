import { useState } from 'react';
import BannerSlider from './BannerSlider';
import BonusMarquee from './BonusMarquee';
import StatsBar from './StatsBar';
import PromotionalBanners from './PromotionalBanners';
import AnimatedBackground from './AnimatedBackground';
import UserAccount from './UserAccount';
import './GameList.css';

interface Game {
  id: string;
  name: string;
  icon: string;
  category: string;
  url: string;
  image: string;
}

interface User {
  name: string;
  email: string;
  phone?: string;
  balance: number;
}

interface GameListProps {
  user?: User | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  onPlayGame: (game: Game, mode: 'demo' | 'real') => void;
  onUpdateBalance: (balance: number) => void;
}

const games: Game[] = [
  { id: '1', name: 'Roulette', icon: '🎰', category: 'Table', url: 'https://example.com/roulette', image: '/jeu/roulette.jpeg' },
  { id: '2', name: 'Blackjack', icon: '🃏', category: 'Table', url: 'https://example.com/blackjack', image: '/jeu/blackjack.jpg' },
  { id: '3', name: 'Slots', icon: '🎲', category: 'Slots', url: 'https://example.com/slots', image: '/jeu/slots.png' },
  { id: '4', name: 'Poker', icon: '♠️', category: 'Table', url: 'https://example.com/poker', image: '/jeu/poker.jpg' },
  { id: '5', name: 'Baccarat', icon: '🎴', category: 'Table', url: 'https://example.com/baccarat', image: '/jeu/baccarat.jpg' },
  { id: '6', name: 'Craps', icon: '🎯', category: 'Table', url: 'https://example.com/craps', image: '/jeu/craps.jpg' },
];

export default function GameList({ user, onLogin, onRegister, onLogout, onPlayGame, onUpdateBalance }: GameListProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showAccount, setShowAccount] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' FCFA';
  };

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
  };

  const handlePlayMode = (mode: 'demo' | 'real') => {
    if (selectedGame) {
      onPlayGame(selectedGame, mode);
      setSelectedGame(null);
    }
  };

  return (
    <div className="game-list-container">
      <AnimatedBackground />
      <header className="game-header">
        <div className="header-content">
          <h1>🎰 Casino Platform</h1>
          <div className="header-actions">
            {user ? (
              <>
                <button onClick={() => setShowAccount(true)} className="account-button">
                  <span className="account-balance">{formatCurrency(user.balance)}</span>
                  <span className="account-name">{user.name}</span>
                </button>
                <button onClick={onLogout} className="logout-button">
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <button onClick={onLogin} className="auth-button-header">
                  Connexion
                </button>
                <button onClick={onRegister} className="auth-button-header primary">
                  Inscription
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <BannerSlider />

      <main className="game-main">
        <div className="content-wrapper">
          <BonusMarquee />
          <StatsBar />
        </div>
        <div className="games-section">
          <h2 className="section-title">
            <span className="title-icon">🎮</span>
            Nos Jeux
            <span className="title-decoration"></span>
          </h2>
          <div className="games-grid">
            {games.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => handleGameClick(game)}
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="game-image"
                  onError={(e) => {
                    // Si l'image ne charge pas, utiliser une image par défaut ou un placeholder
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzY2N2VlYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkpldSBub24gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
                <div className="play-overlay">
                  <span>Jouer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="promotional-section">
          <PromotionalBanners />
        </div>
      </main>

      {selectedGame && (
        <div className="modal-overlay" onClick={() => setSelectedGame(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Choisissez votre mode de jeu</h2>
            <p className="game-name">{selectedGame.icon} {selectedGame.name}</p>
            <div className="mode-buttons">
              <button
                className="mode-button demo"
                onClick={() => handlePlayMode('demo')}
              >
                <span className="mode-icon">🎮</span>
                <span className="mode-title">Mode Démo</span>
                <span className="mode-description">Jouez gratuitement</span>
              </button>
              <button
                className="mode-button real"
                onClick={() => handlePlayMode('real')}
              >
                <span className="mode-icon">💰</span>
                <span className="mode-title">Jouer en Réel</span>
                <span className="mode-description">Avec de l'argent réel</span>
              </button>
            </div>
            <button
              className="close-modal"
              onClick={() => setSelectedGame(null)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
      {showAccount && user && (
        <UserAccount
          user={user}
          onUpdateBalance={onUpdateBalance}
          onClose={() => setShowAccount(false)}
        />
      )}
    </div>
  );
}

