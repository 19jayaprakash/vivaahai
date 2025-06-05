import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "./components/Music/MusicContext";
import { ToastContainer } from "react-toastify";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vivaah AI",
  description: "Vivaah AI an elite matrimony",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        <MusicProvider>
        {children}
        </MusicProvider>
      </body>
    </html>
  );
}
