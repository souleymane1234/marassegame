import { useState } from 'react';
import OTPVerification from './OTPVerification';
import './Auth.css';

interface RegisterProps {
  onRegister: (name: string, email: string, phone: string, password: string) => void;
  onSwitchToLogin: () => void;
  onClose: () => void;
}

export default function Register({ onRegister, onSwitchToLogin, onClose }: RegisterProps) {
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Générer un OTP à 6 chiffres
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log('OTP généré (à remplacer par SMS réel):', otp); // Pour le développement
    return otp;
  };

  const handleSendOTP = () => {
    // Validation format ivoirien: 9 chiffres (ex: 0708091011)
    if (!phone.match(/^[0-9]{9}$/)) {
      alert('Veuillez entrer un numéro de téléphone valide (9 chiffres, ex: 0708091011)');
      return;
    }
    generateOTP();
    setStep('otp');
  };

  const handleVerifyOTP = (otp: string) => {
    if (otp === generatedOtp) {
      onRegister(name, email, phone, password);
    } else {
      alert('Code OTP incorrect. Veuillez réessayer.');
    }
  };

  const handleResendOTP = () => {
    generateOTP();
    alert('Nouveau code OTP envoyé !');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    handleSendOTP();
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-button" onClick={onClose}>×</button>
        <div className="auth-card">
          <div className="auth-header">
            <h1>🎰 Inscription</h1>
            <p>Créez votre compte pour commencer</p>
          </div>
          {step === 'form' ? (
            <>
              <form onSubmit={handleFormSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Votre nom"
                  />
                </div>
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
                  <label htmlFor="phone">Numéro de téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    required
                    placeholder="0708091011"
                    maxLength={9}
                  />
                  <small style={{ color: '#666', fontSize: '0.85em' }}>
                    Format: 9 chiffres (ex: 0708091011)
                  </small>
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
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" className="auth-button primary">
                  Envoyer le code OTP
                </button>
              </form>
            </>
          ) : (
            <OTPVerification
              phoneNumber={phone}
              onVerify={handleVerifyOTP}
              onResend={handleResendOTP}
              onCancel={() => setStep('form')}
            />
          )}
          <div className="auth-switch">
            <p>
              Déjà un compte ?{' '}
              <button onClick={onSwitchToLogin} className="link-button">
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

