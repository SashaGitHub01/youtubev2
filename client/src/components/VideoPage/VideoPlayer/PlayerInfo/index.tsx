import classNames from 'classnames';
import React, { PropsWithChildren } from 'react'
import { FullScreenIcon, PauseIcon, PlayIcon } from '../../../../assets/icons';
import { formatTime } from '../../../../utils/formatTime';
import s from './PlayerInfo.module.scss'
import Range from 'rc-slider'

interface PlayerInfoProps {
   isPlaying: boolean;
   progress: number;
   currentTime: number;
   isShowButton: boolean,
   time: number;
   togglePlay: () => void,
   toFullScreen: () => void,
   changeCurrentime: (val: number) => void;
}

const PlayerInfo: React.FC<PropsWithChildren<PlayerInfoProps>> = ({
   isPlaying, progress, togglePlay, toFullScreen, isShowButton, currentTime, time, changeCurrentime
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
            <Range
               min={0}
               max={time}
               defaultValue={0}
               value={currentTime}
               onChange={(val) => {
                  changeCurrentime(val as number)
               }}
            />
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