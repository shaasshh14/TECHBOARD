import Header from "../components/Header.jsx";
import SpeakersSection from "../components/SpeakersSection.jsx";
import Footer from "../components/FooterCTA.jsx";
function Gallery() {
  return (
    <div>
      <Header />
      <SpeakersSection></SpeakersSection>
      <div style={{ padding: "2rem" }}>
        <h1>Gallery Page</h1>
        <p>This is the Gallery page content.</p>
      </div>
      <Footer/>
    </div>
  );
}

export default Gallery;
