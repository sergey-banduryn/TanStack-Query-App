import { useEffect, useRef } from 'react';

function useScrollToTopOnPageChange(page, duration = 2000) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    const slowScrollToTop = (d) => {
      const scrolledElement = document.querySelector('main');
      const startPos = scrolledElement.scrollTop;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / d, 1);

        const ease = (t) => t * (2 - t);

        scrolledElement.scrollTo(0, startPos * (1 - ease(progress)));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    slowScrollToTop(duration);
  }, [page, duration]);
}

export { useScrollToTopOnPageChange };
