// MonetagAd.jsx (корректный способ отображения inpage рекламы)
import React, { useEffect, useRef } from 'react';

const MonetagAd = ({ zoneId, adStyle = {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !zoneId) return;

    // Очистим перед повторной вставкой
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = `https://baithoph.net/400/${zoneId}`;
    script.async = true;
    script.setAttribute('data-zone', zoneId);
    script.setAttribute('data-cfasync', 'false');

    containerRef.current.appendChild(script);
  }, [zoneId]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90px',
        ...adStyle,
      }}
    />
  );
};

export default MonetagAd;
