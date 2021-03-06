import React, { PropsWithChildren } from 'react'
import Aside from './Aside'
import Header from './Header'

interface LayoutProps { }

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children }) => {

   return (
      <div className="flex-auto flex flex-col">
         <Header />
         <Aside />
         <main className="pt-header pl-aside bg-white flex-auto flex flex-col">
            <div className="flex-auto flex flex-col">
               {children}
            </div>
         </main>
      </div>
   )
}

export default Layout;