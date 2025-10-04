import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Event data
const events = [
  {
    id: "web3-metaverse",
    displayDate: "OCT 08 2025",
    countdownDate: "2025-12-08T09:00:00",
    title: "SOLUTION 2K25",
    location: "AIT PUNE",
    description:
      "Join us at Solutions, Pune’s biggest tech fest with exciting coding, gaming, and tech events!",
    imageUrl: "upcomingEvent/solution.png",
  },
  {
    id: "ai-in-design",
    displayDate: "NOV 15 2025",
    countdownDate: "2025-11-15T10:30:00",
    title: "TECHNICAL AKRITI",
    location: "AIT PUNE",
    description:
      "Join us for Technical Akriti, our college’s exclusive tech event featuring exciting coding, gaming, and innovation challenges!",
    imageUrl: "upcomingEvent/tech.png",
  },
];

// Countdown timer
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const diff = +new Date(targetDate) - +new Date();
    if (diff <= 0) return {};
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!Object.keys(timeLeft).length)
    return <span className="event-live">Event is Live!</span>;

  return (
    <div className="countdown-timer">
      {Object.keys(timeLeft).map((key) => (
        <div key={key}>
          <span>{String(timeLeft[key]).padStart(2, "0")}</span>
          <p>{key}</p>
        </div>
      ))}
    </div>
  );
};

const UpcomingEvents = () => {
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
          color: #fff;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .section-header h1 {
          font-size: 3.2rem;
          font-weight: 700;
        }
        .section-header h1 span {
          color: #64B4FF;
          font-family: 'Roboto Mono', monospace;
        }

        .section-header p {
          font-size: 1rem;
          color: #a0a0a0;
          margin-top: 10px;
        }

        .events-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
          gap: 40px;
          width: 100%;
          max-width: 1100px;
        }

        .event-card-link {
          text-decoration: none;
        }

        .event-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(100, 180, 255, 0.2);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .event-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(100, 180, 255, 0.2);
        }

        /* --- IMAGE BOTTOM CROP --- */
        .card-image-container {
          width: 100%;
          height: 260px;
          overflow: hidden;
          position: relative;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          bottom: 0; /* Moves image down to show top */
          transition: transform 0.5s ease;
        }

        .event-card:hover .card-image {
          transform: scale(1.08);
        }

        .card-content {
          padding: 25px;
          text-align: center;
          flex-grow: 1;
        }

        .event-date {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #64B4FF;
          margin-bottom: 15px;
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .countdown-timer div {
          text-align: center;
          background: rgba(100, 180, 255, 0.1);
          padding: 8px;
          border-radius: 8px;
          min-width: 60px;
          border: 1px solid rgba(100, 180, 255, 0.2);
        }
        .countdown-timer span {
          font-size: 1.5rem;
          font-weight: 700;
        }
        .countdown-timer p {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #a0a0a0;
          margin: 0;
        }
        .event-live {
          font-size: 1rem;
          font-weight: 700;
          color: #64B4FF;
        }

        .event-title {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #fff;
        }

        .event-location {
          font-size: 0.95rem;
          color: #a0a0a0;
          margin-bottom: 15px;
        }

        .event-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #ccc;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .card-image-container {
            height: 220px;
          }
          .event-title { font-size: 1.2rem; }
        }
      `}</style>

      <section className="events-section">
        <div className="section-header">
          <h1>
            Upcoming <span>Events</span>
          </h1>
          <p>Join us for our upcoming events and connect with the tech community.</p>
        </div>

        <div className="events-container">
          {events.map((event, index) => (
            <Link
              to={`/event/${event.id}`}
              key={index}
              className="event-card-link"
            >
              <div className="event-card">
                <div className="card-image-container">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="card-image"
                  />
                </div>
                <div className="card-content">
                  {/* <p className="event-date">{event.displayDate}</p> */}
                   <h3 className="event-title">{event.title}</h3>
                  <CountdownTimer targetDate={event.countdownDate} />  
                  <p className="event-location">{event.location}</p>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default UpcomingEvents;
