// MonetagScript.jsx - Исправленная интеграция для мобильных устройств
import React, { useEffect } from 'react';

const MonetagScript = () => {
  useEffect(() => {
    // Определяем мобильное устройство
    const isMobile = () => {
      return window.innerWidth <= 768 || 
             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Функция для загрузки рекламы с учетом мобильных устройств
    const loadMonetagAd = (zoneId, delay = 0) => {
      setTimeout(() => {
        // Удаляем предыдущие скрипты этой зоны
        const existingScripts = document.querySelectorAll(`script[data-zone="${zoneId}"]`);
        existingScripts.forEach(script => script.remove());

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.setAttribute('data-zone', zoneId);
        
        // Для мобильных используем другой подход
        if (isMobile()) {
          // Мобильная интеграция
          script.innerHTML = `
            (function() {
              var d = document;
              var s = d.createElement('script');
              s.src = 'https://baithoph.net/400/${zoneId}';
              s.async = true;
              s.setAttribute('data-cfasync', 'false');
              s.setAttribute('data-mobile', 'true');
              s.setAttribute('data-zone', '${zoneId}');
              
              // Добавляем мета-теги для мобильной оптимизации
              if (!d.querySelector('meta[name="viewport"]')) {
                var viewport = d.createElement('meta');
                viewport.name = 'viewport';
                viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=yes';
                d.head.appendChild(viewport);
              }
              
              d.head.appendChild(s);
            })();
          `;
        } else {
          // Десктопная интеграция
          script.src = `https://baithoph.net/400/${zoneId}`;
        }
        
        document.head.appendChild(script);
        
        console.log('Ad loaded for zone ' + zoneId + ' on ' + (isMobile() ? 'mobile' : 'desktop'));
      }, delay);
    };

    // Функция для обработки закрытия рекламы
    const handleAdClosure = (zoneId) => {
      console.log('Ad closed for zone ' + zoneId);
      
      // Задержка 15-20 секунд
      const delay = Math.floor(Math.random() * 5000) + 15000;
      console.log('Next show in ' + (delay/1000) + ' seconds');
      
      setTimeout(() => {
        loadMonetagAd(zoneId);
      }, delay);
    };

    // Загружаем рекламу для разных зон
    if (isMobile()) {
      // На мобильных загружаем с большими интервалами
      loadMonetagAd('9452030', 1000);   // Через 1 секунду
      loadMonetagAd('9452237', 3000);   // Через 3 секунды  
      loadMonetagAd('9452241', 5000);   // Через 5 секунд
    } else {
      // На десктопе как обычно
      loadMonetagAd('9452030', 0);
      loadMonetagAd('9452237', 2000);
      loadMonetagAd('9452241', 4000);
    }

    // Основной скрипт Monetag с мобильной оптимизацией
    const mainScript = document.createElement('script');
    mainScript.type = 'text/javascript';
    mainScript.innerHTML = `
      (function() {
        // Конфигурация для мобильных
        window.monetagConfig = {
          mobile: ${isMobile()},
          touchOptimized: true,
          autoReload: true,
          reloadDelay: 15000,
          mobileViewport: 'width=device-width, initial-scale=1.0'
        };
        
        // Загружаем основной скрипт
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://baithoph.net/tag.min.js';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.setAttribute('data-mobile', '${isMobile()}');
        
        script.onload = function() {
          console.log('Monetag main script loaded for ' + (${isMobile()} ? 'mobile' : 'desktop'));
        };
        
        document.head.appendChild(script);
      })();
    `;
    document.head.appendChild(mainScript);

    // Мобильная оптимизация CSS
    const mobileStyles = document.createElement('style');
    mobileStyles.innerHTML = `
      /* Мобильная оптимизация Monetag */
      @media (max-width: 768px) {
        [id*="monetag"], [class*="monetag"], [id*="baithoph"] {
          max-width: 100% !important;
          width: 100% !important;
          margin: 10px auto !important;
          display: block !important;
          position: relative !important;
          z-index: 9999 !important;
        }
        
        /* Улучшение видимости на мобильных */
        [class*="close"], [onclick*="close"], [title*="close"] {
          min-width: 44px !important;
          min-height: 44px !important;
          font-size: 20px !important;
          background: rgba(0,0,0,0.8) !important;
          color: white !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          touch-action: manipulation !important;
        }
        
        /* Принудительное отображение рекламы */
        iframe[src*="monetag"], iframe[src*="baithoph"] {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          max-width: 100% !important;
          height: auto !important;
          min-height: 100px !important;
        }
      }
      
      /* Общие стили для всех устройств */
      [id*="monetag"], [class*="monetag"], [id*="baithoph"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(mobileStyles);

    // Наблюдатель за DOM для отслеживания рекламы
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Проверяем рекламные элементы
            if (node.id && (node.id.includes('monetag') || node.id.includes('baithoph')) ||
                node.className && (node.className.includes('monetag') || node.className.includes('baithoph'))) {
              
              console.log('Ad element detected:', node.id || node.className);
              
              // Принудительно делаем видимым на мобильных
              if (isMobile()) {
                node.style.display = 'block';
                node.style.visibility = 'visible';
                node.style.opacity = '1';
                node.style.maxWidth = '100%';
                node.style.margin = '10px auto';
              }
              
              // Добавляем обработчик закрытия
              setTimeout(() => {
                const closeButton = node.querySelector('[class*="close"], [onclick*="close"], [title*="close"]');
                if (closeButton) {
                  closeButton.addEventListener('click', () => {
                    const zoneId = node.getAttribute('data-zone') || 'MONETAG_ZONE_1';
                    handleAdClosure(zoneId);
                  });
                  
                  closeButton.addEventListener('touchend', () => {
                    const zoneId = node.getAttribute('data-zone') || 'MONETAG_ZONE_1';
                    handleAdClosure(zoneId);
                  });
                }
              }, 1000);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'id']
    });

    // Принудительная проверка каждые 5 секунд на мобильных
    let mobileCheckInterval;
    if (isMobile()) {
      mobileCheckInterval = setInterval(() => {
        const adElements = document.querySelectorAll('[id*="monetag"], [class*="monetag"], [id*="baithoph"]');
        if (adElements.length === 0) {
          console.log('No ads found on mobile, reloading...');
          loadMonetagAd('MONETAG_ZONE_1');
        } else {
          console.log('Found ' + adElements.length + ' ad elements on mobile');
        }
      }, 10000); // Каждые 10 секунд
    }

    // Очистка при размонтировании
    return () => {
      observer.disconnect();
      if (mobileCheckInterval) {
        clearInterval(mobileCheckInterval);
      }
    };
  }, []);

  return null;
};

export default MonetagScript;

