import {useCallback, useEffect, useRef} from 'react'

type UseInfiniteScrollParams = {
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetching: boolean
}

export const useInfiniteScroll = ({fetchNextPage, hasNextPage, isFetching,}: UseInfiniteScrollParams) => {
  const observerRef = useRef<HTMLDivElement>(null)


  const loadMoreHandler = useCallback(() => {

    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetching, fetchNextPage])

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMoreHandler()
        }
      },
      {
        root: null, 
        rootMargin: '100px', 
        threshold: 0.1, 
      }
    )

    const currentObserverRef = observerRef.current
    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [loadMoreHandler])

  return {observerRef}
}
