import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../../types/video.types';
import { usePlayer } from '../hooks/usePlayer';
import PlayerInfo from './PlayerInfo';
import s from './VideoPlayer.module.scss'

interface VideoPlayerProps {
   video: IVideo
}

const VideoPlayer: React.FC<PropsWithChildren<VideoPlayerProps>> = ({ video }) => {
   const { videoRef, state, actions } = usePlayer()

   return (
      <div className="relative overflow-hidden bg-black">
         <div className="">
            {video.video
               ? <video
                  controls={false}
                  ref={videoRef}
                  preload='metadata'
                  src={video.video}
                  className='w-full max-h-[85vh]'
               />
               : <div className='font-medium text-center text-[26px] py-4'>
                  Sorry, but video doesn't exist
               </div>}
         </div>
         {state.time >= 0 && video?.video
            && <PlayerInfo {...state} {...actions} />}
      </div>
   )
}

export default VideoPlayer;