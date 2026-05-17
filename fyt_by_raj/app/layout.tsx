import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fit By Raj | Premium Nutrition & Lifestyle Consultation",
  description:
    "Discover the premium nutrition and lifestyle consultation experience of Rituraj Sharma with a stylish landing page and direct consultation request flow.",
  icons: {
    icon: "/assets/fyt-by-raj-logo.png",
    apple: "/assets/fyt-by-raj-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
