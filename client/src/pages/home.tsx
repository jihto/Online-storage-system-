'use client';
import React from 'react'
import type { NextPageWithLayout } from './_app'
import { getLayout } from '.';
const home:NextPageWithLayout = () => {
  return (
    <div>
      <p>Hell</p>
    </div>
  )
}
home.getLayout = getLayout;
export default home