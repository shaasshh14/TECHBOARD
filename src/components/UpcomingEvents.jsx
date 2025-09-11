import React, { useState, useEffect, useRef } from "react";
import { RobotSection } from "./RobotSection";

const UpcomingEvents = () => {
  const events = [
    {
      date: "OCT 08 2025",
      title: "Web3 & The Metaverse",
      location: "Virtual Conference",
      description:
        "Explore the future of the decentralized web and immersive digital experiences with industry pioneers.",
      imageUrl:
        "https://images.unsplash.com/photo-1641353989282-2b8a4a2a4b3f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      date: "NOV 15 2025",
      title: "AI in Design Summit",
      location: "San Francisco, CA",
      description:
        "A deep dive into how artificial intelligence is revolutionizing the creative process for designers.",
      imageUrl:
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      date: "DEC 02 2025",
      title: "Future of Robotics Expo",
      location: "Tokyo, Japan",
      description:
        "Witness the latest breakthroughs in automation and robotics from leading global innovators.",
      imageUrl:
        "https://images.unsplash.com/photo-1581092580497-c3a25d43907c?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const sectionRef = useRef(null);
  const [positions, setPositions] = useState({ sectionTop: 0, sectionHeight: 0 });

  // Get section position + height
  useEffect(() => {
    const updatePositions = () => {
      if (sectionRef.current) {
        setPositions({
          sectionTop: sectionRef.current.offsetTop,
          sectionHeight: sectionRef.current.offsetHeight,
        });
      }
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto+Mono:wght@400;700&display=swap');

        .events-section {
          font-family: 'Poppins', sans-serif;

          padding: 100px 5%;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          position: relative; /* important for robot absolute inside */
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .section-header h1 {
          font-size: 3.5rem;
          color: #FFFFFF;
          font-weight: 700;
          margin: 0;
        }

        .section-header h1 span {
          color: #64B4FF; 
          font-family: 'Roboto Mono', monospace;
        }
        
        .section-header p {
          font-size: 1.1rem;
          color: #a0a0a0;
          max-width: 500px;
          margin: 10px auto 0;
        }

        .events-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          width: 100%;
          max-width: 1200px;
        }

        @media (min-width: 992px) {
          .events-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .event-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(100, 180, 255, 0.2);
          border-radius: 15px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          cursor: pointer;
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .event-card:nth-child(1) { animation-delay: 0.3s; }
        .event-card:nth-child(2) { animation-delay: 0.5s; }
        .event-card:nth-child(3) { animation-delay: 0.7s; }

        .event-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(70, 130, 220, 0.15);
        }

        .card-image-container {
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .event-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-content {
          padding: 25px;
        }
        
        .event-date {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #64B4FF;
          margin-bottom: 15px;
        }

        .event-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 10px 0;
        }
        
        .event-location {
          font-size: 1rem;
          color: #a0a0a0;
          margin-bottom: 20px;
        }

        .event-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #cccccc;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section className="events-section" ref={sectionRef}>
        {/* Robot: absolute inside section */}
        <div className="absolute top-10 -left-5 z-20">
          <RobotSection
            sectionTop={positions.sectionTop}
            sectionHeight={positions.sectionHeight}
          />
        </div>

        <div className="section-header">
          <h1>
            Upcoming <span>Events</span>
          </h1>
          <p>Join us for our upcoming events and connect with the community.</p>
        </div>

        <div className="events-container">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <div className="card-image-container">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <p className="event-date">{event.date}</p>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-location">{event.location}</p>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UpcomingEvents;


