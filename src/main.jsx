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
import EventDetail from "./pages/EventDetail.jsx";
import VideoPage from "./pages/VideoPage.jsx"; // 1. Import the new VideoPage component

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/events", element: <Events /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/team", element: <Team /> },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/event/:id", element: <EventDetail /> },
  { path: "/watch-recap", element: <VideoPage /> }, // 2. Add the new route for the video page
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);