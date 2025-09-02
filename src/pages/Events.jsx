 import Header from "../components/Header.jsx";
import SpeakersSection from "../components/SpeakersSection.jsx";
import Footer from "../components/FooterCTA.jsx";
function Events() {
  return (
    <div>
      <Header />
    <SpeakersSection></SpeakersSection>
      <div style={{ padding: "2rem" }}>
        <h1>Events Page</h1>
        <p>This is the Events page content.</p>
      </div>
      <Footer/>
    </div>
  );
}

export default Events;
