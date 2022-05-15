import React, { PropsWithChildren } from 'react'
import notfound from '../../src/assets/404.png'

interface NotFoundProps {

}

const NotFound: React.FC<PropsWithChildren<NotFoundProps>> = ({ }) => {
   return (
      <div className="flex items-center justify-center flex-auto">
         <div className="">
            <div className="">
               <img src={notfound.src} alt="404 not found" />
            </div>
            <div className="py-5">
               <p className='text-center font-medium text-xl'>
                  <span className='font-semibold'>404</span> Page not found
               </p>
            </div>
         </div>
      </div>
   )
}

export default NotFound;