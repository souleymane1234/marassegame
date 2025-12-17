import './GameView.css';

interface GameViewProps {
  gameName: string;
  gameUrl: string;
  mode: 'demo' | 'real';
  onBack: () => void;
}

export default function GameView({ gameName, gameUrl, mode, onBack }: GameViewProps) {
  return (
    <div className="game-view-container">
      <header className="game-view-header">
        <button onClick={onBack} className="back-button">
          ← Retour aux jeux
        </button>
        <h2>{gameName} - Mode {mode === 'demo' ? 'Démo' : 'Réel'}</h2>
        <div className="mode-badge">
          {mode === 'demo' ? '🎮 Démo' : '💰 Réel'}
        </div>
      </header>
      <div className="game-frame-container">
        <iframe
          src={gameUrl}
          className="game-frame"
          title={gameName}
          allow="fullscreen"
        />
        <div className="game-info">
          <p>Jeu chargé en mode {mode === 'demo' ? 'démo (gratuit)' : 'réel (argent réel)'}</p>
        </div>
      </div>
    </div>
  );
}

