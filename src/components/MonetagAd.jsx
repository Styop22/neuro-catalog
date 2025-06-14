// Monetag Ad Component
import React from 'react';

const MonetagAd = ({ zoneId, adType = 'vignette', adStyle = {} }) => {
  const adRef = React.useRef(null);

  React.useEffect(() => {
    if (adRef.current && zoneId) {
      const adContainer = adRef.current;
      adContainer.innerHTML = '';

      const tryShowAd = () => {
        if (typeof window[`show_${zoneId}`] === 'function') {
          try {
            window[`show_${zoneId}`]();
          } catch (e) {
            console.error(`Ошибка Monetag show_${zoneId}:`, e);
          }
        } else {
          setTimeout(tryShowAd, 300); // ждем загрузки скрипта
        }
      };

      if (adType === 'vignette') {
        const vignetteDiv = document.createElement('div');
        vignetteDiv.id = `monetag-vignette-${zoneId}`;
        vignetteDiv.className = 'monetag-vignette-banner';
        vignetteDiv.setAttribute('data-zone', zoneId);
        adContainer.appendChild(vignetteDiv);
        tryShowAd();
      }

      else if (adType === 'inpage') {
        const inpageDiv = document.createElement('div');
        inpageDiv.id = `monetag-inpage-${zoneId}`;
        inpageDiv.className = 'monetag-inpage-banner';
        inpageDiv.setAttribute('data-zone', zoneId);
        adContainer.appendChild(inpageDiv);
        tryShowAd();
      }
    }
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
        ...adStyle
      }}
    >
      {/* Ad will be loaded here */}
    </div>
  );
};

export default MonetagAd;
