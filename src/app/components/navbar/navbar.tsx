import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-blue-200 text-lg grow max-w-80 flex items-center justify-center gap-4 p-8 flex-col">
      <Link href="/">Home</Link>
      <Link href="/api/auth/signin">Sign In</Link>
      <Link href="/api/auth/signout">Sign Out</Link>
    </nav>
  );
}
