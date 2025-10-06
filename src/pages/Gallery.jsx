import ParallaxFolderCard from "../components/ParallaxFolderCard.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/FooterCTA.jsx";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Loader from "../components/Loader.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import AOS from "aos";

/* ------------------- Train Intro (desktop) ------------------- */
const TrainIntro = ({ images, startRect, onDone, heroScale = 7 }) => {
  const travel = 1500;
  const heroPop = 520;
  const streamStep = 150;
  const buffer = 300;

  const [fading, setFading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let raf1 = 0, raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIsLive(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  useEffect(() => {
    const total = Math.max(travel + heroPop, (images.length - 1) * streamStep + travel) + buffer;
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
    return { src, delay: i * streamStep, pathStr, endX, endY, thumbW, thumbH };
  });

  const dx = centerX - (clones[0]?.endX ?? centerX);
  const dy = centerY - (clones[0]?.endY ?? centerY);

  return (
    <>
      <div className="transition-scrim" />
      <div className={`train-overlay ${isLive ? "is-live" : ""} ${fading ? "fade-out" : ""}`} aria-hidden>
        {clones.map((c, i) => (
          <img
            key={i}
            src={c.src}
            alt=""
            draggable="false"
            decoding="async"
            width={c.thumbW}
            height={c.thumbH}
            fetchpriority="low"       /* keep train thumbs low priority */
            className={`train-thumb ${i === 0 ? "train-thumb-hero" : ""}`}
            style={{
              width: `${c.thumbW}px`,
              height: `${c.thumbH}px`,
              "--path": `path('${c.pathStr}')`,
              "--train-dur": `${travel}ms`,
              "--delay": `${i === 0 ? 0 : c.delay}ms`,
              ...(i === 0 ? { "--hero-pop-delay": `${travel + 100}ms` } : {}),
              "--hero-dx": `${dx}px`,
              "--hero-dy": `${dy}px`,
              "--hero-scale": heroScale,
            }}
          />
        ))}
      </div>
    </>
  );
};

/* ------------------- Scatter Intro (mobile/reduced-motion) ------------------- */
const ScatterIntro = ({ images, startRect, onDone }) => {
  const dur = 1100;
  const step = 120;
  const buffer = 260;

  const [fading, setFading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let raf1 = 0, raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIsLive(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  useEffect(() => {
    const total = (images.length - 1) * step + dur + buffer;
    const tFade = setTimeout(() => setFading(true), total - 240);
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

  const clones = images.map((src, i) => {
    const endX = navStartX + i * (thumbW + gap);
    const dx = endX - startX;
    const dy = endY - startY;
    return { src, dx, dy, delay: i * step, thumbW, thumbH };
  });

  return (
    <>
      <div className="transition-scrim" />
      <div className={`train-overlay ${isLive ? "is-live" : ""} ${fading ? "fade-out" : ""}`} aria-hidden>
        {clones.map((c, i) => (
          <img
            key={i}
            src={c.src}
            alt=""
            draggable="false"
            decoding="async"
            width={c.thumbW}
            height={c.thumbH}
            fetchpriority="low"
            className="scatter-thumb"
            style={{
              width: `${c.thumbW}px`,
              height: `${c.thumbH}px`,
              left: `${startX}px`,
              top: `${startY}px`,
              "--dx": `${c.dx}px`,
              "--dy": `${c.dy}px`,
              "--dur": `${dur}ms`,
              "--delay": `${c.delay}ms`,
            }}
          />
        ))}
      </div>
    </>
  );
};

/* ------------------- Slider ------------------- */
const ImageSlider = ({
  images,
  onExit,
  otherCards,
  onLaunchOther,
  transitioning,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isClarifying, setIsClarifying] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, images]);

  // Keep showing current slide until the next image is decoded, then swap.
  const showSlide = useCallback(
    (index) => {
      if (index < 0 || index >= images.length) {
        onExit();
        return;
      }
      const nextSrc = images[index];
      setIsClarifying(true);
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        const d = img.decode ? img.decode() : Promise.resolve();
        d.catch(() => {}).finally(() => {
          setCurrentIndex(index);
          setIsClarifying(false);
        });
      };
      img.onerror = () => {
        // Even on error, advance to avoid getting stuck
        setCurrentIndex(index);
        setIsClarifying(false);
      };
      img.src = nextSrc;
    },
    [images, onExit]
  );

  // Prefetch neighbors (next, prev, and one further ahead)
  useEffect(() => {
    const prefetch = (src) => {
      if (!src) return;
      const i = new Image();
      i.decoding = "async";
      i.src = src;
    };
    prefetch(images[currentIndex + 1]);
    prefetch(images[currentIndex - 1]);
    setTimeout(() => prefetch(images[currentIndex + 2]), 80);
  }, [currentIndex, images]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
      else if (event.key === "ArrowRight") showSlide(currentIndex + 1);
      else if (event.key === "Escape") onExit();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, showSlide, onExit]);

  return (
    <div className={`image-slider-view ${transitioning ? "is-transitioning" : ""}`}>
      {otherCards?.[0] && (
        <button
          className="edge-card left-edge"
          title={otherCards[0].title}
          onClick={(e) => onLaunchOther(otherCards[0].id, e.currentTarget.getBoundingClientRect())}
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

      <button className="corner-nav top-right close-all" onClick={onExit} aria-label="Close gallery">
        &times;
      </button>

      <section className="slider__content">
        <div className="slider-nav-area left" onClick={() => showSlide(currentIndex - 1)}>
          <div className="nav-arrow">‹</div>
        </div>
        <main className="image-display">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1} of ${images.length}`}
            className={isClarifying ? "clarify-start" : "clarify-end"}
            decoding="async"
            draggable="false"
            fetchpriority="high"
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
        <img
            className="thumbnail"
            src={imgSrc}
            alt={`Thumbnail ${index + 1}`}
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          </button>
        ))}
      </nav>
    </div>
  );
};

/* ------------------- Gallery ------------------- */
const Gallery = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [overlay, setOverlay] = useState(null); // { id, images, rect, mode, wait, initialIndex }
  const [sliderStartIndex, setSliderStartIndex] = useState(0);

  // Keep track of dynamic <link> preloads so we can clean them up
  const headLinksRef = useRef([]);

  /* ---------- cards data ---------- */
  const cards = useMemo(
    () => [
      {
        id: "cardAakriti",
        title: "TECHNICAL AAKRITI",
        images: [
          "/TECHAAKRITI/p20.jpg",
          "/TECHAAKRITI/p2.jpg",
          "/TECHAAKRITI/p23.jpg",
          "/TECHAAKRITI/p21.jpg",
          "/TECHAAKRITI/p13.jpg",
          "/TECHAAKRITI/p6.jpg",
          "/TECHAAKRITI/p1.jpg",
          "/TECHAAKRITI/p19.jpg",
          "/TECHAAKRITI/p14.jpg",
        ],
      },
      {
        id: "cardSolutions",
        title: "SOLUTION",
        images: [
          "/SOLUTIONS/x1.jpg",
          "/SOLUTIONS/x2.jpg",
          "/SOLUTIONS/x3.jpg",
          "/SOLUTIONS/x13.jpg",
          "/SOLUTIONS/x4.jpg",
          "/SOLUTIONS/x6.jpg",
          "/SOLUTIONS/x8.jpg",
          "/SOLUTIONS/x7.jpg",
        ],
      },
      {
        id: "cardElevate",
        title: "Fun & Games",
        images: [
          "/gallery-images/fun1.jpg",
          "/gallery-images/fun2.jpg",
          "/gallery-images/fun3.jpg",
          "/gallery-images/fun4.jpg",
          "/gallery-images/fun5.jpg",
          "/gallery-images/fun6.jpg",
          "/gallery-images/fun8.jpg",
          "/gallery-images/fun10.jpg",
          "/gallery-images/fun9.jpg",
        ],
      },
    ],
    []
  );

  const selectedCardData = cards.find((card) => card.id === selectedCardId);
  const otherCards = cards.filter((card) => card.id !== selectedCardId);

  /* ---------- image preload helpers ---------- */
  const preloadImage = (src, maxWaitMs = 900) =>
    new Promise((resolve) => {
      if (!src) return resolve();
      const img = new Image();
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve();
      };
      const t = setTimeout(finish, maxWaitMs);
      img.onload = () => {
        const d = img.decode ? img.decode() : Promise.resolve();
        d.catch(() => {}).finally(() => {
          clearTimeout(t);
          finish();
        });
      };
      img.onerror = () => {
        clearTimeout(t);
        finish();
      };
      img.src = src;
    });

  const addPreloadLink = (href, rel, asType, priority) => {
    if (typeof document === "undefined" || !href) return null;
    const link = document.createElement("link");
    link.rel = rel;             // "preload" or "prefetch"
    if (asType) link.as = asType; // "image" for preload
    link.href = href;
    if (priority) link.fetchPriority = priority; // "high" or "low"
    document.head.appendChild(link);
    return link;
  };

  const installCardPreloads = (imgs, heroIdx = 0) => {
    // Hero: preload high priority
    const hero = imgs[heroIdx];
    const links = [];
    links.push(addPreloadLink(hero, "preload", "image", "high"));
    // Next two: prefetch low priority (don’t block hero)
    if (imgs[heroIdx + 1]) links.push(addPreloadLink(imgs[heroIdx + 1], "prefetch", null, "low"));
    if (imgs[heroIdx + 2]) links.push(addPreloadLink(imgs[heroIdx + 2], "prefetch", null, "low"));
    // store and return cleanup
    headLinksRef.current.push(...links.filter(Boolean));
    return () => {
      headLinksRef.current.forEach((l) => l && l.remove());
      headLinksRef.current = [];
    };
  };

  const computeShouldUseTrain = () => {
    if (typeof window === "undefined") return false;
    const supportsPath =
      (window.CSS && CSS.supports && CSS.supports("offset-path", 'path("M0,0 L1,1")')) ||
      (window.CSS && CSS.supports && CSS.supports("offsetPath", 'path("M0,0 L1,1")'));
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return Boolean(supportsPath) && !isMobile && !prefersReduced;
  };

  /* ---------- overlay flow ---------- */
  const triggerOverlayTo = (id, rect, mode) => {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    setTransitioning(true);
    const imgs = card.images || [];
    const heroIdx = 0; // change if you want a custom hero per card
    const cleanup = installCardPreloads(imgs, heroIdx);
    // Preload hero for instant first slide
    const wait = preloadImage(imgs[heroIdx], 1500);
    setOverlay({ id, images: imgs, rect, mode, wait, initialIndex: heroIdx, cleanup });
  };

  const finishOverlay = () => {
    const o = overlay;
    if (!o) return;
    const w = o.wait || Promise.resolve();
    w.then(() => {
      setSelectedCardId(o.id);
      setSliderStartIndex(o.initialIndex ?? 0);
      // remove link preloads
      if (o.cleanup) o.cleanup();
      setOverlay(null);
      setTimeout(() => setTransitioning(false), 180);
    });
  };

  /* ---------- click handlers ---------- */
  const handleCardClick = (card, event) => {
    if (overlay) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const mode = computeShouldUseTrain() ? "train" : "scatter";
    triggerOverlayTo(card.id, rect, mode);
  };

  const getEdgeClassFor = (card) => {
    if (!overlay || overlay.id === card.id) return "";
    const others = cards.filter((c) => c.id !== overlay.id);
    const idx = others.findIndex((c) => c.id === card.id);
    return idx === 0 ? "edge-card left-edge initial-circle" : "edge-card right-edge initial-circle";
  };

  const showInitial = !selectedCardId && !overlay;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />

      <div className={`gallery-v2-container ${selectedCardId ? "gallery-v2-active" : ""}`}>
        {showInitial && (
          <div className={`gallery-initial-view ${overlay ? "launching" : ""}`}>
            {/* Horizontal grid wrapper */}
            <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card) => {
                const isLaunching = overlay?.id === card.id;
                const circleClass = getEdgeClassFor(card);
                const imgs = card.images || [];
                const previewA = imgs[0];
                const previewB = imgs.length > 1 ? imgs[imgs.length - 1] : undefined;

                return (
                  <ParallaxFolderCard
                    key={card.id}
                    className={`folder-large ${isLaunching ? "is-launching" : ""} ${circleClass}`}
                    onClick={(e) => !overlay && handleCardClick(card, e)}
                    title={card.title}
                    previewA={previewA}
                    previewB={previewB}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Overlay animations (slider is unmounted while overlay runs) */}
        {overlay && overlay.mode === "train" && (
          <TrainIntro
            images={overlay.images}
            startRect={overlay.rect}
            onDone={finishOverlay}
            heroScale={7}
          />
        )}

        {overlay && overlay.mode === "scatter" && (
          <ScatterIntro
            images={overlay.images}
            startRect={overlay.rect}
            onDone={finishOverlay}
          />
        )}

        {/* Slider only renders when there is no overlay */}
        {selectedCardId && selectedCardData && !overlay && (
          <div className={`gallery-main-view ${transitioning ? "transitioning" : ""} anuj`}>
            <ImageSlider
              images={selectedCardData.images}
              onExit={() => setSelectedCardId(null)}
              otherCards={otherCards}
              onLaunchOther={(id, rect) => {
                const mode = computeShouldUseTrain() ? "train" : "scatter";
                triggerOverlayTo(id, rect, mode);
              }}
              transitioning={transitioning}
              initialIndex={sliderStartIndex}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Gallery;