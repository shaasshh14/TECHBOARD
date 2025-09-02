import Header from "../components/Header.jsx";
import { ContactSection, styles } from "../components/ContactSection";
import ParticlesComponent from "../components/Particles.jsx";
import Footer from "../components/FooterCTA.jsx";

export const Contact = () => {
  return (
    <div className="relative min-h-screen overflow-hidden ">
      <ParticlesComponent id="particles" />
      <Header />
      <style>{styles}</style>
      <ContactSection />
      <Footer/>
    </div>
  );
};
