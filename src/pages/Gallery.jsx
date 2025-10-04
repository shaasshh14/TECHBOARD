import Header from "../components/Header.jsx";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
// VanillaTilt is no longer used for the main cards, so it can be removed if not used elsewhere.
// For this example, I'll assume it might be used by other components and leave the import.
import VanillaTilt from "vanilla-tilt";
import ParticlesComponent from "../components/Particles.jsx";
import Loader from "../components/Loader.jsx";
import Footer from "../components/FooterCTA.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import AOS from "aos";

// src/pages/Gallery.jsx

const FrameStyles = () => (
  <style>{`
    .canvas-card-frame {
      --frame-color-dark: #1a1d24;
      --frame-color-light: #4a4e5a;
      padding: 12px; /* Thickness of the frame */
      border-radius: 20px;
      background: linear-gradient(145deg, var(--frame-color-light), var(--frame-color-dark));
      box-shadow: 10px 10px 20px #121418, -10px -10px 20px #2c3038;
      position: relative;
    }

    .canvas-card-inner {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
      /* Inset shadow to make the canvas look sunken */
      box-shadow: inset 5px 5px 10px #121418, inset -5px -5px 10px #2c3038;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .canvas-card-frame canvas {
        /* Ensure canvas fits inside the inner container */
        width: 100%;
        height: 100%;
    }
  `}</style>
);


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// START: CanvasCard Component
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const CanvasCard = ({ title, desc, onClick, className, style }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const internalClickHandler = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // --- Start of ported vanilla JS logic ---
    const card = {
      width: 280,
      height: 410,
      cornerRadius: 15,
      glowIntensity: 15,
      glowMax: 25,
      x: 0,
      y: 0,
      soundVolume: 0.5,
    };
    canvas.width = card.width;
    canvas.height = card.height;

    const particleSettings = {
      count: 100,
      minSize: 1,
      maxSize: 4,
      minSpeed: 0.25,
      maxSpeed: 0.5,
      minOpacity: 0.1,
      maxOpacity: 0.6,
    };
    const lineSettings = {
      count: 15,
      minWidth: 0.5,
      maxWidth: 2,
      minSpeed: 0.01,
      maxSpeed: 0.03,
      minOpacity: 0.05,
      maxOpacity: 0.2,
      waveHeight: 10,
      numPoints: 5,
    };

    let particles = [];
    let lines = [];
    let clickEffects = [];

    let isCardClicked = false;
    let clickTime = 0;
    let cardShakeAmount = 0;
    let activeHue = 140;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let pulseTime = 0;

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleSettings.count; i++) {
        particles.push({
          x: Math.random() * card.width,
          y: Math.random() * card.height,
          size:
            Math.random() *
              (particleSettings.maxSize - particleSettings.minSize) +
            particleSettings.minSize,
          speedX:
            Math.random() * (particleSettings.maxSpeed * 2) -
            particleSettings.maxSpeed,
          speedY:
            Math.random() * (particleSettings.maxSpeed * 2) -
            particleSettings.maxSpeed,
          opacity:
            Math.random() *
              (particleSettings.maxOpacity - particleSettings.minOpacity) +
            particleSettings.minOpacity,
        });
      }
    }

    function createLines() {
      lines = [];
      for (let i = 0; i < lineSettings.count; i++) {
        const points = [];
        const startY = Math.random() * card.height;
        for (let j = 0; j < lineSettings.numPoints; j++) {
          points.push({
            x: j * (card.width / (lineSettings.numPoints - 1)),
            y: startY + Math.random() * 30 - 15,
            originalY: startY + Math.random() * 30 - 15,
          });
        }
        lines.push({
          points: points,
          width:
            Math.random() * (lineSettings.maxWidth - lineSettings.minWidth) +
            lineSettings.minWidth,
          speed:
            Math.random() * (lineSettings.maxSpeed - lineSettings.minSpeed) +
            lineSettings.minSpeed,
          offset: Math.random() * Math.PI * 2,
          opacity:
            Math.random() *
              (lineSettings.maxOpacity - lineSettings.minOpacity) +
            lineSettings.minOpacity,
          color: `hsl(${activeHue}, 100%, 60%)`,
        });
      }
    }

    function createClickEffect(x, y) {
      if (
        x >= card.x &&
        x <= card.x + card.width &&
        y >= card.y &&
        y <= card.y + card.height
      ) {
        isCardClicked = true;
        clickTime = 0;
        cardShakeAmount = 5;

        clickEffects.push({
          type: "ring",
          x,
          y,
          radius: 0,
          maxRadius: 80,
          opacity: 1,
          color: `hsl(${activeHue}, 100%, 50%)`,
        });
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4 + 2;
          clickEffects.push({
            type: "particle",
            x,
            y,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,
            size: Math.random() * 6 + 2,
            opacity: 1,
            decay: Math.random() * 0.04 + 0.02,
            color: `hsl(${activeHue + Math.random() * 30 - 15}, 100%, 60%)`,
          });
        }
        for (let i = 0; i < 8; i++) {
          clickEffects.push({
            type: "burstLine",
            x,
            y,
            angle: (i / 8) * Math.PI * 2,
            length: 0,
            maxLength: Math.random() * 50 + 30,
            width: Math.random() * 2 + 1,
            opacity: 1,
            speed: Math.random() * 5 + 3,
            decay: Math.random() * 0.05 + 0.02,
            color: `hsl(${activeHue + Math.random() * 30 - 15}, 100%, 60%)`,
          });
        }
        lines.forEach((line) => (line.color = `hsl(${activeHue}, 100%, 60%)`));
      }
    }

    const sounds = {
      portal: () => {
        /* Sound logic remains same */
      },
      crystal: () => {
        /* Sound logic remains same */
      },
      bubbles: () => {
        /* Sound logic remains same */
      },
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };
    const handleMouseLeave = () => {
      isHovering = false;
    };
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      createClickEffect(clickX, clickY);
      if (isCardClicked) {
        const soundKeys = Object.keys(sounds);
        const randomSound =
          soundKeys[Math.floor(Math.random() * soundKeys.length)];
        // sounds[randomSound](); // Sound is disabled to prevent errors in some environments, can be re-enabled.
      }
    };

    internalClickHandler.current = handleClick;
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    function roundedRect(x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.arcTo(x + width, y, x + width, y + radius, radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
      ctx.lineTo(x + radius, y + height);
      ctx.arcTo(x, y + height, x, y + height - radius, radius);
      ctx.lineTo(x, y + radius);
      ctx.arcTo(x, y, x + radius, y, radius);
      ctx.closePath();
    }
    
    // Helper function to wrap text
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        for(let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }

    function drawClickEffects() {
      for (let i = clickEffects.length - 1; i >= 0; i--) {
        const effect = clickEffects[i];
        if (effect.type === "ring") {
          effect.radius += 2;
          effect.opacity -= 0.02;
          if (effect.radius >= effect.maxRadius || effect.opacity <= 0) {
            clickEffects.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${activeHue}, 100%, 50%, ${effect.opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (effect.type === "particle") {
          effect.x += effect.speedX;
          effect.speedX *= 0.95;
          effect.y += effect.speedY;
          effect.speedY *= 0.95;
          effect.opacity -= effect.decay;
          if (effect.opacity <= 0) {
            clickEffects.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(effect.x, effect.y, effect.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${activeHue}, 100%, 60%, ${effect.opacity})`;
          ctx.fill();
        } else if (effect.type === "burstLine") {
          if (effect.length < effect.maxLength) {
            effect.length += effect.speed;
          } else {
            effect.opacity -= effect.decay;
          }
          if (effect.opacity <= 0) {
            clickEffects.splice(i, 1);
            continue;
          }
          const endX = effect.x + Math.cos(effect.angle) * effect.length;
          const endY = effect.y + Math.sin(effect.angle) * effect.length;
          ctx.beginPath();
          ctx.moveTo(effect.x, effect.y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = `hsla(${activeHue}, 100%, 60%, ${effect.opacity})`;
          ctx.lineWidth = effect.width;
          ctx.stroke();
        }
      }
    }

    function drawCardContent() {
      let cardOffsetX = 0,
        cardOffsetY = 0;
      if (isCardClicked) {
        clickTime += 0.1;
        cardShakeAmount *= 0.9;
        if (clickTime > 2 || cardShakeAmount < 0.1) {
          isCardClicked = false;
          cardShakeAmount = 0;
        }
        cardOffsetX = Math.sin(clickTime * 10) * cardShakeAmount;
        cardOffsetY = Math.cos(clickTime * 8) * cardShakeAmount;
      }
      const shiftedX = card.x + cardOffsetX,
        shiftedY = card.y + cardOffsetY;
      ctx.save();
      roundedRect(
        shiftedX,
        shiftedY,
        card.width,
        card.height,
        card.cornerRadius
      );
      ctx.clip();
      const gradient = ctx.createLinearGradient(
        shiftedX,
        shiftedY,
        shiftedX + card.width,
        shiftedY + card.height
      );
      gradient.addColorStop(0, "#2a2a2a");
      gradient.addColorStop(1, "#0c0c0c");
      ctx.fillStyle = gradient;
      ctx.fillRect(shiftedX, shiftedY, card.width, card.height);
      for (const line of lines) {
        ctx.beginPath();
        ctx.moveTo(shiftedX + line.points[0].x, shiftedY + line.points[0].y);
        for (let i = 0; i < lineSettings.numPoints; i++) {
          const point = line.points[i];
          point.y =
            point.originalY +
            Math.sin(pulseTime * line.speed + line.offset + i * 0.5) *
              lineSettings.waveHeight;
          if (i > 0) ctx.lineTo(shiftedX + point.x, shiftedY + point.y);
        }
        ctx.strokeStyle = `hsla(${activeHue}, 100%, 60%, ${line.opacity})`;
        ctx.lineWidth = line.width;
        ctx.stroke();
      }
      for (const particle of particles) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0) particle.x = card.width;
        if (particle.x > card.width) particle.x = 0;
        if (particle.y < 0) particle.y = card.height;
        if (particle.y > card.height) particle.y = 0;
        ctx.beginPath();
        ctx.arc(
          shiftedX + particle.x,
          shiftedY + particle.y,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      }
      ctx.restore();

      // =========== MODIFICATION START ============
      // --- START: New 3D Border Effect ---

      // 1. Draw a dark "shadow" border offset down and to the right
      ctx.strokeStyle = 'rgba(48, 25, 52, 0.7)'; // Dark Purple shadow color
      ctx.lineWidth = 3;
      roundedRect(shiftedX + 1, shiftedY + 1, card.width, card.height, card.cornerRadius);
      ctx.stroke();

      // 2. Draw a light "highlight" border offset up and to the left
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)'; // Light Cyan highlight color
      ctx.lineWidth = 2;
      roundedRect(shiftedX - 1, shiftedY - 1, card.width, card.height, card.cornerRadius);
      ctx.stroke();

      // --- END: New 3D Border Effect ---
      // ============= MODIFICATION END ==============

      const centerX = shiftedX + card.width / 2;

      // Draw Title from props
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(title.toUpperCase(), centerX, shiftedY + 50);

      // Draw Description from props
      ctx.fillStyle = "#ccc";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      wrapText(ctx, desc, centerX, shiftedY + card.height / 2 + 40, card.width - 60, 22);

      ctx.fillStyle = "#888";
      ctx.font = "12px Arial";
      ctx.fillText(
        "Interactive Canvas Card",
        centerX,
        shiftedY + card.height - 20
      );
    }

    function animate() {
      animationFrameId.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pulseTime += 0.02;
      const centerX = card.x + card.width / 2,
        centerY = card.y + card.height / 2;
      let glowSize = card.glowIntensity;
      let hue = 140;
      if (isHovering) {
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        glowSize =
          card.glowIntensity + Math.max(0, card.glowMax - distance / 10);
        hue = (((Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2)) * 360) % 360;
        lines.forEach((line) => (line.color = `hsl(${hue}, 100%, 60%)`));
      } else {
        glowSize = card.glowIntensity + Math.sin(pulseTime) * 5;
      }
      activeHue = hue;
      ctx.shadowBlur = glowSize * (isCardClicked ? 1.5 : 1);
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      drawCardContent();
      ctx.shadowBlur = 0;
      drawClickEffects();
    }

    createParticles();
    createLines();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [title, desc]); // Add title and desc to dependency array

  const handleWrapperClick = (e) => {
    if (internalClickHandler.current) {
      internalClickHandler.current(e);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      onClick={handleWrapperClick}
      className={`${className} canvas-card-frame`}
      style={style}
    >
      <div className="canvas-card-inner">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// END: CanvasCard Component
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const TrainIntro = ({ images, startRect, onDone, heroScale = 7 }) => {
  const travel = 1500;
  const heroPop = 820;
  const streamStep = 150;
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

    return { src, delay: i * streamStep, pathStr, endX, endY, thumbW, thumbH };
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
              animationDelay:
                i === 0 ? `0ms, ${travel + 100}ms` : `${c.delay}ms`,
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

const ImageSlider = ({
  images,
  onExit,
  otherCards,
  onLaunchOther,
  transitioning,
}) => {
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
    <div
      className={`image-slider-view ${transitioning ? "is-transitioning" : ""}`}
    >
      {otherCards?.[0] && (
        <button
          className="edge-card left-edge"
          title={otherCards[0].title}
          onClick={(e) =>
            onLaunchOther(
              otherCards[0].id,
              e.currentTarget.getBoundingClientRect()
            )
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
            onLaunchOther(
              otherCards[1].id,
              e.currentTarget.getBoundingClientRect()
            )
          }
          style={{ backgroundImage: `url(${otherCards[1].images[0]})` }}
          aria-label={`Open ${otherCards[1].title}`}
        />
      )}

      <button className="corner-nav top-right close-all" onClick={onExit}>
        &times;
      </button>

      <section className="slider__content">
        <div
          className="slider-nav-area left"
          onClick={() => showSlide(currentIndex - 1)}
        >
          <div className="nav-arrow">‹</div>
        </div>
        <main className="image-display">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className={isClarifying ? "clarify-start" : "clarify-end"}
          />
        </main>
        <div
          className="slider-nav-area right"
          onClick={() => showSlide(currentIndex + 1)}
        >
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
            />
          </button>
        ))}
      </nav>
    </div>
  );
};

const Gallery = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [train, setTrain] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  const cards = useMemo(
    () => [
      {
        id: "cardAakriti",
        title: "TECHNICAL AAKRITI",
        icon: "apps-outline",
        desc: "A mega tech-fest with coding battles, robotics, hackathons, and gaming tournaments.",
        images: [
          "/gallery-images/ta9.jpg",
          "/gallery-images/ta10.jpg",
          "/gallery-images/ta3.jpg",
          "/gallery-images/ta1.jpg",
          "/gallery-images/ta2.jpg",
          "/gallery-images/ta4.jpg",
          "/gallery-images/ta5.jpg",
          "/gallery-images/ta6.jpg",
          "/gallery-images/ta7.jpg",
          "/gallery-images/ta8.jpg",
          
        ],
      },
      {
        id: "cardSolutions",
        title: "SOLUTION",
        icon: "car-sport-outline",
        desc: "Featuring 'Rusty Wheels,' the thrilling RC racing competition. Build, customize, and race to victory!",
        images: [
          "/gallery-images/sol1.jpg",
          "/gallery-images/sol2.jpg",
          "/gallery-images/sol3.jpg",
          "/gallery-images/sol4.jpg",
          "/gallery-images/sol5.jpg",
          "/gallery-images/sol6.jpg",
          "/gallery-images/sol7.jpg",
          "/gallery-images/sol8.jpg",
          "/gallery-images/sol9.jpg",
          "/gallery-images/sol10.jpg",
        ],
      },
      {
        id: "cardElevate",
        title: "Fun & Games",
        icon: "rocket-outline",
        desc: "An innovation showcase for software and hardware creators to pitch ideas and present prototypes.",
        images: [
          "/gallery-images/fun11.jpg",
          "/gallery-images/fun2.jpg",
          "/gallery-images/fun3.jpg",
          "/gallery-images/fun4.jpg",
          "/gallery-images/fun5.jpg",
          "/gallery-images/fun6.jpg",
          "/gallery-images/fun7.jpg",
          "/gallery-images/fun8.jpg",
          "/gallery-images/fun9.jpg",
          "/gallery-images/fun10.jpg",
        ],
      },
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
    const rect = event.currentTarget.getBoundingClientRect();
    triggerTrainTo(card.id, rect);
  };

  const getEdgeClassFor = (card) => {
    if (!train || train.id === card.id) return "";
    const others = cards.filter((c) => c.id !== train.id);
    const idx = others.findIndex((c) => c.id === card.id);
    return idx === 0
      ? "edge-card left-edge initial-circle"
      : "edge-card right-edge initial-circle";
  };

  const [loading, setLoading] = useState(true);
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
      <FrameStyles />
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />

      <div
        className={`gallery-v2-container ${
          selectedCardId ? "gallery-v2-active" : ""
        }`}
      >
        {!selectedCardId && (
          <div className={`gallery-initial-view ${train ? "launching" : ""}`}>
            {cards.map((card, index) => {
              const isLaunching = train?.id === card.id;
              const circleClass = getEdgeClassFor(card);
              const starColors = ["#FFFFFF", "#87CEEB", "#FFD700"];
              const color = starColors[index % starColors.length];

              return (
                <CanvasCard
                  key={card.id}
                  className={`initial-card ${
                    isLaunching ? "is-launching" : ""
                  } ${circleClass}`}
                  onClick={(e) => {
                    if (!train) handleCardClick(card, e);
                  }}
                  style={{ "--star-color": color }}
                  title={card.title}
                  desc={card.desc}
                  icon={card.icon}
                />
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
          <div
            className={`gallery-main-view ${
              transitioning ? "transitioning" : ""
            } anuj`}
          >
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
      <Footer />
    </>
  );
};

export default Gallery;