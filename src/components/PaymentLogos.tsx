import './PaymentLogos.css';

interface PaymentLogoProps {
  method: 'wave' | 'mtn' | 'orange' | 'moov';
  size?: number;
}

export default function PaymentLogo({ method, size = 60 }: PaymentLogoProps) {
  const imageMap: Record<string, string> = {
    wave: '/wave.png',
    mtn: '/mtn .png',
    orange: '/Orange.png',
    moov: '/moov.png',
  };

  const imagePath = imageMap[method];

  return (
    <img
      src={imagePath}
      alt={`${method} logo`}
      className={`payment-logo payment-logo-${method}`}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
      }}
    />
  );
}

