'use client'

import Image from "next/image"
import { SafeUser, SafePosts } from "@/app/types"
import { Post } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import Button from "../../Button"

interface PostCardProps {
    data: SafePosts
    reservation?: Post
    onAction?: (id:string) => void
    disabled?: boolean
    actionLabel?: string
    actionId?: string
    currentUser?: SafeUser | null
}

const PostCard: React.FC<PostCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId='',
    currentUser
}) => {
    const router = useRouter()

    const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if(disabled) return

        onAction?.(actionId)
    }, [onAction, actionId, disabled])

    return (
        <div
            onClick={() => router.push(`/posts/${data.id}`)}
            className="
                col-span-1
                cursor-pointer
                group"
            >
            <div className="flex flex-col justify-center w-full">
                <div className="
                    aspect-[4/5] 
                    h-full 
                    relative 
                    overflow-hidden 
                    rounded-md
                    bg-white
                ">
                    <Image
                        fill
                        className="
                            object-contain 
                            h-auto 
                            w-auto 
                            group-hover:scale-105
                            transition
                        "
                        src={data.imageSrc}
                        alt="Post"
                    />
                </div>

                <div className="flex px-4 py-1 bg-white/80 rounded-b-md bottom-7 relative">
                    {
                        !reservation && (
                            <div className="font-light text-sm">{data.title}</div>
                        )
                    }
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel} 
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}

export default PostCard