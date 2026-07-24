import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[], offsetPercent = 30) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `-${offsetPercent}% 0px -${100 - offsetPercent - 20}% 0px`,
      threshold: 0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offsetPercent]);

  return activeSection;
}
