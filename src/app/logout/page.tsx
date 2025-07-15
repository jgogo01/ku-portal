"use client";
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Loading from '@/components/Loading';

export default function LogoutPage() {

  useEffect(() => {
    signOut({
        callbackUrl: '/',
    });
  }, []);

  return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Loading/>
        </div>
  );
}
