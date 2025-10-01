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
import EventDetailPage from "./pages/EventDetailPage.jsx"; 
import EventCaseDetailPage from "./pages/EventCaseDetailPage.jsx"; // Import the new case detail page

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/events", element: <Events /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/team", element: <Team /> },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact/> },
  { path: "/event/:eventId", element: <EventDetailPage /> },
  { path: "/event-case/:caseSlug", element: <EventCaseDetailPage /> } // Add the new route for cases
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);