'use client';

import React, { useEffect, useState } from 'react'
import Button from '../buttons/Button';
import { GrFormClose } from 'react-icons/gr';
interface ModalProps{
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (() => void | undefined) | undefined | (() => Promise<void>);
    title: string | React.ReactElement;
    body?: React.ReactElement | null;
    footer?: React.ReactElement;
    actionLabel?: string | null;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    warning?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    disabled,
    actionLabel,
    secondaryAction,
    secondaryActionLabel,
    warning,
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    const handleSubmit = () =>{
        if(onSubmit)
            onSubmit();
    }
    const handleSecondaryAction = () =>{

    }
    const hanldeClose = () => {

    }
    useEffect(()=>{
        setShowModal(isOpen);
    },[isOpen])

    
    //Checking Modal is not open will return null in UI
    if (!isOpen) 
        return null;
    
    return (
        <div className='fixed flex pb-9 justify-center items-center z-50 outline-none overflow-x-hidden overflow-y-auto inset-0 focus:outline-none bg-neutral-800/70'>
            <div className={`relative w-full md:w-2/3 lg:w-3/6 xl:w-2/5 h-full lg:h-auto md:h-auto`}>
                {/* Content */}
                <div className={`
                    h-fit w-full transition duration-1000  bg-white shadow-lg rounded-lg 
                    ${showModal ? 'translate-y-0' : '-translate-y-full'}
                    ${showModal ? 'opacity-100' : 'opacity-0'}
                `}>
                    {/* Header */}
                    <div className={`flex w-full h-auto font-bold p-5 items-center justify-between border-b-2`}>
                        <div>{title}</div>
                        <button onClick={onClose} ><GrFormClose size={25} /></button>
                    </div>
                    {/* Body */}
                    <div className='relative p-5 flex-auto'>
                        {body}
                    </div>
                    {/* Footer */}
                    <div className='flex flex-col gap-2 px-5 pb-5'>
                        <div className='flex flex-row gap-2 items-center'>
                            {secondaryActionLabel 
                                && <Button  
                                    type='submit'
                                    disabled={disabled} 
                                    label={secondaryActionLabel} 
                                    onClick={handleSecondaryAction} 
                                />
                            }
                            {actionLabel 
                                && <Button 
                                    outline={warning}
                                    disabled={disabled} 
                                    label={actionLabel} 
                                    onClick={onSubmit} 
                                    type='submit'
                                />
                            }
                        </div>
                        {footer}
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Modal