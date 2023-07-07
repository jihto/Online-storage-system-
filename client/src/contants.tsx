import { BsFacebook, BsGithub, BsTrash } from "react-icons/bs"
import MenuItem from "./components/sideBar/MenuItem"

import { MdContactSupport, MdFavorite, MdManageAccounts, MdOutlineFavoriteBorder, MdOutlineMailLock, MdOutlineSettingsSuggest, MdRestorePage, MdSettingsBackupRestore, MdShare } from "react-icons/md"
import { useRouter } from "next/router"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { IconType } from "react-icons"
import { ImProfile } from 'react-icons/im';
import { SideBarItemProps } from "./type"
import { RiProfileLine } from "react-icons/ri"
import { RxAvatar } from 'react-icons/rx';
import { CgPassword } from 'react-icons/cg'

export const ListMenu = [
    { 
        label:'Information:',
        lists: [
            {
                name : 'Profile',
                icon: RiProfileLine  ,
                url: '/settings/profile'
            }, 
        ]
    },{ 
        label:'Security:',
        lists: [
            {
                name: 'Change Email',  
                icon: MdOutlineMailLock,
                url: '/settings/change_email'
            },
            {
                name: 'Change Password',   
                icon: CgPassword,
                url: '/settings/change_password'
            }
            // <Link key={4} href=''></Link> ,
            // <Link key={5} href=''></Link> ,
        ]
    },{ 
        label:'Preference:',
        lists: [
            // <Link key={6} href=''>Change Password</Link> ,
            // <Link key={7} href=''>Login verification</Link> ,
        ]
    },
]

export const social_networks = [
    { name: <FcGoogle/>, color: ''},
    { name: <BsFacebook/>, color: 'text-blue-700' },
    { name: <BsGithub/>, color: '' },
];


export function getListMenu(): Array<{ label: string; lists: SideBarItemProps[] }> { 
    return [
    { 
        label:'Management',
        lists: [
            {
                name: 'Store',
                icon: MdSettingsBackupRestore,
                url: '/'
            },{
                name: 'Favorite',
                icon: MdOutlineFavoriteBorder,
                url: '/favorite'
            }
        ]
    },{ 
        label:'User Management',
        lists: [
            {
                name: 'Strash',
                icon:BsTrash, 
                url: '/strash'
            },{
                name: 'Settings',
                icon:MdOutlineSettingsSuggest,
                url: '/settings/profile'
            }
        ]
    },{ 
        label:'Accountant:',
        lists: [
            {
                name:'Contact',
                icon: MdManageAccounts,
                url: '/contact'
            }
        ]
    },
]}