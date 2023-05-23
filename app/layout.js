import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "app/(shared)/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Appetite Lover",
  description: "Top 10 food spots on your area",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
