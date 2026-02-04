import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Api from "./pages/Api";

function NotFound() {
  return (
    <main className="container stack page">
      <h1 className="h2">Page not found</h1>
      <p className="muted">That route doesn’t exist.</p>
      <a className="button" href="#/">
        Go home
      </a>
    </main>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api" element={<Api />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
