import React, { PropsWithChildren } from 'react'
import s from './Loader.module.scss'

interface LoaderProps { }

const Loader: React.FC<PropsWithChildren<LoaderProps>> = ({ }) => {
   return (
      <div className={s.spinner_cont}>
         <div className={s.spinner}></div>
      </div>
   )
}

export default Loader;