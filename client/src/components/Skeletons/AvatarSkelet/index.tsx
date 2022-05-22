import React, { PropsWithChildren } from 'react'

interface AvatarSkeletProps { }

const AvatarSkelet: React.FC<PropsWithChildren<AvatarSkeletProps>> = ({ }) => {
   return (
      <div className="flex items-center gap-2">
         <div className="w-[36px] h-[36px] bg-skelet_1 animate-skeleton rounded-[50%]" />
         <div className="bg-skelet_1 animate-skeleton rounded-sm w-[70px] h-4" />
      </div>
   )
}

export default AvatarSkelet;