import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"

import { SafeUser } from "@/app/types"

import useLoginModal from '../useLoginModal'

interface UseLikeProps {
    postId: string
    currentUser?: SafeUser | null
}

const useLike = ({ postId, currentUser }: UseLikeProps) => {
    const router = useRouter()

    const loginModal = useLoginModal()

    const hasLike = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(postId)
    }, [currentUser, postId])

    const toggleLike = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request;

            if (hasLike) {
                request = () => axios.delete(`/api/likes/${postId}`)
            } else {
                request = () => axios.post(`/api/likes/${postId}`)
            }

            await request()
            router.refresh()
            toast.success('Success')
        } catch (error) {
            toast.error('Something went wrong')
        }
    }, 
    [
        currentUser, 
        hasLike, 
        postId, 
        loginModal,
        router
    ])

    return {
        hasLike,
        toggleLike,
    }
}

export default useLike