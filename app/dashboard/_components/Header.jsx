"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
  const path = usePathname();
  
  useEffect(() => {
      console.log(path);
  }, [path]);

  return (
      <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              MockMate
          </a>
          <nav className='hidden md:flex space-x-8'>
              <Link href="/dashboard" className={`text-gray-600 hover:text-purple-600 transition-colors ${path === '/dashboard' ? 'text-purple-600 font-bold' : ''}`}>
                  Dashboard
              </Link>
              <Link href="/dashboard/questions/Questions" className={`text-gray-600 hover:text-purple-600 transition-colors ${path === '/dashboard/questions' ? 'text-purple-600 font-bold' : ''}`}>
                  Questions
              </Link>
             
              <Link href="/dashboard/how" className={`text-gray-600 hover:text-purple-600 transition-colors ${path === '/dashboard/how' ? 'text-purple-600 font-bold' : ''}`}>
                  How it Works?
              </Link>
          </nav>
          <UserButton />
      </div>
  );
}


export default Header

