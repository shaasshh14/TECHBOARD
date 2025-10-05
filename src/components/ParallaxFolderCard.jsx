import { useRef, useEffect } from "react";

const ParallaxFolderCard = ({
  title,
  previewA,
  previewB,
  onClick,
  className = "",
  style,
}) => {
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const updateTilt = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const maxTilt = 10;
    const rx = (py - 0.5) * -2 * maxTilt;
    const ry = (px - 0.5) * 2 * maxTilt;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };

  const handleMouseMove = (e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateTilt(e));
  };

  const handleEnter = () => cardRef.current?.classList.add("is-hovered");
  const handleLeave = () => {
    const el = cardRef.current;
    el?.classList.remove("is-hovered");
    if (el) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(e);
    }
  };

  useEffect(() => {
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onKeyDown={handleKeyDown}
      className={`static-card-button initial-card ${className}`}
      style={style}
      aria-label={`${title} gallery`}
    >
      <div className="folder-scene w-full h-full flex flex-col items-center justify-center p-6">
        <div
          ref={cardRef}
          className="folder-card relative mx-auto rounded-2xl"
          style={{ width: "330px", height: "425px" }}
        >
          {/* Back body */}
          <div className="layer layer-back" />

          {/* Middle sheet */}
          <div className="layer layer-mid" />

          {/* Two photos peeking from inside the folder */}
          <div className="photo-stack" aria-hidden="true">
            {previewA && (
              <img
                className="photo photo-a"
                src={previewA}
                alt=""
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            )}
            {previewB && (
              <img
                className="photo photo-b"
                src={previewB}
                alt=""
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            )}
          </div>

          {/* Front panel (no logo now) */}
          <div className="layer layer-front" />
        </div>

        <div className="mt-5 text-center px-3">
          <h3 className="text-white font-semibold text-xl leading-tight">
            {title}
          </h3>
        </div>
      </div>
    </button>
  );
};

export default ParallaxFolderCard;