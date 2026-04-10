import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "건국대 문헌정보학과 게임",
  description: "건국대학교 문헌정보학과 전공박람회 모바일 게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${notoSansKR.className} min-h-full bg-[#f8f9ff]`}>
        <div className="min-h-screen flex flex-col items-center">
          <div className="w-full max-w-[430px] min-h-screen flex flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
