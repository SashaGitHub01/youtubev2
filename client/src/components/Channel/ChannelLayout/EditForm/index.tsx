import React, { PropsWithChildren, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { IUser, IUserInput } from '../../../../types/user.types';
import * as Yup from 'yup'
import TextArea from '../../../UI/TextArea';
import Input from '../../../UI/Input';
import Button from '../../../UI/Button';
import UploadAvatar from './UploadAvatar';
import { useMutation } from 'react-query';
import { MediaApi } from '../../../../API/MediaApi';
import { UserApi } from '../../../../API/UserApi';
import { IMediaRes } from '../../../../API/types';
import CountriesSelector from '../../../CountriesSelector';

interface EditFormProps {
   channel: IUser
   onClose: () => void
}

const EditForm: React.FC<PropsWithChildren<EditFormProps>> = ({ channel, onClose }) => {
   const [ava, setAva] = useState<string>(channel.avatar || '');
   const [newAva, setNewAva] = useState<null | FormData>(null)

   const { mutateAsync: uploadAvatar } = useMutation<IMediaRes, Error, FormData>(async (img: FormData) => {
      return await MediaApi.uploadAatar(img)
   })
   const { mutateAsync, isLoading } = useMutation(async (input: IUserInput) => {
      await UserApi.updateUser(input)
   }, {
      onSuccess: () => onClose()
   })

   const schema = Yup.object().shape({
      name: Yup.string()
         .trim('Invalid value')
         .min(2)
         .max(40)
         .required(),
      status: Yup.string()
         .trim('Invalid value')
         .min(1)
         .max(900)
   })

   const { handleSubmit, control, formState, setError } = useForm<IUserInput & { form: string }>({
      mode: 'onChange',
      resolver: yupResolver(schema)
   })

   const onSubmit = async (values: IUserInput) => {
      console.log(values);
      // try {
      //    if (newAva) {
      //       const avatar = await uploadAvatar(newAva)
      //       await mutateAsync({ ...values, avatar: avatar.url })
      //    } else {
      //       await mutateAsync({ ...values })
      //    }
      // } catch (err: any) {
      //    setError('form', { message: err.message })
      // }
   }

   const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return;
      e.target.value = ''
      const formdata = new FormData()
      formdata.append('media', file)
      const blob = new Blob([file])
      setAva(URL.createObjectURL(blob))
      setNewAva(formdata)
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="flex gap-3">
            <div className="basis-[75%] flex flex-col gap-7 pb-3">
               <Controller
                  render={({ field }) => {
                     return <Input
                        label='Name'
                        variant='contained'
                        placeholder='Channel name'
                        error={formState.errors.name?.message}
                        {...field}
                        disabled={isLoading}
                     />
                  }}
                  name='name'
                  control={control}
                  defaultValue={channel.name}
               />
               <Controller
                  render={({ field }) => {
                     return <TextArea
                        placeholder='About your channel'
                        label='About'
                        minRows={1}
                        maxRows={11}
                        error={formState.errors.status?.message}
                        {...field}
                        disabled={isLoading}
                     />
                  }}
                  name='status'
                  control={control}
                  defaultValue={channel.status || ''}
               />
               <Controller
                  render={({ field }) => {
                     return <CountriesSelector
                        placeholder={'Your country'}
                        {...field}
                     />
                  }}
                  name='location'
                  control={control}
                  defaultValue={channel.location || ''}
               />
            </div>
            <UploadAvatar
               avatar={ava}
               onChange={onImageChange}
               disabled={isLoading}
            />
         </div>
         <div className="pt-2 flex justify-end">
            <Button className="g" type='submit' disabled={isLoading}>
               SAVE
            </Button>
         </div>
      </form>
   )
}

export default EditForm;