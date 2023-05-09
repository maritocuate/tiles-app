'use client'

import { useState } from 'react'

import useUploadModal from '../../hooks/useUploadModal'
import Modal from '..'
import ImageUpload from '../../inputs/imageUpload'
import { FieldValues, useForm } from 'react-hook-form'
import { Input, Select, Option } from '@material-tailwind/react'

const UploadModal = () => {
    const uploadModal = useUploadModal()
    const [loading, setLoading] = useState(false)

    const categories = [
        'Humor',
        'News',
        'Info',
        'Sports'
    ]

    const {
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
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

    const bodyContent = (
        <div className="flex flex-col gap-5">
            <Input
                label="Title"
                color="purple"
            />
            <Input
                label="Description"
                color="purple"
            />
            <Select
                label="Category"
                color="purple"
            >
                {categories.map(item => (
                    <Option key={item}>
                        {item}
                    </Option>
                ))}
            </Select>
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
            onSubmit={uploadModal.onClose}
        />
    )
}

export default UploadModal