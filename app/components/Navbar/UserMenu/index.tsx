'use client'

import { useCallback, useState } from 'react'
import { BiLogInCircle } from 'react-icons/bi'
//import useRegisterModal from '../../hooks/useRegisterModal'
import useLoginModal from '../../hooks/useLoginModal'
//import { SafeUser } from '@/app/types'
//import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
    currentUser?: null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter()
    //const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    return(
        <div className="relative">
            <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                    <>
                        <div>logout</div>
                    </>
                ):(
                    <BiLogInCircle
                        onClick={loginModal.onOpen}
                        size={25}
                    />
                )}
            </div>
        </div>
    )
}

export default UserMenu