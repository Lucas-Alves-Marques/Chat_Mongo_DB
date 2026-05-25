import { Kanit } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {

  title: "Chat Com MongoDB",
  description: "Aplicação de chat que utiliza o Mongo DB como Banco de Dados",

};

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (

    <html lang="pt-br" className={`h-full antialiased ${kanit.variable}`}>

      <body className="min-h-full flex flex-col">{children}</body>

    </html>

  );

}
