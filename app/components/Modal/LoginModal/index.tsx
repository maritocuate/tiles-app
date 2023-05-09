'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import useLoginModal from '../../hooks/useLoginModal'
import Modal from '..'
import Button from '../../Button'
import { FcGoogle } from 'react-icons/fc'

const LoginModal = () => {
    const loginModal = useLoginModal()
    const [loading, setLoading] = useState(false)

    const handleGoogleSignIn = async () => {
        setLoading(true)
        try {
            await signIn('google')
            toast.success('Login success!')
        } catch (error) {
            toast.success('Error')
        } finally {
            setLoading(false)
        }
    }

    const bodyContent = (
        <div className="flex flex-col mt-6">
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={handleGoogleSignIn}
            />
        </div>
    )

    return(
        <Modal
            disabled={loading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Close'
            onClose={loginModal.onClose}
            body={bodyContent}
            onSubmit={loginModal.onClose}
        />
    )
}

export default LoginModal