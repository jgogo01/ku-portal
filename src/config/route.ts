import MenuItem from '@/types/narbar';
import { Home, Link, Newspaper, Play, ShieldUser } from 'lucide-react';
import { env } from '@/env.mjs';
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
  },
  {
    name: 'กำลังใช้งานอยู่',
    href: env.NEXT_PUBLIC_KU_ALL_ACT_APPCATION_URL,
    icon: Play,
    requireAuth: true
  },
  {
    name: 'ประวัติการใช้งาน',
    href: env.NEXT_PUBLIC_KU_ALL_ACT_LOGIN_AUDIT_CLIENT_ID,
    icon: ShieldUser,
    requireAuth: true
  }
];