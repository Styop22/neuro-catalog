// VignetteBannerAd.jsx - Специальный компонент для Vignette Banner рекламы
import React, { useEffect, useRef } from 'react';

const VignetteBannerAd = ({ zoneId, adStyle = {}, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !zoneId) return;

    // Очистим контейнер перед вставкой
    containerRef.current.innerHTML = '';

    // Создаем специальный контейнер для Vignette Banner
    const adContainer = document.createElement('div');
    adContainer.id = `monetag-vignette-${zoneId}`;
    adContainer.className = 'vignette-banner-container';
    
    // Создаем скрипт для Vignette Banner
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://baithoph.net/400/${zoneId}';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.setAttribute('data-zone', '${zoneId}');
        script.setAttribute('data-format', 'vignette');
        document.head.appendChild(script);
      })();
    `;

    adContainer.appendChild(script);
    containerRef.current.appendChild(adContainer);

    // Добавляем обработчик для мобильных устройств
    const handleMobileOptimization = () => {
      if (window.innerWidth <= 768) {
        adContainer.style.margin = '1rem';
        adContainer.style.borderRadius = '12px';
        adContainer.style.minHeight = '120px';
      }
    };

    handleMobileOptimization();
    window.addEventListener('resize', handleMobileOptimization);

    return () => {
      window.removeEventListener('resize', handleMobileOptimization);
    };
  }, [zoneId]);

  return (
    <div
      ref={containerRef}
      className={`vignette-banner ${className}`}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
        margin: '1rem 0',
        position: 'relative',
        ...adStyle,
      }}
    >
      {/* Fallback content while loading */}
      <div className="vignette-banner-content">
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          padding: '1rem',
          color: 'white',
          textAlign: 'center',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.875rem'
        }}>
          📱 Բեռնվում է Vignette Banner...
        </div>
      </div>
    </div>
  );
};

export default VignetteBannerAd;

