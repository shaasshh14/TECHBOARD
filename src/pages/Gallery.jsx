import Header from "../components/Header.jsx";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import VanillaTilt from "vanilla-tilt";
import ParticlesComponent from "../components/Particles.jsx";
import Loader from "../components/Loader.jsx";
const TrainIntro = ({ images, startRect, onDone, heroScale = 7 }) => {
  const travel = 1200;       
  const heroPop = 820;       
  const streamStep = 110;    
  const buffer = 320;        

  const [fading, setFading] = useState(false);

  useEffect(() => {
    const total =
      Math.max(travel + heroPop, (images.length - 1) * streamStep + travel) +
      buffer;


    const tFade = setTimeout(() => setFading(true), total - 260);
    const tDone = setTimeout(onDone, total);
    return () => {
      clearTimeout(tFade);
      clearTimeout(tDone);
    };
  }, [images.length, onDone]);

  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;


  const thumbH = Math.round(Math.min(60, Math.max(44, vw * 0.07)));
  const thumbW = Math.round((16 / 9) * thumbH);
  const gap = Math.round(Math.min(16, Math.max(8, vw * 0.022)));


  const totalW = images.length * thumbW + (images.length - 1) * gap;
  const navStartX = (vw - totalW) / 2 + thumbW / 2;
  const endY = vh - (thumbH + 30); 

  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;

  const centerX = vw / 2;
  const centerY = vh / 2;

  const clones = images.map((src, i) => {
    const endX = navStartX + i * (thumbW + gap);
    const spanX = endX - startX;
    const arcHeight = Math.min(260, Math.max(120, Math.abs(spanX) * 0.55));
    const cp1x = startX + spanX * 0.32;
    const cp1y = startY - arcHeight;
    const cp2x = startX + spanX * 0.72;
    const cp2y = endY - arcHeight * 0.6;
    const pathStr = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;

    return {
      src,
      delay: i * streamStep,
      pathStr,
      endX,
      endY,
      thumbW,
      thumbH
    };
  });


  const dx = centerX - (clones[0]?.endX ?? centerX);
  const dy = centerY - (clones[0]?.endY ?? centerY);

  return (
    <>
      <div className="transition-scrim" />
      <div className={`train-overlay ${fading ? "fade-out" : ""}`} aria-hidden>
        {clones.map((c, i) => (
          <img
            key={i}
            src={c.src}
            alt=""
            className={`train-thumb ${i === 0 ? "train-thumb-hero" : ""}`}
            style={{
              width: `${c.thumbW}px`,
              height: `${c.thumbH}px`,
              "--path": `path('${c.pathStr}')`,
              animationDelay: i === 0 ? `0ms, ${travel + 100}ms` : `${c.delay}ms`,
              "--hero-dx": `${dx}px`,
              "--hero-dy": `${dy}px`,
              "--hero-scale": heroScale
            }}
          />
        ))}
      </div>
    </>
  );
};


const ImageSlider = ({ images, onExit, otherCards, onLaunchOther, transitioning }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClarifying, setIsClarifying] = useState(false);

  const showSlide = useCallback(
    (index) => {
      if (index < 0 || index >= images.length) {
        onExit();
        return;
      }
      setIsClarifying(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsClarifying(false);
      }, 10);
    },
    [images.length, onExit]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
      else if (event.key === "ArrowRight") showSlide(currentIndex + 1);
      else if (event.key === "Escape") onExit();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, showSlide, onExit]);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  return (
    <div className={`image-slider-view ${transitioning ? "is-transitioning" : ""}`}>
      {otherCards?.[0] && (
        <button
          className="edge-card left-edge"
          title={otherCards[0].title}
          onClick={(e) =>
            onLaunchOther(otherCards[0].id, e.currentTarget.getBoundingClientRect())
          }
          style={{ backgroundImage: `url(${otherCards[0].images[0]})` }}
          aria-label={`Open ${otherCards[0].title}`}
        />
      )}
      {otherCards?.[1] && (
        <button
          className="edge-card right-edge"
          title={otherCards[1].title}
          onClick={(e) =>
            onLaunchOther(otherCards[1].id, e.currentTarget.getBoundingClientRect())
          }
          style={{ backgroundImage: `url(${otherCards[1].images[0]})` }}
          aria-label={`Open ${otherCards[1].title}`}
        />
      )}

      <button className="corner-nav top-right close-all" onClick={onExit}>
        &times;
      </button>

      <section className="slider__content">
        <div className="slider-nav-area left" onClick={() => showSlide(currentIndex - 1)}>
          <div className="nav-arrow">‹</div>
        </div>

        <main className="image-display">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className={isClarifying ? "clarify-start" : "clarify-end"}
          />
        </main>

        <div className="slider-nav-area right" onClick={() => showSlide(currentIndex + 1)}>
          <div className="nav-arrow">›</div>
        </div>
      </section>

      <nav className="slider-navigation">
        {images.map((imgSrc, index) => (
          <button
            key={index}
            className="nav-button"
            aria-selected={currentIndex === index}
            onClick={() => showSlide(index)}
          >
            <img className="thumbnail" src={imgSrc} alt={`Thumbnail ${index + 1}`} />
          </button>
        ))}
      </nav>
    </div>
  );
};


const Gallery = () => {
  
  const [selectedCardId, setSelectedCardId] = useState(null);


  const cardRefs = useRef({});


  const [train, setTrain] = useState(null);
  const [transitioning, setTransitioning] = useState(false);


  const cards = useMemo(
    () => [
      {
        id: "cardUno",
        title: "TECHNICAL AKIRTI",
        icon: "globe-outline",
        bg: "linear-gradient(180deg, var(--gx-red) 0%, var(--vibrant-purple) 100%)",
        desc: "DSA SE-TE-BE, SOLVEX , and speed of thought.",
        images: [
          "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1550063873-ab792950096b?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1517694712202-1428bc38a5a5?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1571171637578-41bc2155f41f?q=80&w=2070&auto=format&fit=crop"
        ]
      },
      {
        id: "cardDos",
        title: "SOLUTIONS",
        icon: "diamond-outline",
        bg: "linear-gradient(180deg, #00d1ff 0%, var(--gx-red) 100%)",
        desc: "Beautiful UIs, APIs, frameworks, and tools.",
        images: [
          "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1925&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618335829737-2228915674e0?q=80&w=1948&auto=format&fit=crop"
        ]
      },
      {
        id: "cardTres",
        title: "FUN AND EVENTS",
        icon: "rocket-outline",
        bg: "linear-gradient(180deg, var(--vibrant-purple) 0%, #00e9e9 100%)",
        desc: "Models, agents, and the future of automation.",
        images: [
          "https://images.unsplash.com/photo-1677756119517-756a188d2d9b?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1620712943543-2858200f7225?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070&auto=format&fit=crop",
          "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=1935&auto=format&fit=crop"
        ]
      }
    ],
    []
  );

  const selectedCardData = cards.find((card) => card.id === selectedCardId);
  const otherCards = cards.filter((card) => card.id !== selectedCardId);

  const triggerTrainTo = (id, rect) => {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    setTransitioning(true);
    setTrain({ id, images: card.images, rect });
  };

  const handleCardClick = (card, event) => {
    if (train) return;

    const el = cardRefs.current[card.id];
    if (el?.vanillaTilt) {
      el.vanillaTilt.destroy();
      el.style.transform = "";
    }
    const rect = event.currentTarget.getBoundingClientRect();
    triggerTrainTo(card.id, rect);
  };


  useEffect(() => {
    if (selectedCardId) return;
    const els = cards.map((card) => cardRefs.current[card.id]).filter(Boolean);
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches;

    els.forEach((el) => {
      if (!el.vanillaTilt) {
        VanillaTilt.init(el, {
          max: isMobile ? 6 : 10,
          speed: 300,
          glare: true,
          "max-glare": 0.15,
          perspective: 1400,
          scale: 1.01,
          gyroscope: false,
          reset: true
        });
      }
    });

    return () => {
      els.forEach((el) => {
        if (el?.vanillaTilt) {
          el.vanillaTilt.destroy();
          el.style.transform = "";
        }
      });
    };
  }, [selectedCardId, cards]);

  const getEdgeClassFor = (card) => {
    if (!train || train.id === card.id) return "";
    const others = cards.filter((c) => c.id !== train.id);
    const idx = others.findIndex((c) => c.id === card.id);
    return idx === 0 ? "edge-card left-edge initial-circle" : "edge-card right-edge initial-circle";
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {

    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader/>
      </div>
    );
  }

  return (
    <>
    <ParticlesComponent />
      <Header />


      <div className={`gallery-v2-container ${selectedCardId ? "gallery-v2-active" : ""}`}>
        {!selectedCardId && (
          <div className={`gallery-initial-view ${train ? "launching" : ""}`}>
            {cards.map((card) => {
              const isLaunching = train?.id === card.id;
              const circleClass = getEdgeClassFor(card);
              return (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[card.id] = el;
                  }}
                  className={`initial-card card-neo tilt-enabled ${isLaunching ? "is-launching" : ""} ${circleClass}`}
                  onClick={(e) => {
                    if (train) return;
                    handleCardClick(card, e);
                  }}

                  style={{ "--card-grad": card.bg }}
                >

                  <div className="icon-scoop">
                    <div className="icon-badge">
                      <ion-icon name={card.icon}></ion-icon>
                    </div>
                  </div>

                  <div className="content">
                    <h2>{card.title}</h2>
                    <p>{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {train && (
          <TrainIntro
            images={train.images}
            startRect={train.rect}
            onDone={() => {
              setSelectedCardId(train.id);
              setTrain(null);
              setTimeout(() => setTransitioning(false), 220);
            }}
            heroScale={7}
          />
        )}

        {selectedCardId && selectedCardData && (
          <div className={`gallery-main-view ${transitioning ? "transitioning" : ""} anuj`}>
            <ImageSlider
              images={selectedCardData.images}
              onExit={() => setSelectedCardId(null)}
              otherCards={otherCards}
              onLaunchOther={(id, rect) => triggerTrainTo(id, rect)}
              transitioning={transitioning}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
