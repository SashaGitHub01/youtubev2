import React, { PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { IUser, LoginInput, RegisterInput } from '../../../../../types/user.types';
import Button from '../../../../UI/Button/index';
import Input from '../../../../UI/Input';
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthApi } from '../../../../../API/AuthApi';
import { useAuth } from '../../../../../context/authCtx';

interface LoginFormProps {
   toggleType: (e: any) => void,
   onClose: () => void
}

const LoginForm: React.FC<PropsWithChildren<LoginFormProps>> = ({ toggleType, onClose }) => {
   const { fetchLoginFulfilled, ...other } = useAuth()
   const { error, isLoading, mutate } = useMutation<IUser, Error, LoginInput>(async (input: LoginInput) => {
      return await AuthApi.login(input)
   }, {
      onSuccess: (data) => {
         fetchLoginFulfilled(data)
         onClose()
      }
   })

   const schema = Yup.object().shape({
      email: Yup.string().email('Invalid email format').required('Required field'),
      password: Yup.string()
         .min(6, 'Min length is 6 and max is 30')
         .max(30, 'Min length is 6 and max is 30')
         .trim()
         .required('Required field'),
   })

   const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
      mode: 'onChange',
      defaultValues: {
         password: '',
         email: ''
      },
      resolver: yupResolver(schema)
   })

   const onSubmit = (values: RegisterInput) => {
      mutate(values)
   }

   return (
      <form className="block" onSubmit={handleSubmit(onSubmit)}>
         {!!error
            && <div className="typo_sm text-red1 py-2">
               {error.name === 'Error' ? error.message : 'Something went wrong...'}
            </div>}
         <div className="flex flex-col gap-5">
            <Input
               error={errors.email?.message}
               placeholder='Email'
               type={'text'}
               {...register('email')}
            />
            <Input
               {...register('password')}
               error={errors.password?.message}
               type={'password'}
               placeholder='Password'
            />
         </div>
         <div className="flex justify-center pt-7">
            <Button type='submit' disabled={isLoading}>
               SIGN IN
            </Button>
         </div>
         <p className="typo_main text-center pt-3">
            Don't Have an account?
            <span className='text-blue1 cursor-pointer pl-1' onClick={toggleType}>
               Sign Up
            </span>
         </p>
      </form>
   )
}

export default LoginForm;