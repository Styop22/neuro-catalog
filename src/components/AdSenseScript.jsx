// AdSense Script Loader Component
import React from 'react';

const AdSenseScript = () => {
  React.useEffect(() => {
    // Only load the script if it hasn't been loaded already
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6717263256105297';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
      
      // Initialize the adsbygoogle array
      window.adsbygoogle = window.adsbygoogle || [];
    }
  }, []);

  return null; // This component doesn't render anything
};

export default AdSenseScript;

