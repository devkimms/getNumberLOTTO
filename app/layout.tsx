import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "행운번호 | 중복 없는 로또 번호 생성기";
const description = "1부터 45까지, 총 30개의 번호가 겹치지 않는 로또 5줄을 한 번에 생성합니다.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
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
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
