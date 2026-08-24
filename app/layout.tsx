import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-static";

const title = "행운번호 | 중복 없는 로또 번호 생성기";
const description = "1부터 45까지, 총 30개의 번호가 겹치지 않는 로또 5줄을 한 번에 생성합니다.";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://get-number-lotto.kimmmms.chatgpt.site").replace(/\/$/, "");
const imageUrl = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title: "getNumberLOTTO",
    description,
    type: "website",
    locale: "ko_KR",
    images: [{ url: imageUrl, width: 1792, height: 917, alt: "getNumberLOTTO 소셜 미리보기" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "getNumberLOTTO",
    description,
    images: [imageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
