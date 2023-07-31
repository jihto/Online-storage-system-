import React, { ReactNode, useEffect, useState } from 'react';
import ExcelLogo from 'public/images/excel_logo.png';
import DocsLogo from 'public/images/docs_logo.png';
import TextLogo from 'public/images/text_logo.png';

import Image from 'next/image'; 

interface TypeFileProps {
    name: string;
    type: string; 
}

interface FileDisplayProps{
    file: Blob | TypeFileProps;
}

function isBlob(file: Blob | TypeFileProps): file is Blob {
    return file instanceof Blob;
}

const FileDisplay:React.FC<FileDisplayProps> = ({ file }) => {
    const [fileContent, setFileContent] = useState<null | string>(null);
    useEffect(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
            setFileContent(event.target?.result?.toString() ?? null);
        };  
        if(isBlob(file)){ 
            if (file.type.includes('text')) 
                reader.readAsText(file);
            else if (file.type.includes('image')) 
                reader.readAsDataURL(file);
            else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) 
                reader.readAsBinaryString(file);
            else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) 
                reader.readAsArrayBuffer(file);
            else 
                reader.readAsBinaryString(file);
        }
        else{ 
            setFileContent(file.type)
        }
        
    }, [file]);
    if (file.type.includes('image') || file.type.includes('.jpg')) {
        return (
            <div>
                {fileContent 
                    ? (<div className='rounded-l p-1 max-w-full max-h-[150px]'>
                            <Image alt={file.name}
                                src={isBlob(file) ? fileContent : `http://localhost:3333/uploads/images/${fileContent}`} 
                                // className='bg-white rounded-lg object-cover w-auto h-[120px]'
                                width={300}
                                height={150}
                            />  
                            <p className='text-sm text-gray-600 whitespace-nowrap break-words overflow-hidden'>{file.name}</p>
                        </div>)
                    : ( <p>No file image content to display</p> )
                }
            </div>
            );
    } else if (file.type.includes('text') ) {
        return (
            <div>
                {file.name
                    ? ( <pre className='shadow-lg rounded-lg bg-gray-500 p-1 w-full max-h-[150px]'>
                            <Image src={TextLogo} alt={file.name} className='bg-white rounded-lg object-cover w-auto h-[120px]'/>  
                            <p className='flex gap-2 justify-center items-center text-white text-sm mt-1'>
                                {file.name}
                            </p>
                        </pre> ) 
                    : ( <p>No file text content to display</p>)
                }
            </div>
        );
    } else if (file.type.includes('.docs') || file.type.includes('.docx') || file.type.includes('.doc')) {
        return (
            <div>
                {fileContent 
                    ? ( <pre className='shadow-lg rounded-lg bg-blue-500 p-1 w-full max-h-[150px]'>
                            <Image src={DocsLogo} alt={file.name} className='bg-white rounded-lg object-cover w-full max-h-[120px] '/>  
                            <p className='flex gap-2 justify-center items-center text-white text-sm mt-1'>
                                {file.name}
                            </p>
                        </pre> ) 
                    : ( <p>No file word content to display</p>)
                }
            </div>
        );
    } else if (file.type.includes('.xls') || file.type.includes('.xlsx')) {
        return (
            <div>
                {fileContent 
                    ? (<div className='shadow-lg rounded-lg bg-green-500 w-full max-h-[150px]'>
                            <Image src={ExcelLogo} alt={file.name} className='rounded-lg p-1 w-full max-h-[120px]'/>  
                            <p className='text-sm p-1 text-white flex justify-center items-center gap-2'>
                                {file.name}
                            </p>
                    </div>) 
                    : ( <p>No file excel content to display</p>)
                }
            </div>
        );
    } else {
        return (
            <div className='shadow-lg rounded-lg bg-green-500 w-full max-h-[150px]'>
                <Image src={ExcelLogo} alt={file.name} className='rounded-lg p-1 max-h-[120px]'/>  
                <p className='text-sm p-1 text-white flex justify-center items-center gap-2'>
                    {/* {file.name} */}
                </p>
            </div>
        );
    }
}

export default FileDisplay