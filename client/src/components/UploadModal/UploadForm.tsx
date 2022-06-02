import React, { PropsWithChildren, useState } from 'react'
import { Controller } from 'react-hook-form'
import { IVideo } from '../../types/video.types'
import TextArea from '../UI/TextArea'
import Toggler from '../UI/Toggler'
import UploadFIle from './UploadFIle'
import UploadFooter from './UploadFooter'
import { useVideoMutations } from './hooks/useVideoMutations'
import UploadImage from './UploadImage'

interface UploadFormProps {
   video?: IVideo,
   onClose: () => void,
   setVideo: React.Dispatch<React.SetStateAction<IVideo | undefined>>,
   setPreview: (url: string) => void
}

const UploadForm: React.FC<PropsWithChildren<UploadFormProps>> = ({ video, setVideo, onClose, setPreview }) => {
   const [isActive, setIsActive] = useState(video?.isPublic || false)
   const [progress, setProgress] = useState(0)

   const {
      update, onChange, onImageChange,
      form: { setValue, control, handleSubmit, formState, onSubmit }
   } = useVideoMutations(setProgress, setVideo, setPreview, video);

   const togglePublic = () => {
      setIsActive(prev => {
         setValue('isPublic', !prev)
         return !prev
      })
   }

   return (
      <>
         <form className="shrink-0 flex-auto" onSubmit={handleSubmit(onSubmit)}>
            {!!video?._id
               ? <>
                  {!!update.error
                     && <div className="typo_sm text-red1 py-2">
                        {update.error.name === 'Error' ? update.error.message : 'Something went wrong...'}
                     </div>}
                  <div className="flex flex-col gap-7">
                     <Controller
                        render={({ field }) => {
                           return <TextArea
                              {...field}
                              minRows={1}
                              maxRows={3}
                              error={formState.errors.name?.message}
                              label='Title'
                              placeholder='Add title to your video'
                           />
                        }}
                        name="name"
                        control={control}
                        defaultValue={video.name || ""}
                     />
                     <Controller
                        render={({ field }) => {
                           return <TextArea
                              {...field}
                              minRows={3}
                              maxRows={8}
                              error={formState.errors.description?.message}
                              label='Description'
                              placeholder='Describe your video'
                           />
                        }}
                        name="description"
                        control={control}
                        defaultValue={video.description || ""}
                     />
                     <Controller
                        render={() => {
                           return <UploadImage
                              onChange={onImageChange}
                           />
                        }}
                        name="description"
                        control={control}
                        defaultValue={video.description || ""}
                     />
                  </div>
                  <div className="flex items-center gap-3 py-4">
                     <span className="c">
                        Open for public access:
                     </span>
                     <Toggler
                        isActive={isActive}
                        toggle={togglePublic}
                     />
                  </div>
                  <UploadFooter
                     haveVideo={!!video.video}
                     progress={progress}
                     disabled={update.isLoading || !video?.video}
                  />
               </>
               : <>
                  <UploadFIle
                     onSelect={onChange}
                  />
               </>}
         </form>
      </>
   )
}

export default UploadForm;