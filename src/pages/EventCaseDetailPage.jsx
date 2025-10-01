import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import FooterCTA from "../components/FooterCTA.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import Loader from "../components/Loader.jsx";

// Data for the cases, which should be consistent with Events.jsx
const cases = [
    { id: 1, title: "The Crimson Quill", description: "Cryptic letters signed with crimson ink appear across the city.", image: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 2, title: "Echoes of the Past", description: "An old photograph surfaces, holding a clue to a decades-old mystery.", image: "https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 3, title: "The Silent Witness", description: "The only witness is a parrot who speaks only in riddles. Time to decipher.", image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 4, title: "The Midnight Cipher", description: "A coded message, intercepted at midnight, points to a secret society.", image: "https://images.pexels.com/photos/2117283/pexels-photo-2117283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 5, title: "Phantom's Fortune", description: "A rumored treasure is hidden within a haunted opera house.", image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 6, title: "The Sunken Locket", description: "A diver discovers a locket in a shipwreck, containing a mysterious portrait.", image: "https://images.pexels.com/photos/761543/pexels-photo-761543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 7, title: "The Gilded Cage", description: "A prized songbird, the key to a conspiracy, has been stolen.", image: "https://images.pexels.com/photos/131723/pexels-photo-131723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 8, title: "The Counterfeit Smile", description: "A famous painting is replaced by a forgery, with a hidden message.", image: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },

];

// Helper to convert title to a URL-friendly slug
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

function EventCaseDetailPage() {
    const [loading, setLoading] = useState(true);
    const { caseSlug } = useParams();

    const eventCase = cases.find(c => slugify(c.title) === caseSlug);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-black"><Loader /></div>;
    }

    if (!eventCase) {
        return (
             <div className="relative min-h-screen overflow-hidden text-white">
                <div className="fixed inset-0 -z-10"><AnimatedBackground /></div>
                <Header />
                <main className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] px-6">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Case Not Found</h1>
                    <Link to="/events" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg">Back to Cases</Link>
                </main>
                <FooterCTA />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden text-white font-['Special_Elite',_cursive]">
            <div className="fixed inset-0 -z-10"><AnimatedBackground /></div>
            <Header />
            <main className="pt-24 pb-12 px-4 md:px-8">
                <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-70 rounded-lg shadow-lg overflow-hidden border-2 border-red-500/50">
                    <img src={eventCase.image} alt={eventCase.title} className="w-full h-80 object-cover" />
                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-yellow-300 mb-2">Case File: {eventCase.title}</h1>
                        <p className="text-lg text-gray-300 mb-6">{eventCase.description}</p>
                        <p className="text-gray-400">More details about this case would be displayed here, including clues, suspect profiles, and evidence logs.</p>
                        <Link to="/events" className="inline-block mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded">
                            Return to Investigation Board
                        </Link>
                    </div>
                </div>
            </main>
            <FooterCTA />
        </div>
    );
}

export default EventCaseDetailPage;