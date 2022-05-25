import React, { PropsWithChildren, useState } from 'react'
import { useMutation } from 'react-query'
import { useAuth } from '../../../../context/authCtx'
import * as Yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { VideoInput, IVideo } from '../../../../types/video.types'
import { yupResolver } from '@hookform/resolvers/yup'
import { VideoApi } from '../../../../API/VideoApi'
import TextArea from '../../../UI/TextArea'
import Toggler from '../../../UI/Toggler'
import UploadFIle from './UploadFIle'
import UploadFooter from './UploadFooter'
import { MediaApi } from '../../../../API/MediaApi'
import { IMediaRes } from '../../../../API/types'

interface UploadFormProps { }

const UploadForm: React.FC<PropsWithChildren<UploadFormProps>> = ({ }) => {
   const { error, data, isLoading, mutate } = useMutation<IVideo, Error, VideoInput>(
      'create video',
      async (input: VideoInput) => {
         return await VideoApi.createVideo(input)
      },
   );

   const { mutate: uploadMutate } = useMutation<IMediaRes, Error, FormData>(
      'upload video',
      async (data: FormData) => await MediaApi.uploadVideo(data), {
      onError: (err) => {
         setError('video', { message: err.message })
      },

      onSuccess: async (data: IMediaRes) => {
         mutate({ video: data.url })
      },
   }
   );

   const { error: updError, isLoading: updIsLoading, mutate: updMutate } = useMutation<IVideo, Error, { input: VideoInput, id: string }>(
      'update video',
      async ({ id, input }) => {
         return await VideoApi.updateVideo(id, input)
      },
   )
   const [isActive, setIsActive] = useState(false)

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
      defaultValues: {
         description: '',
         name: '',
         isPublic: false,
         preview: '',
         video: ''
      },
      resolver: yupResolver(schema)
   })

   const togglePublic = () => {
      setIsActive(prev => {
         setValue('isPublic', !prev)
         return !prev
      })
   }

   const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;
      const file = e.target.files?.[0];

      const formdata = new FormData()
      formdata.append('media', file)

      uploadMutate(formdata)
   }

   const onSubmit = (values: VideoInput) => {
      console.log(values);
   }

   return (
      <>
         <form className="shrink-0 flex-auto" onSubmit={handleSubmit(onSubmit)}>
            {!!data?._id
               ? <>
                  {!!updError
                     && <div className="typo_sm text-red1 py-2">
                        {updError.name === 'Error' ? updError.message : 'Something went wrong...'}
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
                        defaultValue=""
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
                        defaultValue=""
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
                  <UploadFooter disabled={updIsLoading} />
               </>
               : <>
                  <UploadFIle onSelect={onSelectFile} />
               </>}
         </form>
      </>
   )
}

export default UploadForm;