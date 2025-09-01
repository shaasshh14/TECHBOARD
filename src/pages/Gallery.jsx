 
import Header from "../components/Header.jsx";
import SpeakersSection from "../components/SpeakersSection.jsx";
function Gallery() {
  return (
    <div>
      <Header />
      <SpeakersSection></SpeakersSection>
      <div style={{ padding: "2rem" }}>
        <h1>Gallery Page</h1>
        <p>This is the Gallery page content.</p>
      </div>
    </div>
  );
}

export default Gallery;
