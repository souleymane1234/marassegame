import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import GameList from './components/GameList';
import GameView from './components/GameView';
import './App.css';

type View = 'games' | 'game';
type GameMode = 'demo' | 'real';

interface User {
  name: string;
  email: string;
  phone?: string;
  balance: number;
}

interface CurrentGame {
  name: string;
  url: string;
  mode: GameMode;
}

function App() {
  const [view, setView] = useState<View>('games');
  const [user, setUser] = useState<User | null>(null);
  const [currentGame, setCurrentGame] = useState<CurrentGame | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const savedUser = localStorage.getItem('casino_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // S'assurer que le solde existe
      if (userData.balance === undefined) {
        userData.balance = 0;
      }
      setUser(userData);
    }
    // Toujours afficher les jeux, même sans connexion
    setView('games');
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simuler une connexion (dans une vraie app, vous feriez un appel API)
    const savedUsers = JSON.parse(localStorage.getItem('casino_users') || '[]');
    const foundUser = savedUsers.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        balance: foundUser.balance || 0,
      };
      setUser(userData);
      localStorage.setItem('casino_user', JSON.stringify(userData));
      setShowLogin(false);
    } else {
      alert('Email ou mot de passe incorrect');
    }
  };

  const handleRegister = (name: string, email: string, phone: string, password: string) => {
    // Simuler une inscription (dans une vraie app, vous feriez un appel API)
    const savedUsers = JSON.parse(localStorage.getItem('casino_users') || '[]');
    
    if (savedUsers.some((u: User & { password: string }) => u.email === email)) {
      alert('Cet email est déjà utilisé');
      return;
    }

    const newUser = { name, email, phone, password, balance: 0 };
    savedUsers.push(newUser);
    localStorage.setItem('casino_users', JSON.stringify(savedUsers));

    const userData = { name, email, phone, balance: 0 };
    setUser(userData);
    localStorage.setItem('casino_user', JSON.stringify(userData));
    setShowRegister(false);
  };

  const handleUpdateBalance = (newBalance: number) => {
    if (user) {
      const updatedUser = { ...user, balance: newBalance };
      setUser(updatedUser);
      localStorage.setItem('casino_user', JSON.stringify(updatedUser));
      // Mettre à jour aussi dans la liste des utilisateurs
      const savedUsers = JSON.parse(localStorage.getItem('casino_users') || '[]');
      const userIndex = savedUsers.findIndex((u: User & { password: string }) => u.email === user.email);
      if (userIndex !== -1) {
        savedUsers[userIndex].balance = newBalance;
        localStorage.setItem('casino_users', JSON.stringify(savedUsers));
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('casino_user');
    // Reste sur la page des jeux après déconnexion
    setView('games');
  };

  const handlePlayGame = (game: { name: string; url: string }, mode: GameMode) => {
    setCurrentGame({
      name: game.name,
      url: game.url,
      mode,
    });
    setView('game');
  };

  const handleBackToGames = () => {
    setView('games');
    setCurrentGame(null);
  };

  return (
    <div className="app">
      {view === 'games' && (
        <GameList
          user={user}
          onLogin={() => setShowLogin(true)}
          onRegister={() => setShowRegister(true)}
          onLogout={handleLogout}
          onPlayGame={handlePlayGame}
          onUpdateBalance={handleUpdateBalance}
        />
      )}
      {view === 'game' && currentGame && (
        <GameView
          gameName={currentGame.name}
          gameUrl={currentGame.url}
          mode={currentGame.mode}
          onBack={handleBackToGames}
        />
      )}
      {showLogin && (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}
      {showRegister && (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onClose={() => setShowRegister(false)}
        />
      )}
    </div>
  );
}

export default App;
