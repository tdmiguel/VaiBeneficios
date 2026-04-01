import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Portal de Gestão de Benefícios",
  description: "Painel administrativo completo para criação, configuração e gerenciamento de benefícios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
