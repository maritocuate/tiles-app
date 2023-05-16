'use client'

import styles from './styles.module.scss'

import { 
    Tabs,
    TabsHeader,
    Tab
} from '@material-tailwind/react'
import { AiFillFire } from 'react-icons/ai'
import { MdOutlineWatchLater } from 'react-icons/md'
import { SafeUser } from '@/app/types'

import Container from "../Container"
import UserMenu from './UserMenu'

interface NavbarProps {
    currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    return (
        <div className={`fixed w-full z-10 shadow-sm ${styles.container}`}>
            <div className="py-4">
                <Container>
                    <div className="grid grid-cols-4">
                        <div className={styles.title}>Tiles</div>
                        
                        <Tabs value={1} className="col-start-2 col-span-2" >
                            <TabsHeader>
                                <Tab className='px-8' value={1}>
                                    <AiFillFire size={20} />
                                </Tab>
                                <Tab className='px-8' value={2}>
                                    <MdOutlineWatchLater size={20} />
                                </Tab>
                            </TabsHeader>
                        </Tabs>
                        
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar