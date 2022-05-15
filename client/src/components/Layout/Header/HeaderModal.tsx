import React, { PropsWithChildren, useState } from 'react'
import Modal from '../../UI/Modal'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm'

interface HeaderModalProps {
   handleClose: () => void,
   refs: any
}

const HeaderModal: React.FC<PropsWithChildren<HeaderModalProps>> = ({ handleClose, refs }) => {
   const [type, setType] = useState<'login' | 'reg'>('login')

   const toggleType = (e: MouseEvent) => {
      e.stopPropagation()
      if (type === 'login') return setType('reg')
      return setType('login')
   }

   return (
      <Modal
         title={type === 'login' ? 'Sign In' : 'Sign Up'}
         onClose={handleClose}
         refs={refs}
      >
         {type === 'reg'
            ? <RegisterForm toggleType={toggleType} />
            : <LoginForm toggleType={toggleType} />}
      </Modal>
   )
}

export default HeaderModal;   