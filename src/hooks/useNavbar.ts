import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react";
import { menuItems } from "@/config/route";

export const useNavbar = (isAuth: boolean = false) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [scrollY, setScrollY] = useState<number>(0);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const isAuthenticated = isAuth || (status === "authenticated" && !!session?.user);

  const getNavOpacity = () => {
    const maxScroll = 200;
    const opacity = Math.min(scrollY / maxScroll, 0.95);
    return opacity;
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    signIn("kualllogin", { callbackUrl: "/link" });
  };

  const filteredMenuItems = menuItems.filter(
    (item) => !item.requireAuth || isAuthenticated
  );

  return {
    session,
    status,
    scrollY,
    isProfileOpen,
    setIsProfileOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    profileRef,
    mobileMenuRef,
    isAuthenticated,
    getNavOpacity,
    handleLogout,
    handleNavigation,
    handleLogin,
    filteredMenuItems,
  };
};
