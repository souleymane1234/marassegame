import { useState } from 'react';
import './Auth.css';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
  onClose: () => void;
}

export default function Login({ onLogin, onSwitchToRegister, onClose }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-button" onClick={onClose}>×</button>
        <div className="auth-card">
          <div className="auth-header">
            <h1>🎰 Connexion</h1>
            <p>Bienvenue ! Connectez-vous pour jouer</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="auth-button primary">
              Se connecter
            </button>
          </form>
          <div className="auth-switch">
            <p>
              Pas encore de compte ?{' '}
              <button onClick={onSwitchToRegister} className="link-button">
                Créer un compte
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

