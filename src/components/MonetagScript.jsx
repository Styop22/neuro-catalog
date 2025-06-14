// Monetag Script Loader Component
import React from 'react';

const MonetagScript = () => {
  React.useEffect(() => {
    const loadMonetagScript = (zoneId) => {
      const scriptId = `monetag-script-${zoneId}`;
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://alwingulla.com/88/tag.min.js`; // ✅ официальный рабочий скрипт
        script.setAttribute('data-zone', zoneId);
        script.setAttribute('data-cfasync', 'false');
        document.head.appendChild(script);
      }
    };

    // Загрузка всех зон
    loadMonetagScript('9449269'); // TopBanner
    loadMonetagScript('9449275'); // CenterBlock
    loadMonetagScript('9449278'); // BottomBanner
  }, []);

  return null;
};

export default MonetagScript;
