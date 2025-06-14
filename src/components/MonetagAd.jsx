import React, { useEffect, useRef } from 'react';

const MonetagAd = ({ zoneId, adStyle = {} }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!zoneId || !adRef.current) return;

    const container = adRef.current;

    // Удаляем старый контент
    container.innerHTML = '';

    const adDiv = document.createElement('div');
    adDiv.id = `monetag-inpage-${zoneId}`;
    adDiv.className = 'monetag-inpage-banner';
    adDiv.setAttribute('data-zone', zoneId);
    container.appendChild(adDiv);

    const script = document.createElement('script');
    script.src = `https://baithoph.net/400/${zoneId}`;
    script.async = true;
    script.setAttribute('data-zone', zoneId);
    script.setAttribute('data-cfasync', 'false');
    container.appendChild(script);
  }, [zoneId]);

  return (
    <div
      ref={adRef}
      className="monetag-container"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90px',
        ...adStyle
      }}
    />
  );
};

export default MonetagAd;
