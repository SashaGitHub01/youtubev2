import * as Yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { VideoInput, IVideo } from '../../../types/video.types'
import { yupResolver } from '@hookform/resolvers/yup'
import { UseMutationResult } from 'react-query'

interface IUseUploadForm {
   video?: IVideo,
   update: UseMutationResult<IVideo, Error, {
      input: VideoInput;
      id: string;
   }, unknown>
}

export const useUploadForm = ({ video, update }: IUseUploadForm) => {
   const schema = Yup.object().shape({
      name: Yup.string()
         .max(120, 'Max length is 120')
         .required('Required field'),
      description: Yup.string()
         .max(2000, 'Min length is 6 and max is 2000')
         .trim()
   })

   const formData = useForm<VideoInput>({
      mode: 'onChange',
      resolver: yupResolver(schema)
   })

   const onUploadError = (err: Error) => {
      formData.setError('video', { message: err.message })
   }

   const onSubmit = async (values: VideoInput) => {
      try {
         if (!video?._id) return;
         await update.mutateAsync({ id: video?._id, input: values })
      } catch (err) {
         console.log(err);
      }
   }

   return { ...formData, onUploadError, onSubmit }
}