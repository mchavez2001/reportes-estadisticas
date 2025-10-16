import { useState, useEffect } from "react";
import slider01 from "../../../images/04092025-00001.jpg";
import slider02 from "../../../images/04092025-00002.jpg";
// import slider03 from "../../../images/1308202503.png";
// import slider04 from "../../../images/1308202504.png";
// import slider05 from "../../../images/1308202505.png";

const ImageSlider = () => {
  const slides = [
    {
      id: "slide1",
      label: "Seguro de protección de tarjetas*",
      image: slider01,
    },
    {
      id: "slide2",
      label: "Seguro de desgravamen*",
      image: slider02,
    },
    // {
    //   id: "slide3",
    //   label: "Seguro de vida*",
    //   image: slider03,
    // },
    // {
    //   id: "slide4",
    //   label: "SOAT",
    //   image: slider04,
    // },
    // {
    //   id: "slide5",
    //   label: "Vehículos",
    //   image: slider05,
    // },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-avance cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      goToNext();
    }

    if (touchStart - touchEnd < -50) {
      goToPrevious();
    }
  };

  return (
    <div className="relative w-full mx-auto rounded-lg overflow-hidden">
      {/* Contenedor del Slider */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Etiqueta móvil */}
        <div className="lg:hidden bg-[#00C19F] text-white font-semibold text-lg p-4 text-center">
          {slides[currentIndex].label}
        </div>

        {/* Imagen del slide actual */}
        <div className="flex transition-transform duration-300 ease-in-out">
          <div className="w-full flex-shrink-0">
            <div className="h-[250px] p-2 flex items-center justify-center  border border-[#00C19F] rounded-bl-lg rounded-br-lg">
              <img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].label}
                className="w-full md:w-[90%] h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controles de navegación */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? "bg-[#00C19F]" : "bg-gray-300"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Flechas de navegación */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white focus:outline-none"
        aria-label="Slide anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white focus:outline-none"
        aria-label="Siguiente slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
    </div>
  );
};

export default ImageSlider;
