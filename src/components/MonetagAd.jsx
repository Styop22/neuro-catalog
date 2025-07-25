// MonetagAd.jsx
import React, { useEffect, useRef } from 'react';

const MonetagAd = ({ zoneId, adStyle = {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !zoneId) return;

    const existingScript = document.getElementById(`monetag-${zoneId}`);
    if (existingScript) return; // Уже вставлен

    const script = document.createElement('script');
    script.id = `monetag-${zoneId}`;
    script.src = `https://baithoph.net/400/${zoneId}`; // или замени на real Monetag JS
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
        minHeight: '100px',
        overflow: 'hidden',
        ...adStyle,
      }}
    />
  );
};

export default MonetagAd;