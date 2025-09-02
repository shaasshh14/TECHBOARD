import Header from "../components/Header.jsx";
import Spline from "@splinetool/react-spline";
import ParticlesComponent from "../components/Particles.jsx";
import Footer from "../components/FooterCTA.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import city3 from "./city3.jpg";
import city2 from "./city2.jpg";
function Team() {
  return (
    <div>
      <ParticlesComponent id="particles" />
      <Header />

      {/* <section className="h-screen  xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">


      </section> */}

      <div class="flex flex-wrap justify-center gap-5 p-5">
        <ProfileCard
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city3}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
        <ProfileCard
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl={city2}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
        <ProfileCard
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/path/to/avatar.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
        <ProfileCard
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/path/to/avatar.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
        <ProfileCard
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/path/to/avatar.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
        <ProfileCard
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/path/to/avatar.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
        <ProfileCard
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/path/to/avatar.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
        <ProfileCard
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/path/to/avatar.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
        <ProfileCard
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/path/to/avatar.jpg"
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
