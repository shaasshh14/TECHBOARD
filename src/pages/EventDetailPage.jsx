import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import FooterCTA from "../components/FooterCTA.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import Loader from "../components/Loader.jsx";

// In a real application, this data would likely come from a shared file or an API
const events = [
    {
      id: "web3-metaverse",
      date: "OCT 08 2025",
      title: "Web3 & The Metaverse",
      location: "Virtual Conference",
      description:
        "Explore the future of the decentralized web and immersive digital experiences with industry pioneers. This full-day event covers everything from blockchain fundamentals to the latest in VR/AR technology, with hands-on workshops and networking opportunities.",
      imageUrl:
        "https://images.unsplash.com/photo-1641353989282-2b8a4a2a4b3f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "ai-in-design",
      date: "NOV 15 2025",
      title: "AI in Design Summit",
      location: "San Francisco, CA",
      description:
        "A deep dive into how artificial intelligence is revolutionizing the creative process for designers. Join leading experts as they showcase cutting-edge tools and discuss the ethical implications of AI in creative fields.",
      imageUrl:
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "robotics-expo",
      date: "DEC 02 2025",
      title: "Future of Robotics Expo",
      location: "Tokyo, Japan",
      description:
        "Witness the latest breakthroughs in automation and robotics from leading global innovators. The expo features live demonstrations, keynote speeches from industry giants, and a look at the next generation of robotic technology.",
      imageUrl:
        "https://images.unsplash.com/photo-1581092580497-c3a25d43907c?q=80&w=2070&auto=format&fit=crop",
    },
];


function EventDetailPage() {
  const [loading, setLoading] = useState(true);
  const { eventId } = useParams();

  // Find the event data based on the ID from the URL
  const event = events.find((e) => e.id === eventId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Shorter loading time for detail pages
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="relative min-h-screen overflow-hidden text-white">
        <div className="fixed inset-0 -z-10">
          <AnimatedBackground />
        </div>
        <Header />
        <main className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] px-6">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Event Not Found</h1>
            <p className="text-gray-300 mb-8">Sorry, we couldn't find the event you were looking for.</p>
            <Link to="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 hover:scale-105">
                Go Back Home
            </Link>
        </main>
        <FooterCTA />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />
      <main className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-black bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            <img src={event.imageUrl} alt={event.title} className="w-full h-64 md:h-80 object-cover"/>
            <div className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2 md:mb-0">
                        {event.title}
                    </h1>
                    <div className="text-right">
                        <p className="text-lg font-semibold text-gray-300">{event.date}</p>
                        <p className="text-md text-gray-400">{event.location}</p>
                    </div>
                </div>
                <div className="w-full h-px bg-gray-600 my-6"></div>
                <p className="text-gray-300 leading-relaxed text-lg">
                    {event.description}
                </p>
                 <Link to="/" className="inline-block mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 hover:scale-105">
                    Back to Events
                </Link>
            </div>
        </div>
      </main>
      <FooterCTA />
    </div>
  );
}

export default EventDetailPage;
