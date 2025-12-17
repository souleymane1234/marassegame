import { useState, useEffect } from 'react';
import './BannerSlider.css';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  background: string;
  buttonText?: string;
}

const banners: Banner[] = [
  {
    id: '1',
    title: '🎁 BONUS DE BIENVENUE',
    subtitle: 'Jusqu\'à 100% + 200 tours gratuits !',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    buttonText: 'Réclamer maintenant'
  },
  {
    id: '2',
    title: '⚡ JACKPOT PROGRESSIF',
    subtitle: 'Gagnez jusqu\'à 650 000 000 FCFA !',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    buttonText: 'Voir les jackpots'
  },
  {
    id: '3',
    title: '🎰 NOUVEAU JEU',
    subtitle: 'Essayez notre dernière création !',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    buttonText: 'Découvrir'
  },
  {
    id: '4',
    title: '💎 VIP EXCLUSIVE',
    subtitle: 'Rejoignez le programme VIP',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    buttonText: 'En savoir plus'
  }
];

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="banner-slider">
      <div className="slider-container">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`banner-slide ${index === currentIndex ? 'active' : ''}`}
            style={{ background: banner.background }}
          >
            <div className="slide-content">
              <h2 className="slide-title">{banner.title}</h2>
              <p className="slide-subtitle">{banner.subtitle}</p>
              {banner.buttonText && (
                <button className="slide-button">{banner.buttonText}</button>
              )}
            </div>
            <div className="slide-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
          </div>
        ))}
      </div>
      <button className="slider-nav prev" onClick={prevSlide}>‹</button>
      <button className="slider-nav next" onClick={nextSlide}>›</button>
      <div className="slider-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

