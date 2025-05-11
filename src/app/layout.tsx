import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
 
const FontMajestic = localFont({
  src: '../../public/fonts/Majestic.ttf',
});

const FontPompadur = localFont({
  src: '../../public/fonts/Pompadur.ttf',
});
 

export const metadata: Metadata = {
  title: 'Приглашение на свадьбу "Максим и Виктория"',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${FontMajestic.className} ${FontPompadur.className}`}>
        {children}
      </body>
    </html>
  );
}
