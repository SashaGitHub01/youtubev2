import React, { PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { RegisterInput } from '../../../API/types';
import Button from '../../UI/Button/index';
import Input from '../../UI/Input';
import { yupResolver } from '@hookform/resolvers/yup'

interface LoginFormProps {
   toggleType: (e: any) => void
}

const LoginForm: React.FC<PropsWithChildren<LoginFormProps>> = ({ toggleType }) => {

   const schema = Yup.object().shape({
      email: Yup.string().email('Invalid email format').required('Required field'),
      password: Yup.string()
         .min(6, 'Min length is 6 and max is 30')
         .max(6, 'Min length is 6 and max is 30')
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
      console.log(values);
   }


   return (
      <form className="block" onSubmit={handleSubmit(onSubmit)}>
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
            <Button type='submit'>
               SIGN IN
            </Button>
         </div>
         <p className="typo_main text-center pt-3">
            Don't Have an account?
            <span className='text-blue1 cursor-pointer pl-1' onClick={toggleType}>
               Sign In
            </span>
         </p>
      </form>
   )
}

export default LoginForm;