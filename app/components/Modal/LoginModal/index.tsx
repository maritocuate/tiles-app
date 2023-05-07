'use client'

import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import { toast } from 'react-hot-toast'

import useLoginModal from '../../hooks/useLoginModal'
import useRegisterModal from '../../hooks/useRegisterModal'
import Input from '../../inputs/input'
import Modal from '..'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        setLoading(true)
        
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then(callback => {
            setLoading(false)

            if(callback?.ok) {
                toast.success('Logged in')
                router.refresh()
                loginModal.onClose()
            }

            if(callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    const toggleModal = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal , registerModal]) 

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                id='email'
                label='Email'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <div className="flex flex-row justify-center items-center gap-2">
                <div>
                    First time using Tiles?
                </div>
                <div
                    onClick={toggleModal}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                    Create an account
                </div>
            </div>
        </div>
    )

    return(
        <Modal
            disabled={loading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            body={bodyContent}
            onSubmit={handleSubmit(onSubmit)}
            footer={footerContent}
        />
    )
}

export default LoginModal