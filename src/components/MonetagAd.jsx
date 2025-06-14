// MonetagAd.jsx (корректный способ отображения inpage рекламы)
import React from 'react';

const MonetagAd = ({ zoneId, adStyle = {} }) => {
  return (
    <div
      className="monetag-inpage"
      data-zone={zoneId}
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
