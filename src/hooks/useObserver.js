import { useEffect } from 'react';

const useIntersectionObserver = (loadTriggerRef, fetchNextPage, hasNextPage) => {
  useEffect(() => {
    let observer;

    if (loadTriggerRef.current && hasNextPage) {
      observer = new IntersectionObserver(
        entries => {
          entries[0].isIntersecting && fetchNextPage();
        },
        {
          threshold: 0.3,
        },
      );
      observer.observe(loadTriggerRef.current);
    }

    return () => observer?.disconnect();
  }, [loadTriggerRef, fetchNextPage, hasNextPage]);
};

export default useIntersectionObserver;
