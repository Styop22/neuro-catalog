// MonetagScript.jsx - Правильная интеграция для автоматического размещения
import React, { useEffect } from 'react';

const MonetagScript = () => {
  useEffect(() => {
    // Функция для загрузки Vignette Banner с задержкой после закрытия
    const loadVignetteBanner = (zoneId, delay = 0) => {
      setTimeout(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://baithoph.net/400/${zoneId}`;
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.setAttribute('data-zone', zoneId);
        
        // Добавляем обработчик для отслеживания закрытия рекламы
        script.onload = () => {
          // Отслеживаем события закрытия рекламы
          const checkAdClosed = () => {
            // Monetag создает элементы с определенными классами
            const adElements = document.querySelectorAll('[id*="monetag"], [class*="monetag"], [data-zone]');
            
            adElements.forEach(element => {
              // Отслеживаем клики по кнопке закрытия
              const closeButtons = element.querySelectorAll('[class*="close"], [class*="dismiss"], [onclick*="close"]');
              closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                  console.log(`Реклама закрыта для зоны ${zoneId}, перезагрузка через 15-20 секунд`);
                  
                  // Случайная задержка от 15 до 20 секунд
                  const randomDelay = Math.floor(Math.random() * 5000) + 15000; // 15-20 секунд
                  
                  setTimeout(() => {
                    loadVignetteBanner(zoneId);
                  }, randomDelay);
                });
              });
            });
          };
          
          // Проверяем через небольшую задержку, чтобы элементы успели загрузиться
          setTimeout(checkAdClosed, 1000);
        };
        
        document.head.appendChild(script);
      }, delay);
    };

    // Загружаем рекламные зоны с небольшими интервалами
    loadVignetteBanner('MONETAG_ZONE_1', 0);      // Сразу
    loadVignetteBanner('MONETAG_ZONE_2', 2000);   // Через 2 секунды
    loadVignetteBanner('MONETAG_ZONE_3', 4000);   // Через 4 секунды

    // Добавляем основной скрипт Monetag
    const mainScript = document.createElement('script');
    mainScript.type = 'text/javascript';
    mainScript.innerHTML = `
      (function() {
        // Настройки для мобильной оптимизации
        window.monetagConfig = {
          mobile: window.innerWidth <= 768,
          autoReload: true,
          reloadDelay: 15000 // 15 секунд базовая задержка
        };
        
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://baithoph.net/tag.min.js';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        document.head.appendChild(script);
      })();
    `;
    document.head.appendChild(mainScript);

    // Глобальный обработчик для отслеживания закрытия рекламы
    const handleAdEvents = () => {
      // Отслеживаем изменения в DOM для новых рекламных элементов
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Проверяем, является ли это рекламным элементом Monetag
              if (node.id && (node.id.includes('monetag') || node.id.includes('baithoph'))) {
                console.log('Новый рекламный элемент обнаружен:', node.id);
                
                // Добавляем обработчик закрытия через небольшую задержку
                setTimeout(() => {
                  const closeButton = node.querySelector('[class*="close"], [onclick*="close"], [title*="close"], [title*="Close"]');
                  if (closeButton) {
                    closeButton.addEventListener('click', () => {
                      console.log('Реклама закрыта, перезагрузка через 15-20 секунд');
                      
                      // Случайная задержка от 15 до 20 секунд
                      const randomDelay = Math.floor(Math.random() * 5000) + 15000;
                      
                      setTimeout(() => {
                        // Перезагружаем рекламу
                        const zoneId = node.getAttribute('data-zone') || 'MONETAG_ZONE_1';
                        loadVignetteBanner(zoneId);
                      }, randomDelay);
                    });
                  }
                }, 500);
              }
            }
          });
        });
      });

      // Начинаем наблюдение за изменениями в DOM
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    };

    // Запускаем обработчик событий
    handleAdEvents();

    // Оптимизация для мобильных устройств
    const optimizeForMobile = () => {
      if (window.innerWidth <= 768) {
        // Добавляем CSS для мобильной оптимизации Monetag
        const style = document.createElement('style');
        style.innerHTML = `
          /* Оптимизация Monetag для мобильных */
          [id*="monetag"], [class*="monetag"] {
            max-width: 100% !important;
            margin: 0 auto !important;
          }
          
          /* Улучшение видимости кнопки закрытия на мобильных */
          [class*="close"], [onclick*="close"] {
            min-width: 44px !important;
            min-height: 44px !important;
            font-size: 18px !important;
          }
        `;
        document.head.appendChild(style);
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

