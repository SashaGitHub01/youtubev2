import React from 'react'

const VideoSkelet = () => {
   return (
      <div className={`max-w-[225px] relative block h-[180px] rounded-sm active:bg-gray-100 py-2 
          border-0 active:shadow-video overflow-hidden pointer-events-none`}
      >
         <div className="min-w-[225px] h-full max-h-[125px] skeleton">
         </div>
         <div className="pt-2 flex gap-2">
            <div className="h-7 w-7 rounded-[50%] shrink-0 skeleton" >
            </div>
            <div className="overflow-hidden flex-auto">
               <div className="w-full h-3 skeleton">
               </div>
               <div className="typo_sm font-light text-gray1 pt-1">
                  <div className="w-[30%] h-2  skeleton mb-1">

                  </div>
                  <div className="flex items-center gap-1 overflow-hidden">
                     <div className="skeleton basis-[30%]  h-2">

                     </div>
                     <div className="skeleton basis-[30%] h-2 w-full">

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default VideoSkelet