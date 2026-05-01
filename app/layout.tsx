import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/components/query-provider";
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
  title: "Carteira SaaS",
  description: "Gestão de carteira de investimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col">
          <header className="flex justify-between items-center px-6 py-3 bg-white border-b border-zinc-200/60">
            <Link href="/dashboard" className="text-xl font-extrabold tracking-tight">
              <span className="text-green-600">Carteira</span>
              <span className="text-zinc-900"> SaaS</span>
            </Link>
            <div className="flex items-center gap-3">
              <Show when="signed-out">
                <SignInButton>
                  <button className="border-2 border-zinc-300 hover:border-green-500 text-zinc-700 hover:text-green-600 font-medium px-5 py-2 rounded-full transition-colors">
                    Entrar
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2.5 rounded-full transition-colors">
                    Criar conta
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
