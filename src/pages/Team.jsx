 import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Spline from "@splinetool/react-spline";
import ParticlesComponent from "../components/Particles.jsx";
import Footer from "../components/FooterCTA.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import Loader from "../components/Loader.jsx";
import city3 from "./city3.jpg";
import city2 from "./city2.jpg";
function Team() {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 5-6 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 5000ms = 5 seconds (change to 6000 if you want 6s)

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    // While loading, show only loader
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader/>
      </div>
    );
  }
  return (
    <div>
      <ParticlesComponent id="particles" />
      <Header />

      {/* <section className="h-screen  xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-mt-40 ml-10 mb-7 rounded-full relative overflow-hidden">


      </section> */}

      <div className="flex flex-wrap justify-center gap-5 p-5">
        <ProfileCard className="mt-40 ml-10 mb-7 rounded-full"
          name="Javi A. Torres"
          title="Software Engineer"
          handle="Mayank babu"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city3}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
         <ProfileCard className="mt-40 ml-10 mb-7 rounded-full"
          name="Javi A. Torres"
          title="Software Engineer"
          handle="Mayank babu"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city3}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
         <ProfileCard className="mt-40 ml-10 mb-7 rounded-full"
          name="Javi A. Torres"
          title="Software Engineer"
          handle="Mayank babu"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city3}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
         <ProfileCard className="mt-40 ml-10 mb-7 rounded-full"
          name="Javi A. Torres"
          title="Software Engineer"
          handle="Mayank babu"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city3}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
         <ProfileCard className="mt-40 ml-10 mb-7 rounded-full"
          name="Javi A. Torres"
          title="Software Engineer"
          handle="Mayank babu"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city3}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
         <ProfileCard className="mt-40 ml-10 mb-7 rounded-full"
          name="Javi A. Torres"
          title="Software Engineer"
          handle="Mayank babu"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city3}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
         <ProfileCard className="mt-40 ml-10 mb-7 rounded-full"
          name="Javi A. Torres"
          title="Software Engineer"
          handle="Mayank babu"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city3}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
          <ProfileCard className="mt-40 ml-10 mb-7 rounded-full"
          name="Javi A. Torres"
          title="Software Engineer"
          handle="Mayank babu"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city3}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
          <ProfileCard className="mt-40 ml-10 mb-7 rounded-full"
          name="Javi A. Torres"
          title="Software Engineer"
          handle="Mayank babu"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city3}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Team;