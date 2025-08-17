'use client';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Footer from './Footer';
import PlaidLink from './PlaidLink';

const Sidebar = ({ user }: SidebarProps) => {
  const pathName = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="mb-12 flex cursor-pointer items-center gap-2 px-1"
        >
          <Image
            src="/icons/logo-black.png"
            alt="Bankie logo"
            width={40}
            height={40}
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Softech Bankie</h1>
        </Link>
        {sidebarLinks.map((link) => {
          const isActive =
            pathName === link.route || pathName.startsWith(`${link.route}/`);

          return (
            <Link
              key={link.label}
              href={link.route}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={cn({ 'brightness-[3] invert-0': isActive })}
                />
              </div>
              <p className={cn('sidebar-label', { '!text-white': isActive })}>
                {link.label}
              </p>
            </Link>
          );
        })}

        <PlaidLink user={user} variant="primary" />
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
