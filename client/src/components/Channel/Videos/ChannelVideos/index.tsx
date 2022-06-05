import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { VideoApi } from "../../../../API/VideoApi";
import { IVideo } from "../../../../types/video.types";
import VideoSkelet from "../../../Skeletons/VideoSkelet";
import VideoItem from "../../../VideoItem";

interface ChannelVideosProps {
   id: string
}

const ChannelVideos: React.FC<PropsWithChildren<ChannelVideosProps>> = ({ id }) => {
   const limit = 12;
   const loader = useRef<HTMLDivElement>(null)
   const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(['user videos', id], async ({ pageParam }) => {
      return await VideoApi.fetchVideosByUser({ id, limit, page: pageParam })
   }, {
      enabled: !!id,

      getNextPageParam: (lastPage, pages) => {
         if (lastPage.hasMore) {
            return Number(lastPage.page) + 1
         };
         return undefined;
      },

   })

   const handleObserver = useCallback((entries: any) => {
      const target = entries[0];
      if (target.isIntersecting) {
         fetchNextPage()
      }
   }, []);

   useEffect(() => {
      const option = {
         root: null,
         rootMargin: "0px",
         threshold: 0.75
      };
      const observer = new IntersectionObserver(handleObserver, option);
      if (loader.current) observer.observe(loader.current);

      return () => {
         if (loader.current) observer.unobserve(loader.current)
      }
   }, [handleObserver, loader.current]);

   return (
      <div className="py-4 grid grid-cols-auto gap-2 relative">
         {
            data && data.pages.map((videos) => (
               videos.data && videos.data.map((v) => (
                  <VideoItem key={v._id} {...v} />
               )))
            )
         }
         {isFetchingNextPage
            && new Array(12).fill('str', 0, 12).map((s, i) => <VideoSkelet key={i} />)}
         <div className="absolute h-1 w-1 bottom-0" ref={loader} />
      </div>
   )
}

export default ChannelVideos;   