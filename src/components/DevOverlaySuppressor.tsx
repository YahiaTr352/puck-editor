'use client';

import { useEffect } from 'react';

export default function DevOverlaySuppressor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const hideHydrationOverlay = () => {
      const portals = document.querySelectorAll('nextjs-portal');
      portals.forEach((portal) => {
        if (portal.shadowRoot) {
          const text = portal.shadowRoot.textContent || '';
          if (
            text.includes('Hydration failed') || 
            text.includes('hydration-error') || 
            text.includes('suppressHydrationWarning') ||
            text.includes('mismatch')
          ) {
            (portal as HTMLElement).style.display = 'none';
          }
        }
      });
    };

    // Run immediately
    hideHydrationOverlay();

    // Watch for new overlays
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          hideHydrationOverlay();
        }
      }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
