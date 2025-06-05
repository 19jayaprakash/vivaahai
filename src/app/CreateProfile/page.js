"use client";
import React from 'react'
import ProfileCreation from '../components/Profile/profile'
import { Suspense } from 'react';

export default function Page(){
   
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className='min-h-screen'>
        <ProfileCreation />
    </div>
     </Suspense>
  )
}