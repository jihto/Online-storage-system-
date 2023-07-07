import React, { MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
import Modal from './Modal'
import useShowFullModal from '@/hooks/useShowFullModal'
import Image from 'next/image';
import { AiOutlineDelete, AiOutlineDownload } from 'react-icons/ai';
import { MdFavoriteBorder, MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import ExcelLogo from 'public/images/excel_logo.png';
import DocsLogo from 'public/images/docs_logo.png';
import TextLogo from 'public/images/text_logo.png';
import { toast } from 'react-hot-toast';
import { favoriteFile, unFavoriteFile } from '@/actions/favoriteFile';


const ShowFullModal = () => {
    const showFullModal = useShowFullModal();  
    const url = showFullModal.url;
    const Content:() => JSX.Element | null = () => {
        if(url.includes('jpg'))
            return(
                <img 
                    className='rounded-xl border-base border-gray-300 max-h-[700px] object-cover m-auto' 
                    src={`http://localhost:3333/uploads/images/${url}`} 
                    alt={url}
                /> 
            ) 
        else if((url.includes('.docs') || url.includes('.docx') || url.includes('.doc')) ){
            return(
                <Image src={DocsLogo} className='rounded-xl border-base border-gray-300' alt={url}/>
            )
        } 
        else if((url.includes('.xls') || url.includes('.xlsx')) ){
            return(
                <Image src={ExcelLogo} className='rounded-xl border-base border-gray-300' alt={url}/>
            )
        }
        else
            return null
    }

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    useEffect(()=>{
        setIsFavorite(showFullModal.isFavorited);
    },[showFullModal.isFavorited])
    console.log(showFullModal.isFavorited)
    const handleFavorite = () => {
            if(!isFavorite) {
                favoriteFile(showFullModal.id)
                    .then(result => toast.success(result.message))
                    .catch(err => toast.error(err.message))                
            }
            if(isFavorite){
                unFavoriteFile(showFullModal.id)
                    .then(result => toast.success(result.message))
                    .catch(err => toast.error(err.message))                
            } 
            setIsFavorite(prev=>!prev); 
    }
    const body:JSX.Element | null = (
        <>
            <Content/>
            <div className='mt-4 flex justify-center gap-5'>
                <button className='shadow-lg hover:shadow-xl rounded-full p-1 hover:scale-110 hover:opacity-75'>
                    <AiOutlineDownload size={30}/>
                </button>
                <button className='shadow-lg hover:shadow-xl rounded-full p-1 hover:scale-110 hover:opacity-75'>
                    <MdOutlineDriveFileRenameOutline size={30}/>
                </button>
                <button className='shadow-lg hover:shadow-xl rounded-full p-1 hover:scale-110 hover:opacity-75'>
                    <AiOutlineDelete size={30}/>
                </button> 
                <button className='shadow-lg hover:shadow-xl rounded-full p-1 hover:scale-110 hover:opacity-75' onClick={handleFavorite}>
                    <MdFavoriteBorder className={`${isFavorite ? 'text-red-600' : 'text-black'}`} size={30}/>
                </button> 
            </div> 
        </>
    )
    return (
        <Modal 
            isOpen={showFullModal.isOpen}
            onClose={showFullModal.onClose}
            title={showFullModal.name}
            body={body}
        />
    )
}

export default ShowFullModal