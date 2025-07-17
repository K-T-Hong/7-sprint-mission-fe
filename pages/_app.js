import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/reset.css";
import "@/styles/globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="layout">
        <AuthProvider>
          <Navbar />
          <main className="mainContent">
            <Component {...pageProps} />
          </main>
          <Footer />
        </AuthProvider>
      </div>
    </QueryClientProvider>
  );
}
