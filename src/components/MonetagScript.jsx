// MonetagScript.jsx - Обновленный скрипт для Vignette Banner
import React, { useEffect } from 'react';

const MonetagScript = () => {
  useEffect(() => {
    // Функция для загрузки Monetag скриптов
    const loadMonetagScript = (zoneId) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://baithoph.net/400/${zoneId}`;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('data-zone', zoneId);
      script.setAttribute('data-format', 'vignette');
      document.head.appendChild(script);
    };

    // Загружаем скрипты для всех зон (замените на ваши реальные Zone ID)
    loadMonetagScript('MONETAG_ZONE_1'); // Верхний баннер
    loadMonetagScript('MONETAG_ZONE_2'); // Средний баннер  
    loadMonetagScript('MONETAG_ZONE_3'); // Нижний баннер

    // Добавляем основной скрипт Monetag
    const mainScript = document.createElement('script');
    mainScript.type = 'text/javascript';
    mainScript.innerHTML = `
      (function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://baithoph.net/tag.min.js';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        document.head.appendChild(script);
      })();
    `;
    document.head.appendChild(mainScript);

    // Оптимизация для мобильных устройств
    const optimizeForMobile = () => {
      if (window.innerWidth <= 768) {
        // Добавляем мета-тег для мобильной оптимизации
        const metaTag = document.createElement('meta');
        metaTag.name = 'monetag-mobile-optimized';
        metaTag.content = 'true';
        document.head.appendChild(metaTag);
      }
    };

    optimizeForMobile();
    window.addEventListener('resize', optimizeForMobile);

    return () => {
      window.removeEventListener('resize', optimizeForMobile);
    };
  }, []);

  return null;
};

export default MonetagScript;
