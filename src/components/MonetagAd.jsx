// Monetag Ad Component
import React from 'react';

const MonetagAd = ({ zoneId, adType = 'vignette', adStyle = {} }) => {
  const adRef = React.useRef(null);

  React.useEffect(() => {
    // Create ad container for Monetag
    if (adRef.current && zoneId) {
      const adContainer = adRef.current;
      
      // Clear any existing content
      adContainer.innerHTML = '';
      
      // Create the ad element based on type
      if (adType === 'vignette') {
        // Vignette banner - small native banner
        const vignetteDiv = document.createElement('div');
        vignetteDiv.id = `monetag-vignette-${zoneId}`;
        vignetteDiv.className = 'monetag-vignette-banner';
        vignetteDiv.setAttribute('data-zone', zoneId);
        adContainer.appendChild(vignetteDiv);
        
        // Initialize vignette banner if function exists
        if (window[`show_${zoneId}`]) {
          try {
            window[`show_${zoneId}`]();
          } catch (e) {
            console.error('Monetag vignette error:', e);
          }
        }
      } else if (adType === 'inpage') {
        // In-page push banner
        const inpageDiv = document.createElement('div');
        inpageDiv.id = `monetag-inpage-${zoneId}`;
        inpageDiv.className = 'monetag-inpage-banner';
        inpageDiv.setAttribute('data-zone', zoneId);
        adContainer.appendChild(inpageDiv);
        
        // Initialize in-page banner if function exists
        if (window[`show_${zoneId}`]) {
          try {
            window[`show_${zoneId}`]();
          } catch (e) {
            console.error('Monetag in-page error:', e);
          }
        }
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

