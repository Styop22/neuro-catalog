// Monetag Ad Component
import React from 'react';

const MonetagAd = ({ zoneId, adType = 'vignette', adStyle = {} }) => {
  const adRef = React.useRef(null);

  React.useEffect(() => {
    if (!zoneId || !adRef.current) return;

    const adContainer = adRef.current;
    adContainer.innerHTML = '';

    // Создаём контейнер
    const adDiv = document.createElement('div');
    adDiv.id = `monetag-${adType}-${zoneId}`;
    adDiv.className = `monetag-${adType}-banner`;
    adDiv.setAttribute('data-zone', zoneId);
    adContainer.appendChild(adDiv);

    // Пробуем вызвать show_{zoneId}
    const tryShowAd = () => {
      const showFn = window[`show_${zoneId}`];
      if (typeof showFn === 'function') {
        try {
          showFn();
        } catch (e) {
          console.error(`Monetag error in show_${zoneId}:`, e);
        }
      } else {
        setTimeout(tryShowAd, 300);
      }
    };

    tryShowAd();
  }, [zoneId, adType]);

  return (
    <div
      ref={adRef}
      className="monetag-container"
      style={{
        minHeight: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0',
        ...adStyle,
      }}
    >
      {/* Monetag Ad loads here */}
    </div>
  );
};

export default MonetagAd;