'use client';
import React, { memo } from 'react'
import Folder from './Folder';
import File from '../files/File';  
import { IconType } from 'react-icons';
import { State } from '@/type'; 
import { DataState } from '@/pages';

interface FoldersProps{
    data: DataState;
    setData?: React.Dispatch<React.SetStateAction<DataState>>;
    state?: State;
    icon?: IconType;
} 
const Folders: React.FC<FoldersProps> = ({ 
    data,
    setData,
    state = 'normal',
    icon: Icon,
}) => { 
    // const btnRef = useRef<{ returnFunction: () => void } | null >(null);
    if(!data)
        return null;
        console.log(data);
    return (
        <div>     
            <div className='text-gray-400 mt-4'>Folders: </div>
            <div className='w-full grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'> 
                {state === 'normal' ? <Folder isCreate={true}  setData={setData} /> : null }
                {
                    data.kids || data.files
                        ? <>
                            {  
                                data.kids.map((item, index) =>(
                                    <Folder state={state} icon={Icon} folder={item} key={index} setData={setData}/> 
                                ))
                            }
                            {
                                data.files.map((item, index)=>(
                                    <File item={item} key={index}/>
                                ))
                            }
                        </> 
                        : null
                }
            </div>
        </div>
    )
}

export default memo(Folders)