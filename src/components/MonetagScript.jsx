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
        script.src = `//dicouksa.com/400/${zoneId}`; // ✅ правильный src
        script.setAttribute('data-zone', zoneId);
        script.setAttribute('data-sdk', `show_${zoneId}`);
        document.head.appendChild(script);
      }
    };

    // Load scripts for different ad zones
    loadMonetagScript('9449270'); // TopBanner
    loadMonetagScript('9449276'); // CenterBlock
    loadMonetagScript('9449279'); // BottomBanner

  }, []);

  return null; // This component doesn't render anything
};

export default MonetagScript;

