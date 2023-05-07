'use client'

import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useLoginModal from '../../hooks/useLoginModal'

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const loginModal = useLoginModal()

    return(
        <div className="relative">
            <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                    <div className='flex gap-4'>
                        <FaCloudUploadAlt
                            size={25}
                        />
                        <BiLogOutCircle 
                            onClick={() => signOut()}
                            size={25}
                        />
                    </div>
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