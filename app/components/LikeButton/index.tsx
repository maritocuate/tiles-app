'use client'

import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { SafeUser } from '@/app/types'
import useLike from '../hooks/useLike'

interface LikeButtonProps {
    postId: string
    currentUser?: SafeUser | null
}

const LikeButton: React.FC<LikeButtonProps> = ({
    postId,
    currentUser
}) => {
    const { hasLike, toggleLike } = useLike({
        postId,
        currentUser
    })

    return(
        <div
            onClick={toggleLike}
            className='relative hover:opacity-80 cursor-pointer'
        >
            <AiOutlineLike
                size={20}
                className='fill-black absolute'
            />
            <AiFillLike
                size={20}
                className={ hasLike ? 'fill-yellow-500' : 'fill-sky-100' }
            />
        </div>
    )
}

export default LikeButton