'use client'

import { useState, useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Modal from '..'
import useUploadModal from '../../hooks/useUploadModal'
import ImageUpload from '../../inputs/imageUpload'
import Input from '../../inputs/input'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import InputSelect from '../../inputs/inputSelect'
import { useRouter } from 'next/navigation'

const UploadModal = () => {
    const uploadModal = useUploadModal()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const categories = [
        'Humor',
        'News',
        'Info',
        'Sports'
    ]

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        control,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            imageSrc: '',
            title: '',
            description: ''
        },
    })

    const imageSrc = watch('imageSrc')


    const setCustomValues = (id:string, value:any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = data => {
        for(const prop in data) {
            if(!data[prop]) {
                toast.error('All fields are required')
                return
            } 
        }
        
        setLoading(true)
        axios.post('../../api/post', data)
            .then(() => {
                toast.success('Success!')
                uploadModal.onClose()
                router.refresh()
            })
            .catch(error => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-5">
            <Input
                id='title'
                label='Title'
                type='string'
                maxLength={30}
                disabled={loading}
                formatPrice={false}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='description'
                label='Description'
                type='string'
                maxLength={60}
                disabled={loading}
                formatPrice={false}
                register={register}
                errors={errors}
                required
            />
            <InputSelect
                id='category'
                label='Category'
                options={categories}
                control={control}
                register={register}
                errors={errors}
            />
            <ImageUpload
                value={imageSrc}
                onChange={value =>  setCustomValues('imageSrc', value)}
            />
        </div>
    )

    return(
        <Modal
            disabled={loading}
            isOpen={uploadModal.isOpen}
            title='Upload'
            actionLabel='Post'
            onClose={uploadModal.onClose}
            body={bodyContent}
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default UploadModal