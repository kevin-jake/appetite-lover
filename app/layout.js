import "./globals.css";
import { Inter, Playball } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/hooks/useUser";
import { ModalProvider } from "@/context/ModalContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playball = Playball({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-playball",
});

export const metadata = {
  title: "Appetite Lover",
  description: "Top 10 food spots on your area",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playball.variable} ${inter.variable} `}>
        <UserProvider>
          <ModalProvider>
            <Navbar />
            {children}
            {/* <Footer /> */}
          </ModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}
