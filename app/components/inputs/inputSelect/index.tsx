'use client'

import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    Controller 
} from 'react-hook-form'
import { Select, Option } from '@material-tailwind/react'

interface InputSelectProps {
    id: string
    label: string
    options: string[]
    control: any
    disabled?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const InputSelect: React.FC<InputSelectProps> = ({
    id,
    label,
    control,
    disabled,
    options,
    register,
    errors
}) => {
    return (
        <div className="w-full relative">
            <Controller
                name={id}
                control={control}
                render={({
                    field: { onChange, value, name }
                }) => (
                    <Select
                        id={id}
                        label={label}
                        value={value}
                        name={name}
                        disabled={disabled}
                        onChange={onChange}
                        className={`${errors[id] ? 'border-rose-500' : 'border-neutral-300'}`}
                    >
                        {options.map(item => (
                            <Option key={item} value={item}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                )}
                defaultValue=''
            />
        </div>
    )
}

export default InputSelect