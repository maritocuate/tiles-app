'use client'

import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import { toast } from 'react-hot-toast'

import useRegisterModal from '../../hooks/useRegisterModal'
import useLoginModal from '../../hooks/useLoginModal'
import Modal from '..'
import Button from '../../Button'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
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
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        setLoading(true)
        axios.post('../../api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch(error => {
                toast.error('Something Went Wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const toggleModal = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [loginModal , registerModal]) 

    const bodyContent = (
        <div className="flex flex-col mt-6">
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <div className="flex flex-row justify-center items-center gap-2">
                <div>
                    Already have an account?
                </div>
                <div
                    onClick={toggleModal}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                    Log in
                </div>
            </div>
        </div>
    )

    return(
        <Modal
            disabled={loading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Close'
            onClose={registerModal.onClose}
            body={bodyContent}
            onSubmit={()=>{}}
            footer={footerContent}
        />
    )
}

export default RegisterModal