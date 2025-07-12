import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/reset.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="mainContent">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
