import React, { PropsWithChildren } from 'react'
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextArea from '../../../UI/TextArea';
import { useAuth } from '../../../../context/authCtx';
import { CommentInput } from '../../../../types/comment.types';
import { useMutation } from 'react-query';
import { CommentApi } from '../../../../API/CommentApi';
import Button from '../../../UI/Button';

interface CommentsFormProps {
   id: string,
   refetch: any
}

const CommentsForm: React.FC<PropsWithChildren<CommentsFormProps>> = ({ id, refetch }) => {
   const { user } = useAuth()
   const { mutateAsync } = useMutation(async (input: CommentInput) => {
      return await CommentApi.create(id, input)
   }, {
      onSuccess: () => {
         refetch()
         reset()
      }
   })

   const schema = Yup.object().shape({
      text: Yup.string().max(1000).trim('').required(true as any)
   })

   const { reset, formState: { errors, isValid }, handleSubmit, control } = useForm<CommentInput>({
      resolver: yupResolver(schema),
      mode: 'onChange'
   })

   const onSubmit = async (val: CommentInput) => {
      await mutateAsync(val)
   }

   return (
      <>
         {!!user?._id ? <form className="pb-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
               <Controller
                  render={({ field }) => {
                     return <TextArea
                        {...field}
                        minRows={1}
                        maxRows={20}
                        type='outlined'
                        placeholder='Enter your comment'
                        error={errors.text?.message}
                     />
                  }}
                  control={control}
                  defaultValue={''}
                  name='text'
               />
            </div>
            <div className="flex justify-end py-3">
               <Button
                  disabled={!isValid}
                  type='submit'
                  color='blue'
               >
                  CREATE
               </Button>
            </div>
         </form>
            : null}
      </>
   )
}

export default CommentsForm;