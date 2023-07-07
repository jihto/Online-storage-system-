import React, { ReactElement } from 'react';
import Modal from './Modal';
import useConfirmModal from '@/hooks/useConfirmModal';
import api from '@/helpers/api';
import { deleteFolder } from '@/helpers/helper';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

interface ConfirmModalProps{
    title: string;
    actionLabel: string; 
    warning?: boolean;
    body?:ReactElement;
}

const ConfirmModal:React.FC<ConfirmModalProps> = ({ 
    title, 
    actionLabel,  
    body,
    warning,  
}) => {
    const confirmModal = useConfirmModal();
    const router = useRouter();
    const handleBtn = async() =>{
        try {
            const response = await deleteFolder(confirmModal.data.id);
            console.log(response);
            toast.success('Delete folder successful');
            confirmModal.onClose();
            router.push(router.asPath); 
        } catch (error: any) {
            console.log(error?.message);
            toast.error(error.message);
        }
    }

    return (
        <Modal
            title={title}
            isOpen={confirmModal.isOpen}
            onClose={confirmModal.onClose}  
            actionLabel={actionLabel}
            body={body}
            onSubmit={handleBtn} 
            secondaryActionLabel="Cancel"
            secondaryAction={confirmModal.onClose} 
            warning={warning}
        />
    )
}


export default ConfirmModal
