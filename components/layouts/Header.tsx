import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import AuthServerButton from '../elements/AuthServerButton';

const Header = () => {
  return (
    <div className="flex py-4 px-6 border-b border-gray-300">
      <Link href={'/'}>
        <Button variant="outline">Home</Button>
      </Link>
      <Link href={'/'} className="ml-4">
        <Button variant="outline">Price</Button>
      </Link>
      <div className=' ml-auto'>
        <AuthServerButton/>
      </div>
    </div>
  );
};

export default Header;
