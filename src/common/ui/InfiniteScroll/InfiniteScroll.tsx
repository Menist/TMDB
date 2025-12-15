import {useEffect} from "react";

type InfiniteScrollProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean
  onLoadMore: () => void;
}
export const InfiniteScroll = ({onLoadMore, isFetchingNextPage, hasNextPage}: InfiniteScrollProps) => {
  useEffect(() => {
    const handleWindowScroll = () => {
      const scrolled = window.innerHeight + window.scrollY;
      const fullHeight = document.body.offsetHeight;
      if (fullHeight - scrolled < 300 && hasNextPage && !isFetchingNextPage){
        onLoadMore()
      }
    }
    window.addEventListener('scroll', handleWindowScroll)
    return ()=> window.removeEventListener('scroll', handleWindowScroll)
  }, [hasNextPage, isFetchingNextPage, onLoadMore])

  return (
    <></>
  )
}