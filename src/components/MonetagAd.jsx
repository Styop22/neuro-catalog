// Monetag Ad Component (Fixed)
import React, { useEffect, useRef } from 'react';

const MonetagAd = ({ zoneId, adType = 'inpage', adStyle = {} }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!zoneId || adType !== 'inpage') return;

    const script = document.createElement('script');
    script.src = `https://baithoph.net/400/${zoneId}`;
    script.async = true;
    script.setAttribute('data-zone', zoneId);
    script.setAttribute('data-cfasync', 'false');
    adRef.current?.appendChild(script);
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
        ...adStyle
      }}
    />
  );
};

export default MonetagAd;
