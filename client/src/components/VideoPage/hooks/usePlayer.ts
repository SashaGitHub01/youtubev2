import { useRef, useState, useEffect, useCallback } from "react"

interface FullScrTypes {
   mozRequestFullScreen?: () => Promise<void>,
   webkitRequestFullscreen?: () => Promise<void>,
   msRequestFullscreen?: () => Promise<void>,
}

interface DocumentFullScr extends Document {
   mozCancelFullScreen: () => Promise<void>,
   webkitExitFullscreen: () => Promise<void>,
}

export const usePlayer = () => {
   const videoRef = useRef<HTMLVideoElement & FullScrTypes>(null)
   const [isPlaying, setIsPlaying] = useState(false)
   const [time, setTime] = useState(0)
   const [currentTime, setCurrentTime] = useState(0)
   const [progress, setProgress] = useState(0)
   const [isShowButton, setIsShowButton] = useState(true)

   const handleProgress = () => {
      const video = videoRef.current;
      if (!video) return;

      setCurrentTime(video.currentTime)
      setProgress(Math.ceil((video.currentTime / video.duration) * 100))
   }

   useEffect(() => {
      if (!videoRef.current?.duration) return;
      videoRef.current.currentTime = 0;
      setTime(videoRef.current?.duration)
   }, [videoRef.current?.duration])

   useEffect(() => {
      const video = videoRef.current;
      if (!video || !time) return;

      video.addEventListener('timeupdate', handleProgress)
      return () => video.removeEventListener('timeupdate', handleProgress)
   }, [time, videoRef.current])

   useEffect(() => {
      if (isPlaying) {
         videoRef.current?.play()
      } else {
         videoRef.current?.pause()
      }
   }, [isPlaying])

   const togglePlay = useCallback(() => {
      let timeout;
      setIsShowButton(true)
      if (isPlaying) {
         setIsPlaying(false)
      } else {
         setIsPlaying(true)
         timeout = setTimeout(() => setIsShowButton(false), 500)
         return;
      }
      clearTimeout(timeout)
   }, [isPlaying])

   const forward = () => {
      if (!videoRef.current?.currentTime) return;
      videoRef.current.currentTime += 10
   }

   const back = () => {
      if (!videoRef.current?.currentTime) return;
      videoRef.current.currentTime -= 10
   }

   const changeCurrentime = (val: number) => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = val;
   }

   const toFullScreen = () => {
      const video = videoRef.current;
      if (!video) return;

      try {
         if (video.requestFullscreen) {
            video.requestFullscreen();
            return
         } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
         } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
         } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
         }
      } catch (err) {
         console.log(err)
      }
   }

   const exitFullscreen = async () => {
      const video = videoRef.current;
      if (!video) return;

      const doc = document as DocumentFullScr

      if (doc.exitFullscreen) {
         doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) {
         doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) {
         doc.webkitExitFullscreen();
      }
   }

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         const tag = (e.target as any)?.tagName;
         if (tag === 'TEXTAREA' || tag === 'INPUT') return false;

         switch (e.key) {
            case ' ': {
               e.preventDefault()
               togglePlay()
               break;
            }

            case 'f': {
               toFullScreen()
               e.preventDefault()
               break;
            }

            case 'ArrowLeft': {
               back()
               break;
            }

            case 'ArrowRight': {
               forward()
               break;
            }
         }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)

   }, [videoRef.current, togglePlay])

   return {
      videoRef,
      state: {
         isPlaying,
         progress,
         currentTime,
         isShowButton,
         time
      },
      actions: {
         togglePlay,
         forward,
         back,
         toFullScreen,
         exitFullscreen,
         changeCurrentime
      }
   }
}