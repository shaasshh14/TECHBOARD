import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Events from "./pages/Events.jsx";
import Gallery from "./pages/Gallery.jsx";
import { Contact } from "./pages/Contact.jsx";
import Team from "./pages/Team.jsx";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.jsx";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/events", element: <Events /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/team", element: <Team /> },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <About /> },
  {path: "/contact", element:<Contact/>}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
