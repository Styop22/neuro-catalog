// Monetag Script Loader Component
import React from 'react';

const MonetagScript = () => {
  React.useEffect(() => {
    // Load Monetag scripts for different ad zones
    const loadMonetagScript = (zoneId) => {
      const existingScript = document.querySelector(`script[data-zone="${zoneId}"]`);
      if (!existingScript) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://alwingulla.com/88/tag.min.js`;
        script.setAttribute('data-zone', zoneId);
        script.setAttribute('data-sdk', `show_${zoneId}`);
        document.head.appendChild(script);
      }
    };

    // Load scripts for different ad zones
    // These zone IDs will be replaced with actual Monetag zone IDs
    loadMonetagScript('MONETAG_ZONE_1'); // Top banner
    loadMonetagScript('MONETAG_ZONE_2'); // Middle banner  
    loadMonetagScript('MONETAG_ZONE_3'); // Bottom banner

  }, []);

  return null; // This component doesn't render anything
};

export default MonetagScript;

