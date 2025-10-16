import { useEffect, useState } from "react";
import slider01 from "../../../images/slider01.png";
import slider02 from "../../../images/slider02.png";
import slider03 from "../../../images/slider03.png";

const Slider = () => {
  const images = [
    { src: slider01, alt: "Descripción imagen 1" },
    { src: slider02, alt: "Descripción imagen 2" },
    { src: slider03, alt: "Descripción imagen 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Navegación
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    pauseAutoPlayTemporarily();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    pauseAutoPlayTemporarily();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    pauseAutoPlayTemporarily();
  };

  const pauseAutoPlayTemporarily = () => {
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlay) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <div className="relative w-full h-auto max-h-[80vh] overflow-hidden group">
      {/* Contenedor de imagen */}
      <div className="flex justify-center items-center w-full h-full rounded-md overflow-hidden">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="object-contain w-full h-full max-h-[60vh]"
        />
      </div>

      {/* Controles de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
        aria-label="Imagen anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
        aria-label="Siguiente imagen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index
                ? "bg-gray-500/75 border-none"
                : "bg-white/50 hover:bg-white/80"
            } border border-black/75`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
