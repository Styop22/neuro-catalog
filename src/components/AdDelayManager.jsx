// AdDelayManager.jsx - Управление задержками показа рекламы
import React, { useEffect } from 'react';

const AdDelayManager = () => {
  useEffect(() => {
    // Конфигурация задержек
    const AD_CONFIG = {
      minDelay: 15000,  // 15 секунд минимум
      maxDelay: 20000,  // 20 секунд максимум
      checkInterval: 1000, // Проверка каждую секунду
    };

    // Функция для генерации случайной задержки
    const getRandomDelay = () => {
      return Math.floor(Math.random() * (AD_CONFIG.maxDelay - AD_CONFIG.minDelay + 1)) + AD_CONFIG.minDelay;
    };

    // Отслеживание состояния рекламы
    const adState = {
      lastClosed: {},  // Время последнего закрытия для каждой зоны
      timers: {},      // Активные таймеры
      isVisible: {}    // Видимость рекламы
    };

    // Функция для обнаружения закрытия рекламы
    const detectAdClosure = () => {
      // Ищем элементы Monetag
      const monetagElements = document.querySelectorAll('[id*="monetag"], [class*="monetag"], [data-zone*="MONETAG"]');
      
      monetagElements.forEach(element => {
        const zoneId = element.getAttribute('data-zone') || element.id || 'unknown';
        
        // Проверяем, была ли реклама видна ранее
        if (adState.isVisible[zoneId] && !isElementVisible(element)) {
          console.log(`Реклама закрыта для зоны: ${zoneId}`);
          handleAdClosure(zoneId);
        }
        
        // Обновляем состояние видимости
        adState.isVisible[zoneId] = isElementVisible(element);
      });
    };

    // Проверка видимости элемента
    const isElementVisible = (element) => {
      if (!element) return false;
      
      const style = window.getComputedStyle(element);
      return style.display !== 'none' && 
             style.visibility !== 'hidden' && 
             style.opacity !== '0' &&
             element.offsetWidth > 0 && 
             element.offsetHeight > 0;
    };

    // Обработка закрытия рекламы
    const handleAdClosure = (zoneId) => {
      const now = Date.now();
      adState.lastClosed[zoneId] = now;
      
      // Очищаем предыдущий таймер если есть
      if (adState.timers[zoneId]) {
        clearTimeout(adState.timers[zoneId]);
      }
      
      // Устанавливаем новый таймер с задержкой
      const delay = getRandomDelay();
      console.log(`Следующий показ рекламы для зоны ${zoneId} через ${delay/1000} секунд`);
      
      adState.timers[zoneId] = setTimeout(() => {
        reloadAd(zoneId);
      }, delay);
    };

    // Перезагрузка рекламы
    const reloadAd = (zoneId) => {
      console.log(`Перезагружаем рекламу для зоны: ${zoneId}`);
      
      // Создаем новый скрипт для загрузки рекламы
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://baithoph.net/400/${zoneId}`;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('data-zone', zoneId);
      
      // Удаляем старые скрипты этой зоны
      const oldScripts = document.querySelectorAll(`script[data-zone="${zoneId}"]`);
      oldScripts.forEach(oldScript => oldScript.remove());
      
      // Добавляем новый скрипт
      document.head.appendChild(script);
      
      // Сбрасываем состояние
      delete adState.isVisible[zoneId];
      delete adState.timers[zoneId];
    };

    // Обработчик событий клавиатуры (ESC часто закрывает рекламу)
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        // Проверяем все зоны через небольшую задержку
        setTimeout(detectAdClosure, 100);
      }
    };

    // Обработчик кликов (может быть кнопка закрытия)
    const handleClick = (event) => {
      const target = event.target;
      
      // Проверяем, является ли цель кнопкой закрытия рекламы
      if (target.classList.contains('close') || 
          target.classList.contains('dismiss') ||
          target.getAttribute('title')?.toLowerCase().includes('close') ||
          target.textContent?.includes('×') ||
          target.textContent?.includes('✕')) {
        
        // Ищем родительский элемент рекламы
        let adElement = target.closest('[id*="monetag"], [class*="monetag"], [data-zone*="MONETAG"]');
        if (adElement) {
          const zoneId = adElement.getAttribute('data-zone') || adElement.id || 'unknown';
          setTimeout(() => handleAdClosure(zoneId), 100);
        }
      }
    };

    // Наблюдатель за изменениями DOM
    const observer = new MutationObserver((mutations) => {
      let hasChanges = false;
      
      mutations.forEach((mutation) => {
        // Проверяем удаленные узлы
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === 1 && 
              (node.id?.includes('monetag') || 
               node.className?.includes('monetag') ||
               node.getAttribute?.('data-zone')?.includes('MONETAG'))) {
            hasChanges = true;
          }
        });
        
        // Проверяем добавленные узлы
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && 
              (node.id?.includes('monetag') || 
               node.className?.includes('monetag') ||
               node.getAttribute?.('data-zone')?.includes('MONETAG'))) {
            hasChanges = true;
          }
        });
      });
      
      if (hasChanges) {
        setTimeout(detectAdClosure, 500);
      }
    });

    // Запускаем наблюдение
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Добавляем обработчики событий
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    // Периодическая проверка состояния рекламы
    const intervalId = setInterval(detectAdClosure, AD_CONFIG.checkInterval);

    // Очистка при размонтировании
    return () => {
      observer.disconnect();
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
      clearInterval(intervalId);
      
      // Очищаем все таймеры
      Object.values(adState.timers).forEach(timer => clearTimeout(timer));
    };
  }, []);

  return null;
};

export default AdDelayManager;

