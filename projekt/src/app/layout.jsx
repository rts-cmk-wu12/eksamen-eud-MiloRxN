import Header from "@/components/ui/header";
import "./globals.css";
import Footer from "@/components/ui/footer";

export const metadata = {
  title: {
    template: "%s | SwapHub",
    default: "SwapHub"
  },
  description: "SwapHub is an application that aims to make it easier for users to swap their old stuff with other users.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col min-h-screen mx-20`}>
        <Header/>
        <main className="flex-1 mx-20 px-8">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
