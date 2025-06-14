// AdSense integration component
import React from 'react';

const AdSenseAd = ({ adSlot, adFormat = 'auto', adStyle = {} }) => {
  React.useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="adsense-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...adStyle }}
        data-ad-client="ca-pub-6717263256105297" // Placeholder - will be replaced with actual client ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseAd;

