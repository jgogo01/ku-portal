import MenuItem from '@/types/narbar';
import { Home, Link, Newspaper } from 'lucide-react';

export const protectedRoutes = [
  '/link',
];

export const ignoredPaths = [
  '/_next',
  '/api',
  '/favicon.ico',
  '/public',
  '/images',
  '/icons',
  '/manifest.json',
];

export const isIgnoredPath = (pathname: string): boolean => {
  return ignoredPaths.some(path => pathname.startsWith(path));
};

export const isProtectedRoute = (pathname: string): boolean => {
  return protectedRoutes.some(route => pathname.startsWith(route));
};

export const menuItems: MenuItem[] = [
  {
    name: 'หน้าหลัก',
    href: '/',
    icon: Home,
    requireAuth: false
  },
  {
    name: 'ข่าวสาร',
    href: '/news',
    icon: Newspaper,
    requireAuth: false
  },
  {
    name: 'ลิงก์ทั้งหมด',
    href: '/link',
    icon: Link,
    requireAuth: true
  }
];