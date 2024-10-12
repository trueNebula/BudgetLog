import React from 'react';
import Link from 'next/link';
import { House, SignOut } from '@phosphor-icons/react';
import Header from '@/app/components/navbar/header.tsx';

export default function Navbar({ user }: { user: { id: string; name: string; image: string } }) {
  return (
    <nav className="bg-primary text-lg grow max-w-80 flex flex-col items-start justify-between px-4 py-8">
      <div className="flex flex-col items-start gap-8 w-full">
        <Header name={user.name} image={user.image} />
        <span className="w-full h-[2px] bg-zinc-500 rounded-full" />
        {/* TODO: Turn this into its own component */}
        <div className="flex flex-col gap-2">
          <div>Toggle Sections</div>
          <div className="section-toggle ml-8">
            <input type="checkbox" id="toggle" className="mr-2" />
            <span>Balances</span>
          </div>
          <div className="section-toggle ml-8">
            <input type="checkbox" id="toggle" className="mr-2" />
            <span>Income Streams</span>
          </div>
          <div className="section-toggle ml-8">
            <input type="checkbox" id="toggle" className="mr-2" />
            <span>Expenses</span>
          </div>
          <div className="section-toggle ml-8">
            <input type="checkbox" id="toggle" className="mr-2" />
            <span>Investments</span>
          </div>
          <div className="section-toggle ml-8">
            <input type="checkbox" id="toggle" className="mr-2" />
            <span>Savings</span>
          </div>
          <div className="section-toggle ml-8">
            <input type="checkbox" id="toggle" className="mr-2" />
            <span>Tips</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-8 w-full">
        <Link href="/" className="flex items-center gap-2">
          <House size={24} />
          <span>Home</span>
        </Link>
        <Link href="/api/auth/signout" className="flex items-center gap-2">
          <span>Sign Out</span>
          <SignOut size={24} />
        </Link>
      </div>
    </nav>
  );
}
