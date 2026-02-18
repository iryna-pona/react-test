import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}