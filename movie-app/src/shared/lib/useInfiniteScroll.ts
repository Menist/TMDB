import {useCallback, useEffect, useRef} from 'react'

type UseInfiniteScrollParams = {
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetching: boolean
}

export const useInfiniteScroll = ({fetchNextPage, hasNextPage, isFetching,}: UseInfiniteScrollParams) => {
  // Создаём ссылку на DOM элемент, который будет "триггером"
  const observerRef = useRef<HTMLDivElement>(null)

  // Обработчик загрузки - вызывается когда элемент появляется в viewport
  const loadMoreHandler = useCallback(() => {
    // Загружаем только если есть следующая страница И не идёт загрузка
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetching, fetchNextPage])

  useEffect(() => {
    // IntersectionObserver - браузерный API для отслеживания видимости элементов
    const observer = new IntersectionObserver(
      (entries) => {
        // entries - массив наблюдаемых элементов (у нас один)
        // isIntersecting = true когда элемент появился в viewport
        if (entries[0]?.isIntersecting) {
          loadMoreHandler()
        }
      },
      {
        root: null, // Отслеживаем относительно окна браузера
        rootMargin: '100px', // Начинать загрузку за 100px до появления элемента
        threshold: 0.1, // Срабатывать когда 10% элемента видимо
      }
    )

    const currentObserverRef = observerRef.current
    if (currentObserverRef) {
      // Начинаем наблюдать за элементом
      observer.observe(currentObserverRef)
    }

    // Cleanup функция - вызывается при размонтировании
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [loadMoreHandler])

  return {observerRef}
}