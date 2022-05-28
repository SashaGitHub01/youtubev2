import React, { PropsWithChildren } from 'react'
import NavList from './NavList';

interface AsideProps { }

const Aside: React.FC<PropsWithChildren<AsideProps>> = ({ }) => {

   return (
      <aside className="fixed z-40 left-0 top-0 bg-gray_lighter min-h-screen w-aside pt-header flex flex-col border-r border-solid border-r-gray-200 border-opacity-40">
         <div className="flex-auto">
            <NavList />
         </div>
         <footer className='typo_sm p-2 text-gray-500 text-center'>
            Developer - SashaGitHub01, 2022
         </footer>
      </aside>
   )
}

export default Aside;
