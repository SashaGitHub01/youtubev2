import classNames from 'classnames';
import React, { PropsWithChildren } from 'react'
import { PauseIcon, PlayIcon } from '../../../assets/icons';
import { IVideo } from '../../../types/video.types';
import { formatTime } from '../../../utils/formatTime';
import { usePlayer } from '../hooks/usePlayer';
import s from './VideoPlayer.module.scss'

interface VideoPlayerProps {
   video: IVideo
}

const VideoPlayer: React.FC<PropsWithChildren<VideoPlayerProps>> = ({ video }) => {
   const { videoRef, state, actions } = usePlayer()

   return (
      <div className="relative">
         <div className="">
            <video
               controls={false}
               ref={videoRef}
               preload='metadata'
               src={video.video}
            />
         </div>
         <div className={s.btn_cont} onClick={actions.togglePlay}>
            {state.isPlaying
               ? state.isShowButton && <button className={`${s.control_btn}  ${s.pause}`}>
                  <PauseIcon />
               </button>
               : state.isShowButton && <button className={`${s.control_btn}`}>
                  <PlayIcon />
               </button>
            }
         </div>
         <div className="">
            <div className={`bg-slate-100 w-full h-2 absolute left-0 bottom-0 z-20`}>
               <div className={`bg-red1 h-full`} style={{
                  width: `${state.progress}%`
               }} />
            </div>
         </div>
      </div>
   )
}

export default VideoPlayer;