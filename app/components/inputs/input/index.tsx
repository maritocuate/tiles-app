'use client'

import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'
import { Input as InputMaterial } from '@material-tailwind/react'
import { toast } from 'react-hot-toast'

interface InputProps {
    id: string
    label: string
    type?: string
    maxLength?: number
    disabled?: boolean
    formatPrice?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    maxLength,
    disabled,
    formatPrice,
    required,
    register,
    errors
}) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar
                size={24}  
                className="
                    text-neutral-700
                    absolute
                    top-5
                    left-2
                "/>
            )}

            <InputMaterial
                id={id}
                label={label}
                maxLength={maxLength}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                type={type}
                className={`
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9' : 'pl-4'}
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
        </div>
    )
}

export default Input