// MonetagScript.jsx
import React, { useEffect } from 'react';

const MonetagScript = () => {
  useEffect(() => {
    // Удалим старый скрипт если есть
    const existing = document.getElementById('monetag-global-script');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = 'monetag-global-script';
    script.src = 'https://baithoph.net/tag.min.js';
    script.async = true;

    script.onload = () => {
      // Вызываем обработку всех монетаг контейнеров
      if (window.monetag) {
        window.monetag.init();
      }
    };

    document.head.appendChild(script);
  }, []);

  return null;
};

export default MonetagScript;
