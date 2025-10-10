"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'sonner'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Toaster richColors position="bottom-left" />
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
};

export default AuthProvider;
