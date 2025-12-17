import { useState, useRef, useEffect } from 'react';
import './OTPVerification.css';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onCancel: () => void;
}

export default function OTPVerification({ phoneNumber, onVerify, onResend, onCancel }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus sur le premier input au chargement
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Timer pour le renvoi du code
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Un seul caractère à la fois
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Passer à l'input suivant si un chiffre est entré
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Vérifier si tous les champs sont remplis
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      onVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp);
    if (pastedData.length === 6) {
      onVerify(pastedData);
    } else {
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    onResend();
  };

  return (
    <div className="otp-verification">
      <div className="otp-header">
        <h2>🔐 Vérification OTP</h2>
        <p>Nous avons envoyé un code à 6 chiffres au</p>
        <p className="phone-number">{phoneNumber}</p>
      </div>
      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="otp-input"
          />
        ))}
      </div>
      <div className="otp-timer">
        {timeLeft > 0 ? (
          <p>Renvoyer le code dans <span>{timeLeft}s</span></p>
        ) : (
          <button onClick={handleResend} className="resend-button">
            Renvoyer le code
          </button>
        )}
      </div>
      <div className="otp-actions">
        <button onClick={onCancel} className="cancel-button">
          Annuler
        </button>
      </div>
    </div>
  );
}

