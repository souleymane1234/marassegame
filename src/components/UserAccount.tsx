import { useState } from 'react';
import PaymentMethodSelector from './PaymentMethod';
import type { PaymentMethod } from './PaymentMethod';
import './UserAccount.css';

interface User {
  name: string;
  email: string;
  phone?: string;
  balance: number;
}

interface UserAccountProps {
  user: User;
  onUpdateBalance: (newBalance: number) => void;
  onClose: () => void;
}

export default function UserAccount({ user, onUpdateBalance, onClose }: UserAccountProps) {
  const [activeTab, setActiveTab] = useState<'balance' | 'deposit' | 'withdraw' | 'settings'>('balance');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositStep, setDepositStep] = useState<'amount' | 'payment'>('amount');
  const [withdrawStep, setWithdrawStep] = useState<'amount' | 'payment'>('amount');
  const [depositPaymentMethod, setDepositPaymentMethod] = useState<PaymentMethod | null>(null);
  const [withdrawPaymentMethod, setWithdrawPaymentMethod] = useState<PaymentMethod | null>(null);
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' FCFA';
  };

  const handleDepositAmount = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      setDepositStep('payment');
    } else {
      alert('Veuillez entrer un montant valide');
    }
  };

  const handleDepositConfirm = () => {
    if (!depositPaymentMethod) {
      alert('Veuillez sélectionner un moyen de paiement');
      return;
    }
    const amount = parseFloat(depositAmount);
    const newBalance = user.balance + amount;
    onUpdateBalance(newBalance);
    alert(`Dépôt de ${formatCurrency(amount)} via ${depositPaymentMethod.toUpperCase()} effectué avec succès !`);
    setDepositAmount('');
    setDepositPaymentMethod(null);
    setDepositStep('amount');
    setActiveTab('balance');
  };

  const handleWithdrawAmount = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= user.balance) {
      setWithdrawStep('payment');
    } else if (amount > user.balance) {
      alert('Solde insuffisant');
    } else {
      alert('Veuillez entrer un montant valide');
    }
  };

  const handleWithdrawConfirm = () => {
    if (!withdrawPaymentMethod) {
      alert('Veuillez sélectionner un moyen de paiement');
      return;
    }
    const amount = parseFloat(withdrawAmount);
    const newBalance = user.balance - amount;
    onUpdateBalance(newBalance);
    alert(`Retrait de ${formatCurrency(amount)} via ${withdrawPaymentMethod.toUpperCase()} effectué avec succès !`);
    setWithdrawAmount('');
    setWithdrawPaymentMethod(null);
    setWithdrawStep('amount');
    setActiveTab('balance');
  };

  return (
    <div className="user-account-modal-overlay" onClick={onClose}>
      <div className="user-account-modal" onClick={(e) => e.stopPropagation()}>
        <button className="account-close-button" onClick={onClose}>×</button>
        
        <div className="account-header">
          <h2>👤 Mon Compte</h2>
          <div className="user-balance-display">
            <span className="balance-label">Solde disponible</span>
            <span className="balance-amount">{formatCurrency(user.balance)}</span>
          </div>
        </div>

        <div className="account-tabs">
          <button
            className={`tab-button ${activeTab === 'balance' ? 'active' : ''}`}
            onClick={() => setActiveTab('balance')}
          >
            💰 Solde
          </button>
          <button
            className={`tab-button ${activeTab === 'deposit' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('deposit');
              setDepositStep('amount');
              setDepositPaymentMethod(null);
            }}
          >
            💳 Dépôt
          </button>
          <button
            className={`tab-button ${activeTab === 'withdraw' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('withdraw');
              setWithdrawStep('amount');
              setWithdrawPaymentMethod(null);
            }}
          >
            🏦 Retrait
          </button>
          <button
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Paramètres
          </button>
        </div>

        <div className="account-content">
          {activeTab === 'balance' && (
            <div className="balance-content">
              <div className="balance-card">
                <h3>Solde actuel</h3>
                <p className="balance-value">{formatCurrency(user.balance)}</p>
                <div className="balance-actions">
                  <button onClick={() => setActiveTab('deposit')} className="action-button deposit">
                    Faire un dépôt
                  </button>
                  <button onClick={() => setActiveTab('withdraw')} className="action-button withdraw">
                    Faire un retrait
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deposit' && (
            <div className="deposit-content">
              <h3>Faire un dépôt</h3>
              {depositStep === 'amount' ? (
                <form onSubmit={handleDepositAmount} className="account-form">
                  <div className="form-group">
                    <label>Montant (FCFA)</label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0"
                      min="1"
                      required
                    />
                  </div>
                  <div className="quick-amounts">
                    <button type="button" onClick={() => setDepositAmount('5000')} className="quick-amount">
                      5 000 FCFA
                    </button>
                    <button type="button" onClick={() => setDepositAmount('10000')} className="quick-amount">
                      10 000 FCFA
                    </button>
                    <button type="button" onClick={() => setDepositAmount('25000')} className="quick-amount">
                      25 000 FCFA
                    </button>
                    <button type="button" onClick={() => setDepositAmount('50000')} className="quick-amount">
                      50 000 FCFA
                    </button>
                  </div>
                  <button type="submit" className="submit-button deposit">
                    Continuer
                  </button>
                </form>
              ) : (
                <div className="payment-step">
                  <div className="amount-summary">
                    <p>Montant: <strong>{formatCurrency(parseFloat(depositAmount))}</strong></p>
                    <button
                      type="button"
                      onClick={() => setDepositStep('amount')}
                      className="back-button"
                    >
                      ← Modifier le montant
                    </button>
                  </div>
                  <PaymentMethodSelector
                    selectedMethod={depositPaymentMethod}
                    onSelect={setDepositPaymentMethod}
                  />
                  <button
                    onClick={handleDepositConfirm}
                    className="submit-button deposit"
                    disabled={!depositPaymentMethod}
                  >
                    Confirmer le dépôt
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'withdraw' && (
            <div className="withdraw-content">
              <h3>Faire un retrait</h3>
              {withdrawStep === 'amount' ? (
                <>
                  <p className="withdraw-info">Solde disponible: <strong>{formatCurrency(user.balance)}</strong></p>
                  <form onSubmit={handleWithdrawAmount} className="account-form">
                    <div className="form-group">
                      <label>Montant à retirer (FCFA)</label>
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="0"
                        min="1"
                        max={user.balance}
                        required
                      />
                    </div>
                    <button type="submit" className="submit-button withdraw" disabled={user.balance === 0}>
                      Continuer
                    </button>
                  </form>
                </>
              ) : (
                <div className="payment-step">
                  <div className="amount-summary">
                    <p>Montant: <strong>{formatCurrency(parseFloat(withdrawAmount))}</strong></p>
                    <button
                      type="button"
                      onClick={() => setWithdrawStep('amount')}
                      className="back-button"
                    >
                      ← Modifier le montant
                    </button>
                  </div>
                  <PaymentMethodSelector
                    selectedMethod={withdrawPaymentMethod}
                    onSelect={setWithdrawPaymentMethod}
                  />
                  <button
                    onClick={handleWithdrawConfirm}
                    className="submit-button withdraw"
                    disabled={!withdrawPaymentMethod}
                  >
                    Confirmer le retrait
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-content">
              <h3>Paramètres du compte</h3>
              <div className="settings-info">
                <div className="info-item">
                  <span className="info-label">Nom:</span>
                  <span className="info-value">{user.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="info-item">
                    <span className="info-label">Téléphone:</span>
                    <span className="info-value">{user.phone}</span>
                  </div>
                )}
              </div>
              <div className="settings-options">
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                    />
                    Notifications push
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.emailAlerts}
                      onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                    />
                    Alertes par email
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

