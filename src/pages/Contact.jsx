import Header from "../components/Header.jsx";
import { ContactSection, styles } from "../components/ContactSection";
import ParticlesComponent from "../components/Particles.jsx";

export const Contact = () => {
  return (
    <div className="relative min-h-screen overflow-hidden ">
      <ParticlesComponent id="particles" />
      <Header />
      <style>{styles}</style>
      <ContactSection />
    </div>
  );
};
