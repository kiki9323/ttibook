import { useEffect } from 'react';

const useIntersectionObserver = (loadTriggerRef, fetchNextPage, hasNextPage) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadTriggerRef.current) {
      observer.observe(loadTriggerRef.current);
    }

    return () => observer.disconnect();
  }, [loadTriggerRef, fetchNextPage, hasNextPage]);
};

export default useIntersectionObserver;
