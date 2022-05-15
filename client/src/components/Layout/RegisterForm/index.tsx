import React, { PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { IUser, RegisterInput } from '../../../API/types';
import Button from '../../UI/Button/index';
import Input from '../../UI/Input';
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { AuthApi } from '../../../API/AuthApi';
import { useAuth } from '../../../context/authCtx';

interface RegisterFormProps {
   toggleType: (e: any) => void
}

const RegisterForm: React.FC<PropsWithChildren<RegisterFormProps>> = ({ toggleType }) => {
   const { fetchRegFulfilled } = useAuth()
   const { isLoading, error, mutate } = useMutation<IUser, Error, RegisterInput>(async (input: RegisterInput) => {
      return await AuthApi.register(input)
   }, {
      onSuccess: (res) => fetchRegFulfilled(res)
   })

   const schema = Yup.object().shape({
      name: Yup.string()
         .min(2, 'Min length is 2 and max is 30')
         .max(30, 'Min length is 2 and max is 30')
         .trim()
         .required('Required field'),
      email: Yup.string().email('Invalid email format').required('Required field'),
      password: Yup.string()
         .min(6, 'Min length is 6 and max is 30')
         .max(30, 'Min length is 6 and max is 30')
         .trim()
         .required('Required field'),
      password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords dont match').required('Required field')
   })

   const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
      mode: 'onChange',
      defaultValues: {
         password2: '',
         password: '',
         name: "",
         email: ''
      },
      resolver: yupResolver(schema)
   })

   const onSubmit = async (values: RegisterInput) => {
      mutate(values)
   }

   return (
      <form className="block" onSubmit={handleSubmit(onSubmit)}>
         {error
            && <div className="typo_sm text-red1">
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
               {...register('name')}
               error={errors.name?.message}
               type={'text'}
               placeholder='Username'
            />
            <Input
               {...register('password')}
               error={errors.password?.message}
               type={'password'}
               placeholder='Password'
            />
            <Input
               {...register('password2')}
               error={errors.password2?.message}
               type={'password'}
               placeholder='Confirm Password'
            />
         </div>
         <div className="flex justify-center pt-7">
            <Button type='submit' disabled={isLoading}>
               SIGN UP
            </Button>
         </div>
         <p className="typo_main text-center pt-3">
            Have an account?
            <span className='text-blue1 cursor-pointer pl-1' onClick={toggleType}>
               Sign In
            </span>
         </p>
      </form>
   )
}

export default RegisterForm;   