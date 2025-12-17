import PaymentLogo from './PaymentLogos';
import './PaymentMethod.css';

export type PaymentMethod = 'wave' | 'mtn' | 'orange' | 'moov';

interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  color: string;
}

const paymentMethods: PaymentMethodOption[] = [
  {
    id: 'wave',
    name: 'Wave',
    color: '#00D9FF',
  },
  {
    id: 'mtn',
    name: 'MTN Money',
    color: '#FFCC00',
  },
  {
    id: 'orange',
    name: 'Orange Money',
    color: '#FF6600',
  },
  {
    id: 'moov',
    name: 'Moov Money',
    color: '#0066CC',
  },
];

interface PaymentMethodProps {
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({ selectedMethod, onSelect }: PaymentMethodProps) {
  return (
    <div className="payment-methods">
      <h4 className="payment-methods-title">Choisissez votre moyen de paiement</h4>
      <div className="payment-methods-grid">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            className={`payment-method-card ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => onSelect(method.id)}
            style={{ '--method-color': method.color } as React.CSSProperties}
          >
            <div className="payment-method-icon">
              <PaymentLogo method={method.id} size={50} />
            </div>
            <div className="payment-method-name">{method.name}</div>
            {selectedMethod === method.id && (
              <div className="payment-method-check">✓</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export { paymentMethods };

