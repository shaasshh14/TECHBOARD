import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import ParticlesComponent from "../components/Particles.jsx";
import Footer from "../components/FooterCTA.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import Loader from "../components/Loader.jsx";
import city3 from "./city3.jpg";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground.jsx";


function Team() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 1.5s
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
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />

      {/* Team Section */}
      <section className="px-6 py-16 ">
         <motion.h1
    className="second mb-20 font-extrabold"
    initial={{ opacity: 0, y: 50 }}         // start hidden
    whileInView={{ opacity: 1, y: 0 }}      // animate when in view
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.3 }} // animate again if scrolled back
  >
    TEAM MEMBERS
  </motion.h1>
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
          <ProfileCard
            name="Mohit Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Mayank Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Afridi"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Anuj Kumar Sharma"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Mohit Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Mohit Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Mohit Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Mohit Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          {/* Add more cards here */}
        </div>
      </section>


  {/* SE;S */}

    <section className="px-6 py-16 ">
      <motion.h1
    className="second mb-20 font-extrabold"
    initial={{ opacity: 0, y: 50 }}         // start hidden
    whileInView={{ opacity: 1, y: 0 }}      // animate when in view
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.3 }} // animate again if scrolled back
  >
    TEAM MEMBERS
  </motion.h1>
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
          <ProfileCard
            name="Mohit Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Mayank Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Afridi"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Anuj Kumar Sharma"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Mohit Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Mohit Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Mohit Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          <ProfileCard
            name="Mohit Dhaka"
            title="Software Engineer"
            handle="ENTER NAME"
            status="Online"
            contactText="Contact Me"
            avatarUrl={city3}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
          {/* Add more cards here */}
        </div>
      </section>


      <Footer />
    </div>
  );
}

export default Team;
