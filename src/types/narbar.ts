export interface NavBarProps {
  isAuth?: boolean;
}

export default interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  requireAuth: boolean;
}
