'use client'

import styles from './styles.module.scss'

import { 
    Tabs,
    TabsHeader,
    Tab
} from '@material-tailwind/react'
import { BiLogInCircle } from 'react-icons/bi'
import { AiFillFire } from 'react-icons/ai'
import { MdOutlineWatchLater } from 'react-icons/md'

import Container from "../Container"

const Navbar = () => {
    return (
        <div className={`fixed w-full z-10 shadow-sm ${styles.container}`}>
            <div className="py-4">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <div className={styles.title}>Tiles</div>
                        
                        <Tabs value={1}>
                            <TabsHeader>
                                <Tab className='px-8' value={1}>
                                    <AiFillFire size={20} />
                                </Tab>
                                <Tab className='px-8' value={2}>
                                    <MdOutlineWatchLater size={20} />
                                </Tab>
                            </TabsHeader>
                        </Tabs>
                        
                        <div><BiLogInCircle size={25} /></div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar