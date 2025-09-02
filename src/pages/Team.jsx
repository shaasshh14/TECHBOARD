import Header from "../components/Header.jsx";
import Spline from "@splinetool/react-spline";
import ParticlesComponent from "../components/Particles.jsx";
import Footer from "../components/FooterCTA.jsx";
function Team() {
  return (
    <div>
      <ParticlesComponent id="particles"/>
      <Header />

      <section className="h-screen  xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">
        <Spline
          className="absolute xl:right-[-30%] xl:top-[0%] right-0 top-0 w-[600px] h-[600px]"
          scene="https://prod.spline.design/AykasHNRalnfTDfs/scene.splinecode"
        />
      </section>
      <Footer/>
    </div>
  );
}

export default Team;
