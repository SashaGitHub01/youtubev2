import { useDebounce } from "./useDebounce";
import { useQuery } from "react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { VideoApi } from "../API/VideoApi";

export const useSearch = () => {
   const [search, setSearch] = useState('')
   const query = useDebounce(search, 600)
   const [isVisible, setIsVisible] = useState(!!query)
   const { data, isFetching } = useQuery(['videos search', query], async () => {
      return await VideoApi.fetchVideos(search)
   },
      {
         enabled: !!search,
         retry: 0
      })

   useEffect(() => {
      setIsVisible(!!query)
   }, [query])

   const handler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.trim().length > 1) {
         return setSearch(e.target.value)
      }

      return setSearch('')
   }

   const onFocus = () => {
      if (!!query) setIsVisible(true)
   }

   const onBlur = () => {
      setIsVisible(false)
   }

   return { query, data, isFetching, handler, onFocus, onBlur, isVisible }
}