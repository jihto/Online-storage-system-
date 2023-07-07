'use client';

import React from 'react'
import File from './File';

const Files = () => {
    return (
        <div className='grid grid-cols-6 gap-2'>
            {[1,2,3].map(item => (
                <File key={item} item={item}/>
            ))}
        </div>
    )
}


export default Files;