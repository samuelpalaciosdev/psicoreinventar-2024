'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { SidebarNavItem } from '@/types';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icons } from './icons';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[];
}

export default function Sidebar({ className, items }: SidebarProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className={cn('pb-12 hidden lg:block', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2 space-y-1'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Welcome back</h2>
          {items.map((item, index) => {
            const Icon = Icons[item.icon || 'aperture'];
            return (
              item.title && (
                <Link
                  key={index}
                  className={cn(
                    path === item.href
                      ? buttonVariants({ variant: 'secondary' })
                      : buttonVariants({ variant: 'ghost' }),
                    'w-full justify-start'
                  )}
                  href={item.disabled ? '/' : item.href}
                >
                  <span
                    className={cn(
                      'group flex items-center rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      path === item.href ? 'bg-accent' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                  >
                    <Icon className='mr-2 h-4 w-4' />

                    <span>{item.title}</span>
                  </span>
                </Link>
              )
            );
          })}
        </div>
      </div>
    </nav>
  );
}