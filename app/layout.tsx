import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-static";

const title = "행운번호 | 중복 없는 로또 번호 생성기";
const description = "중복 방식을 골라 로또 번호 5줄을 만들고, 동행복권의 최근 당첨번호도 확인합니다.";
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
      <head>
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
