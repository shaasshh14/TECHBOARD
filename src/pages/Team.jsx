import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/FooterCTA.jsx";
import Loader from "../components/Loader.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import NewProfileCard from "./NewProfileCard.jsx";
import { motion } from "framer-motion";
import AOS from "aos";

function Team() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />

      {/* Team Section */}
      <section className="px-6 py-16">
        <div className="animated-heading-container">
          <motion.div
            className="heading-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1>SECRETARIES</h1>
          </motion.div>
        </div>

        <div
          className="
    flex 
    flex-wrap 
    justify-center
  "
        >
          <NewProfileCard
            name="SHASHANK TIWARI"
            title="Software Engineer"
            description="Passionate about coding and solving problems. Always learning!"
            imageUrl="/team-images/shas.jpg"
          />
          <NewProfileCard
            name="SNEHA"
            title="Software Engineer"
            description="Focused on web development and hackathons. Loves building products."
            imageUrl="/team-images/sneha.jpg"
          />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="animated-heading-container">
          <motion.div
            className="heading-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1>DEVELOPER TEAM </h1>
          </motion.div>
        </div>

        <div
          className="
            grid 
            gap-8
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
            justify-items-center
          "
        >
          <NewProfileCard
            name="Bikash Kumar Sharma"
            title="Software Engineer"
            description="Passionate about coding and solving problems. Always learning!"
            imageUrl="/team-images/t1.png"
          />

          <NewProfileCard
            name="Aditya"
            title="Software Engineer"
            description="Focused on web development and hackathons. Loves building products."
            imageUrl="/team-images/t2.png"
          />

          <NewProfileCard
            name="Rishabh Chandel"
            title="Software Engineer"
            description="Dedicated to DSA, competitive programming, and aiming for Google."
            imageUrl="/team-images/t7.png"
          />

          <NewProfileCard
            name="Shashank Tiwari"
            title="Software Engineer"
            description="Enjoys problem-solving, system design, and teamwork."
            imageUrl="/team-images/t8.png"
          />

          {/* Extra cards */}
          <NewProfileCard
            name="Mayank Dhaka"
            title="Frontend Developer"
            description="Creative designer and developer who loves UI/UX."
            imageUrl="/team-images/t3.png"
          />

          <NewProfileCard
            name="Anuj"
            title="Backend Developer"
            description="Specializes in APIs, databases, and scalable systems."
            imageUrl="/team-images/t4.png"
          />

          <NewProfileCard
            name="Mhoit Dhaka"
            title="Fullstack Developer"
            description="Enjoys working on both frontend and backend with equal passion."
            imageUrl="/team-images/t5.png"
          />

          <NewProfileCard
            name="Afridi"
            title="AI/ML Engineer"
            description="Exploring machine learning and building intelligent applications."
            imageUrl="/team-images/t6.png"
          />
        </div>
      </section>
     {/*
      <section className="px-6 py-16">
        <div className="animated-heading-container">
          <motion.div
            className="heading-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1>DESIGN TEAM </h1>
          </motion.div>
        </div>

        <div
          className="
            grid 
            gap-8
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
            justify-items-center
          "
        >
          <NewProfileCard
            name="Vivek Negi"
            title="Software Engineer"
            description="Passionate about coding and solving problems. Always learning!"
            imageUrl="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
          />

          <NewProfileCard
            name="Mahinder"
            title="Software Engineer"
            description="Focused on web development and hackathons. Loves building products."
            imageUrl="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
          />

          <NewProfileCard
            name="Saksham"
            title="Software Engineer"
            description="Dedicated to DSA, competitive programming, and aiming for Google."
            imageUrl="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
          />

          <NewProfileCard
            name="Omendra "
            title="Software Engineer"
            description="Enjoys problem-solving, system design, and teamwork."
            imageUrl="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
          />
        </div>
      </section> 
      */}

      <Footer />
    </div>
  );
}

export default Team;
