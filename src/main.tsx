import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import ScrollToTop from "./packages/components/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <ScrollToTop />
  </BrowserRouter>
);
