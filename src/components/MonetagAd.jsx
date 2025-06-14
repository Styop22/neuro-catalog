// Monetag Ad Component (Final Fixed)
import React, { useEffect, useRef } from 'react';

const MonetagAd = ({ zoneId, adType = 'inpage', adStyle = {} }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!zoneId || adType !== 'inpage' || !adRef.current) return;

    // Очищаем контейнер перед вставкой скрипта
    adRef.current.innerHTML = '';

    // Создаем контейнер для рекламы
    const adDiv = document.createElement('div');
    adDiv.className = 'monetag-inpage-banner';
    adDiv.setAttribute('data-zone', zoneId);

    // Добавляем в DOM
    adRef.current.appendChild(adDiv);

    // Добавляем скрипт
    const script = document.createElement('script');
    script.src = `https://baithoph.net/400/${zoneId}`;
    script.async = true;
    script.setAttribute('data-zone', zoneId);
    script.setAttribute('data-cfasync', 'false');
    adRef.current.appendChild(script);
  }, [zoneId, adType]);

  return (
    <div
      ref={adRef}
      className="monetag-container"
      style={{
        minHeight: '90px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...adStyle,
      }}
    />
  );
};

export default MonetagAd;
