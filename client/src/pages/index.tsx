'use client';

import type { NextPageWithLayout } from './_app'
import { ContextType, ReactElement, useCallback, useEffect, useState } from 'react'
import NestedLayout from '../components/NestedLayout' 
import Layout from '@/Layout';
import Folders from '@/components/folders/Folders'; 
import { BsThreeDotsVertical } from 'react-icons/bs'; 
import SearchInput from '@/components/inputs/SearchInput';
import { getFiles } from '@/actions/file';
import { getFolders } from '@/actions/getFolders';
import { Type } from '@/type';
import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import { RiFolderUploadFill } from 'react-icons/ri';
import useUploadModel from '@/hooks/useUploadModel';
import useSetBreadCrumb from '@/hooks/useSetBreadCrumb';
import useShowFullModal from '@/hooks/useShowFullModal';
import dateFormat from 'dateformat';
import FileDisplay from '@/components/files/FileDisplay';
import { TypeFile } from '@/components/files/File';
import { useSession } from 'next-auth/react';
export interface UserProps {
  folders: Array<Object>; 
}
export interface DataState {
    files: any[];
    kids: any[];
}

const Page: NextPageWithLayout<UserProps> = () => {    
  const [data, setData] = useState<DataState>({files: [], kids: []}); 
  const [search, setSearch] = useState<string>('');
  const uploadModel = useUploadModel();
  const breadCrumb  = useSetBreadCrumb();

  const { data: session } = useSession()
  console.log(session);

  const fetchFolders = async(search: string = '') => {
    const response = await getFolders(search);
    setData({ ...data, kids: response });
  } 

  const fetchFiles = async(search: string = '') => {
    const response = await getFiles(search);
    setData({ ...data, files: response });
  } 

  const handlelSearch = useCallback((content: string, type: Type) =>{
    if(content)
      if(type === 'file'){
        fetchFiles(content);
      }else if(type === 'folder'){
        fetchFolders(content);
      } 
  },[]);   

  useEffect(() => {
    fetchFolders(search);
  },[search]);
  const showFullModal = useShowFullModal();
  const haveOpen = showFullModal.fileOpen;
  return (
    <Container> 
      <div className='grid grid-rows-[2fr,0.5fr,6fr] h-full w-full'>
        <div className='w-ful relative rounded-lg px-4 flex justify-around'>
          <div className='absolute top-0 rounded-lg w-full h-full grid gap-5 grid-flow-col overflow-x-auto overflow-y-hidden scrollbar'>
            {
              haveOpen && haveOpen.map((item: TypeFile, index: number) => (
                <div key={index} className='w-[250px] grid p-[1px] align-top shadow-3xl text-white shadow-gray-500 rounded-lg max-h-[97%] item-bg-1'>
                  <FileDisplay file={item}/>
                  <p className='font-bold'>Time open: {dateFormat(item.date, "isoTime")}</p>
                </div>
              )) 
            } 
            </div> 
        </div>
        <div className='rounded-lg p-4 grid grid-cols-2 '> 
          <SearchInput search={search} setSearch={setSearch} onSubmitSearch={handlelSearch}/>
          <Breadcrumb setData={setData} isDelete={false}/>
        </div>
        <Folders data={data} setData={setData} icon={BsThreeDotsVertical}/> 
        <button 
            disabled={breadCrumb.idCurrent ? false : true}
            className={`disabled:opacity-50 disabled:cursor-not-allowed
            bg-default w-fit fixed bottom-10 text-white rounded-full px-8 py-3 shadow-md text-xl justify-start items-center flex gap-1 hover:shadow-lg hover:opacity-80`}
            onClick={uploadModel.onOpen}
        >
            <RiFolderUploadFill/>Upload
        </button> 
      </div> 
    </Container>
  )}


export const getLayout = (page: ReactElement) => {
  return (
    <Layout>
        <NestedLayout>
          {page}
        </NestedLayout> 
    </Layout>
  )
}
Page.getLayout = getLayout;
export default Page;
