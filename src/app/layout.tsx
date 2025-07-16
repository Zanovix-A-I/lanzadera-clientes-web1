import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lanzamiento de Clientes",
  description: "Estas a un paso de poder llegar a mi facturación mensual con tu agencia desde ahora a las próximas semanas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="w-full text-center py-8 text-gray-500 text-sm flex flex-col items-center gap-2">
          <div>
            <span>Copyright 2025 - LanzaderaClientes.ES - Todos los derechos reservados</span>
            <span className="mx-2">|</span>
            <span>Desarrollado por <a href="https://zanovix.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition">zanovix.com</a></span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <a href="/politica-privacidad" className="underline hover:text-blue-700">Política de Privacidad</a>
            <a href="/politica-cookies" className="underline hover:text-blue-700">Política de Cookies</a>
            <a href="/terminos-condiciones" className="underline hover:text-blue-700">Términos y Condiciones</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
