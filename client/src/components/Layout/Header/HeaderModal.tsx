import React, { PropsWithChildren, useState } from 'react'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm'
import Modal from '../../UI/Modal'

interface HeaderModalProps {
   handleClose: () => void,
   refs?: any,
   isOpen: boolean
}

const HeaderModal: React.FC<PropsWithChildren<HeaderModalProps>> = ({ handleClose, refs, isOpen }) => {
   const [type, setType] = useState<'login' | 'reg'>('login')

   const toggleType = (e: MouseEvent) => {
      e.stopPropagation()
      if (type === 'login') return setType('reg')
      return setType('login')
   }

   return (
      <Modal
         isOpen={isOpen}
         title={type === 'login' ? 'Sign In' : 'Sign Up'}
         onClose={handleClose}
         refs={refs}
      >
         {type === 'reg'
            ? <RegisterForm toggleType={toggleType} onClose={handleClose} />
            : <LoginForm toggleType={toggleType} onClose={handleClose} />}
      </Modal>
   )
}

export default HeaderModal;   