// ============================================================
// DAR3D MOBILE 3D OPTIMIZER
// Optimiza automáticamente todos los <model-viewer> en móvil/tablet
// ============================================================

(function() {
  'use strict';

  // Umbral: móvil + tablet (hasta 1024px)
  const IS_MOBILE_TABLET = window.innerWidth <= 1024;
  
  if (!IS_MOBILE_TABLET) {
    console.log('🖥️ Desktop detectado - optimizaciones móviles desactivadas');
    return;
  }

  console.log('📱 Móvil/Tablet detectado - aplicando optimizaciones 3D...');

  // ============================================================
  // CONFIGURACIÓN DE OPTIMIZACIONES
  // ============================================================
  const CONFIG = {
    // Renderiza a menos resolución internamente (0.6 = 60% de resolución)
    scaleFactor: 0.65,
    
    // Desactivar auto-rotate (ahorra CPU/GPU constante)
    disableAutoRotate: true,
    
    // Desactivar sombras (heavy en GPU móvil)
    disableShadows: true,
    
    // Limitar field-of-view (menos píxeles)
    fieldOfView: '35deg',
    
    // Pausar render cuando no hay interacción (ms)
    pauseAfterInactivity: 2000,
    
    // Bloquear zoom (evita problemas de scroll)
    disableZoom: true
  };

  // ============================================================
  // FUNCIÓN PRINCIPAL: Optimizar un model-viewer
  // ============================================================
  function optimizeModelViewer(mv) {
    if (!mv || mv.dataset.optimized) return;
    
    // Marcar como optimizado para no repetir
    mv.dataset.optimized = 'true';
    
    // 1️⃣ Bajar scaleFactor (GOLD para móvil)
    if (mv.renderer && typeof mv.renderer.scaleFactor !== 'undefined') {
      mv.renderer.scaleFactor = CONFIG.scaleFactor;
    }
    
    // 2️⃣ Desactivar auto-rotate
    if (CONFIG.disableAutoRotate) {
      mv.removeAttribute('auto-rotate');
      mv.autoRotate = false;
    }
    
    // 3️⃣ Desactivar sombras
    if (CONFIG.disableShadows) {
      mv.setAttribute('shadow-intensity', '0');
      mv.shadowIntensity = 0;
    }
    
    // 4️⃣ Limitar FOV
    if (CONFIG.fieldOfView) {
      mv.setAttribute('field-of-view', CONFIG.fieldOfView);
    }
    
    // 5️⃣ Bloquear zoom
    if (CONFIG.disableZoom) {
      mv.setAttribute('disable-zoom', '');
    }
    
    // 6️⃣ Pausar render cuando no hay interacción
    let interacting = false;
    let pauseTimer = null;
    
    const resetPauseTimer = () => {
      interacting = true;
      if (mv.play) mv.play();
      
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => {
        interacting = false;
        if (mv.pause) mv.pause();
      }, CONFIG.pauseAfterInactivity);
    };
    
    // Eventos que indican interacción
    ['camera-change', 'touchstart', 'touchmove', 'pointerdown'].forEach(evt => {
      mv.addEventListener(evt, resetPauseTimer, { passive: true });
    });
    
    // Iniciar timer de pausa tras carga
    mv.addEventListener('load', () => {
      pauseTimer = setTimeout(() => {
        if (!interacting && mv.pause) {
          mv.pause();
        }
      }, CONFIG.pauseAfterInactivity);
    }, { once: true });
    
    console.log('✅ Model-viewer optimizado:', mv.id || mv.src?.slice(-30));
  }

  // ============================================================
  // OBSERVER: Detectar nuevos model-viewers dinámicos
  // ============================================================
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'MODEL-VIEWER') {
          // Esperar a que el elemento esté listo
          requestAnimationFrame(() => optimizeModelViewer(node));
        }
        // También buscar dentro de nodos añadidos
        if (node.querySelectorAll) {
          node.querySelectorAll('model-viewer').forEach(mv => {
            requestAnimationFrame(() => optimizeModelViewer(mv));
          });
        }
      });
    });
  });

  // ============================================================
  // INICIALIZACIÓN
  // ============================================================
  function init() {
    // Optimizar todos los model-viewer existentes
    document.querySelectorAll('model-viewer').forEach(optimizeModelViewer);
    
    // Observar futuros model-viewer
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('🚀 DAR3D Mobile Optimizer activo');
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // También re-optimizar cuando se defina customElements (por si model-viewer carga tarde)
  if (window.customElements) {
    window.customElements.whenDefined('model-viewer').then(() => {
      document.querySelectorAll('model-viewer').forEach(optimizeModelViewer);
    }).catch(() => {});
  }

})();
