// Monetag Ad Component
import React from 'react';

const MonetagAd = ({ zoneId, adType = 'vignette', adStyle = {} }) => {
  const adRef = React.useRef(null);

  React.useEffect(() => {
    if (adRef.current && zoneId) {
      const adContainer = adRef.current;
      adContainer.innerHTML = '';

      if (adType === 'vignette') {
        const vignetteDiv = document.createElement('div');
        vignetteDiv.id = `monetag-vignette-${zoneId}`;
        vignetteDiv.className = 'monetag-vignette-banner';
        vignetteDiv.setAttribute('data-zone', zoneId);
        adContainer.appendChild(vignetteDiv);

        // Delay ad init to wait for script load
        setTimeout(() => {
          if (window[`show_${zoneId}`]) {
            try {
              window[`show_${zoneId}`]();
            } catch (e) {
              console.error('Monetag vignette error:', e);
            }
          } else {
            console.warn(`Monetag show_${zoneId} is not available yet`);
          }
        }, 1000); // Wait 1 second for script to load
      }

      else if (adType === 'inpage') {
        const inpageDiv = document.createElement('div');
        inpageDiv.id = `monetag-inpage-${zoneId}`;
        inpageDiv.className = 'monetag-inpage-banner';
        inpageDiv.setAttribute('data-zone', zoneId);
        adContainer.appendChild(inpageDiv);

        setTimeout(() => {
          if (window[`show_${zoneId}`]) {
            try {
              window[`show_${zoneId}`]();
            } catch (e) {
              console.error('Monetag in-page error:', e);
            }
          } else {
            console.warn(`Monetag show_${zoneId} is not available yet`);
          }
        }, 1000);
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

