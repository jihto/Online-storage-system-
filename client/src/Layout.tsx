'use client'
import React, { useEffect, useState } from 'react'; 
import UploadModel from './components/modals/UploadModel';
import NewFolderModal from './components/modals/NewFolderModal';
import Folder from './components/folders/Folder';
import useConfirmModal from '@/hooks/useConfirmModal';
import ConfirmModal from './components/modals/ConfirmModal';
import { Toaster } from 'react-hot-toast';
import ShowFullModal from './components/modals/ShowFullModal'; 
import { NextRouter, useRouter } from 'next/router';
import { getCurrentUser } from './actions/getDataUser';
import UserModal from './components/modals/UserModal';

interface LayoutProps{
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {  
  const confirmModal = useConfirmModal(); 
  const [currentUser, setCurrentUser] = useState<null | any>(null);
  const router: NextRouter = useRouter()
  useEffect(()=>{ 
      getCurrentUser()
        .then(data => setCurrentUser(data))
        .catch(error => router.replace('/auth'));
  },[])  
  return ( 
    <>
      <Toaster />
      <UploadModel/> 
      <NewFolderModal/>
      <ShowFullModal/> 
      { currentUser && <UserModal currentUser={currentUser}/> } 
      <ConfirmModal 
          title="Do you wan't delete this folder?"
          actionLabel='Delete' 
          body={
            <>
              <Folder/>
              <p className='text-center'>{confirmModal.data.name}</p>
            </>
          } 
          warning={true}
      />  
          <main> 
              {children}
          </main>
      {/* <Footer/> */}
    </> 
  )
}
export default Layout;