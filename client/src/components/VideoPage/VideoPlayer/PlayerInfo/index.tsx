import classNames from 'classnames';
import React, { PropsWithChildren } from 'react'
import { FullScreenIcon, PauseIcon, PlayIcon } from '../../../../assets/icons';
import { formatTime } from '../../../../utils/formatTime';
import s from './PlayerInfo.module.scss'

interface PlayerInfoProps {
   isPlaying: boolean;
   progress: number;
   currentTime: number;
   isShowButton: boolean,
   time: number;
   togglePlay: () => void,
   toFullScreen: () => void
}

const PlayerInfo: React.FC<PropsWithChildren<PlayerInfoProps>> = ({
   isPlaying, progress, togglePlay, toFullScreen, isShowButton, currentTime, time
}) => {
   return (
      <>
         <div className={s.btn_cont} onClick={togglePlay}>
            {isPlaying
               ? isShowButton && <button className={`${s.control_btn}  ${s.pause}`}>
                  <PauseIcon />
               </button>
               : isShowButton && <button className={`${s.control_btn}`}>
                  <PlayIcon />
               </button>
            }
         </div>
         <div className={`${s.bar} z-50 relative bg-transparent -translate-y-full px-2 pt-2`}>
            <div className={`bg-gray-400 bg-opacity-70 w-full h-2 absolute left-0 top-0 z-20 ${s.progressBar}`}>
               <div
                  className={`bg-red1 h-full flex items-center justify-end`}
                  style={{
                     width: `${progress}%`
                  }}
               >
                  <div
                     className={`w-4 h-4 rounded-[50%] border border-solid border-gray-300 bg-white
                     translate-x-[50%] shrink-0 ${s.thumb}`}
                  />
               </div>
            </div>
            <div className={`${s.bar_bottom} ${classNames({
               [s.hide]: isPlaying,
            })}`}
            >
               <div className={`flex items-center gap-2`}
               >
                  <button className="text-white cursor-pointer text-2xl" onClick={togglePlay}>
                     {isPlaying
                        ? <PauseIcon />
                        : <PlayIcon />}
                  </button>
                  <div className="text-white text-sm">
                     {formatTime(currentTime)} / {formatTime(time)}
                  </div>
               </div>
               <div className="cursor-pointer" onClick={toFullScreen}>
                  <FullScreenIcon className='text-white text-2xl' />
               </div>
            </div>
         </div>
      </>
   )
}

export default PlayerInfo;