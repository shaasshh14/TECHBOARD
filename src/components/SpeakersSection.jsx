// src/components/SpeakersSection.jsx
 import { RobotSection } from "./RobotSection";

const speakers = [
    { name: 'Dr. Nova', tag: 'Keynote', tagClass: 'tag-keynote', img: 'https://via.placeholder.com/280x250' },
    { name: 'Pixelated Paul', tag: 'Design', tagClass: 'tag-design', img: 'https://via.placeholder.com/280x250' },
    { name: 'Code Commander', tag: 'Engineering', tagClass: 'tag-engineering', img: 'https://via.placeholder.com/280x250' },
    { name: 'Project Phoenix', tag: 'Product', tagClass: 'tag-product', img: 'https://via.placeholder.com/280x250' },
];

const SpeakersSection = () => {
  return (
    <section>
      <div>
      <h2 className="section-title"><span className="sticker-bg-pink">MEET THE SPEAKERS</span></h2>
      <div className="speakers-grid">
        {speakers.map((speaker, index) => (
          <div className="speaker-card" key={index}>
            <img src={speaker.img} alt={speaker.name} />
            <div className="speaker-info">
              <span className={`speaker-tag ${speaker.tagClass}`}>{speaker.tag}</span>
              <h3>{speaker.name}</h3>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default SpeakersSection;