import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "@/components/loading/loading-page";
import Providers from "@/hooks/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo List",
  description: "todo list app",
  keywords: ['Todo', 'Todo List', 'จัดลำดับข้อความ', 'bookmark'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <Providers>
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
