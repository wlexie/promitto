import type { Metadata } from "next";
import { Poppins, Outfit } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./providers/ReduxProvider";

// Configure Poppins (primary font)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Configure Outfit (secondary font)
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Promitto",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${outfit.variable}`}>
      <body className="flex text-black font-poppins"> {/* Default to Poppins */}
        <ReduxProvider>
          <main className="flex-1 bg-gray-100">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}