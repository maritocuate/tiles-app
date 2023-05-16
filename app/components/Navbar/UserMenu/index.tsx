'use client'

import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useLoginModal from '../../hooks/useLoginModal'
import useUploadModal from '../../hooks/useUploadModal'

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const loginModal = useLoginModal()
    const uploadModal = useUploadModal()

    return(
        <div className="flex items-center justify-end relative">
            <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                    <div className='flex gap-4'>
                        <FaCloudUploadAlt
                            onClick={uploadModal.onOpen}
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