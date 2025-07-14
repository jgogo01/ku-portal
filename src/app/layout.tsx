import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import TRPCProvider from "@/providers/trpc";
import { NextAuthProvider } from "@/providers/session";
import "./globals.css";

const kanit = Kanit({
  subsets: ["thai"],
  weight: ["300", "400", "700"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "KU Portal",
  description: "เว็บไซต์รวบรวมการเข้าถึงบริการต่าง ๆ ของมหาวิทยาลัยเกษตรศาสตร์ ทุกวิทยาเขตผ่านระบบยืนยันตัวส่วนกลาง KU All Login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} antialiased`}>
        <NextAuthProvider>
          <TRPCProvider>
            {children}
          </TRPCProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}