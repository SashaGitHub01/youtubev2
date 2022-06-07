import React, { PropsWithChildren, useState } from 'react'
import { SearchIcon } from '../../../assets/icons'
import { useSearch } from '../../../hooks/useSearch'
import HeaderList from './HeaderList'

interface HeaderInputProps { }

const HeaderInput: React.FC<PropsWithChildren<HeaderInputProps>> = ({ }) => {
   const { handler, data, isFetching, onBlur, onFocus, isVisible } = useSearch()

   return (
      <div className="flex-auto flex items-stretch justify-center">
         <div className="max-w-[600px] flex-auto flex justify-center relative">
            <input
               type="text"
               className={`typo_md w-full relative z-10 border border-solid shadow-sm border-gray1 px-2 py-1
                       focus:border-blue1`}
               placeholder='Search...'
               onChange={handler}
               onFocus={onFocus}
               onBlur={onBlur}
            />
            {isVisible
               && <HeaderList videos={data?.data} />}
         </div>
         <button className="bg-blue1 px-2 hover:bg-blue-600">
            <SearchIcon className='text-xl text-white' />
         </button>
      </div>
   )
}

export default HeaderInput;