import React, { PropsWithChildren, useState } from 'react'
import * as Yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { VideoInput, IVideo } from '../../../../types/video.types'
import { yupResolver } from '@hookform/resolvers/yup'
import TextArea from '../../../UI/TextArea'
import Toggler from '../../../UI/Toggler'
import UploadFIle from './UploadFIle'
import UploadFooter from './UploadFooter'
import { useVideoMutations } from './hooks/useVideoMutations'

interface UploadFormProps {
   video?: IVideo,
   setVideo: React.Dispatch<React.SetStateAction<IVideo | undefined>>
}

const UploadForm: React.FC<PropsWithChildren<UploadFormProps>> = ({ video, setVideo }) => {
   const [isActive, setIsActive] = useState(video?.isPublic || false)
   const [progress, setProgress] = useState(0)

   const schema = Yup.object().shape({
      name: Yup.string()
         .max(120, 'Max length is 120')
         .required('Required field'),
      description: Yup.string()
         .max(2000, 'Min length is 6 and max is 30')
         .trim()
   })

   const { handleSubmit, formState: { errors }, setValue, setError, control } = useForm<VideoInput>({
      mode: 'onChange',
      resolver: yupResolver(schema)
   })

   const togglePublic = () => {
      setIsActive(prev => {
         setValue('isPublic', !prev)
         return !prev
      })
   }

   const onUploadError = (err: Error) => {
      setError('video', { message: err.message })
   }

   const { update, onChange } = useVideoMutations(onUploadError, setProgress, setVideo, video)

   const onSubmit = async (values: VideoInput) => {
      if (!video?._id) return;
      await update.mutateAsync({ id: video?._id, input: values })
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
                              error={errors.name?.message}
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
                              error={errors.description?.message}
                              label='Description'
                              placeholder='Describe your video'
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