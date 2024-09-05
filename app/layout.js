import Footer from "@/components/core/Footer";
import Header from "@/components/core/Header";
import { Providers } from "@/redux/provider";
import "bootstrap/dist/css/bootstrap.min.css";


export const metadata = {
  title: "Task and Resourse Management",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
        <link className="Icon" rel="icon" href="/favicon/download.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>
          <main className="container-fluid">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
