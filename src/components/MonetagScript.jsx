// MonetagScript.jsx
import React, { useEffect } from 'react';

const MonetagScript = () => {
  useEffect(() => {
    if (document.getElementById('monetag-global-script')) return;

    const script = document.createElement('script');
    script.id = 'monetag-global-script';
    script.src = 'https://baithoph.net/tag.min.js'; // 👈 глобальный загрузчик
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
};

export default MonetagScript;
