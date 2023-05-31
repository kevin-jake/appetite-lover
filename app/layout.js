import "./globals.css";
import { Inter, Playball } from "next/font/google";
import Navbar from "app/(shared)/Navbar";
import Footer from "app/(shared)/Footer";
import { UserProvider } from "@/hooks/useUser";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playball = Playball({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-playball",
});

export const metadata = {
  title: "Appetite Lover",
  description: "Top 10 food spots on your area",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${playball.variable} ${inter.variable} `}>
        <UserProvider>
          <Navbar />
          {children}
          {/* <Footer /> */}
        </UserProvider>
      </body>
    </html>
  );
}
