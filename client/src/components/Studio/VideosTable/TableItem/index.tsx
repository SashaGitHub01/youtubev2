import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../../../types/video.types'
import { formatSubs } from '../../../../utils/formatSubs'
import { joinDate } from '../../../../utils/moment'
import { PenIcon, DeleteIcon } from '../../../../assets/icons'
import s from './TableItem.module.scss'
import classNames from 'classnames'

interface TableItemProps extends IVideo {
   deleteFunc: (variables: string) => Promise<string>,
   isRemoving: boolean,
   onOpen: (id: string) => void
}

const TableItem: React.FC<PropsWithChildren<TableItemProps>> = ({
   _id, deleteFunc, name, preview, description, views, isPublic, createdAt, isRemoving, onOpen
}) => {

   const handleDelete = async () => {
      await deleteFunc(_id)
   }

   const openEditor = () => {
      onOpen(_id)
   }

   return (
      <div className={`${s.item} ${classNames({
         'opacity-60 bg-gray-100 pointer-events-none': isRemoving
      })}`}
      >
         <div className={`${s.item_main}`}>
            <div className="flex gap-3">
               <div className={`w-[120px] h-[63px] shrink-0 ${classNames({
                  'bg-gray-300 flex': !preview
               })}`}
               >
                  {preview.length > 0
                     ? <img src={preview} alt="" />
                     : <div className='h-full' />}
               </div>
               <div className="overflow-hidden relative flex-auto">
                  <div className="">
                     <b className="block truncate whitespace-nowrap pb-2 typo_main font-semibold">
                        {name}
                     </b>
                  </div>
                  <div className="typo_sm">
                     <p className="line-clamp-2 text-gray1 font-light">
                        {description}
                     </p>
                  </div>
                  <div className={s.overlay} data-overlay>
                     <button onClick={openEditor}>
                        <PenIcon className='text-icon' />
                     </button>
                     <button onClick={handleDelete}>
                        <DeleteIcon className='text-icon' />
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className={s.item_right}>
            <div className={s.param}>
               <span>
                  {isPublic ? 'Public' : 'Private'}
               </span>
            </div>
            <div className={s.param}>
               <span>{joinDate(createdAt)}</span>
            </div>
            <div className={s.param}>
               <span>{formatSubs(views)}</span>
            </div>
         </div>
      </div>
   )
}

export default TableItem;