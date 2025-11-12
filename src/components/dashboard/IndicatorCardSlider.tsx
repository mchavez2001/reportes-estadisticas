import { useState, useEffect } from "react";
import ReportCard from "../cards/ReportCard";
import Icon01 from "../../assets/images/icon_01.png";
import Icon02 from "../../assets/images/icon_01.png";

const ReportCardSlider = () => {
  const cards = [
    {
      title: "1",
      content:
        "reclamo por cada 1000 operaciones que realizan las aseguradoras",
      image: Icon02,
    },
    {
      title: "6",
      content:
        "días en promedio, es el plazo de atención de las aseguradoras ante un reclamo cuando el plazo legal es hasta 15 días",
      image: Icon01,
    },
  ];

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCards(5);
        setIsLargeDesktop(true);
      } else if (window.innerWidth >= 1024) {
        setVisibleCards(3);
        setIsLargeDesktop(false);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
        setIsLargeDesktop(false);
      } else {
        setVisibleCards(1);
        setIsLargeDesktop(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(cards.length / visibleCards);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, visibleCards]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === totalSlides - 1;
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

  // Calcular las tarjetas visibles actuales
  const startCardIndex = currentIndex * visibleCards;
  const endCardIndex = Math.min(startCardIndex + visibleCards, cards.length);

  let visibleCardsArray = cards.slice(startCardIndex, endCardIndex);

  // Si estamos al final y necesitamos completar con tarjetas del inicio
  if (visibleCardsArray.length < visibleCards && cards.length > visibleCards) {
    const remaining = visibleCards - visibleCardsArray.length;
    visibleCardsArray = [...visibleCardsArray, ...cards.slice(0, remaining)];
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      {/* Contenedor del Slider */}
      <div
        className="flex justify-center relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`flex transition-transform duration-300 ease-in-out ${
            isLargeDesktop ? "justify-between gap-4" : "justify-center"
          }`}
        >
          {visibleCardsArray.map((card, index) => (
            <div
              key={`${card.title}-${index}`}
              className={`flex-shrink-0 ${
                isLargeDesktop ? "flex-1 min-w-0" : ""
              } px-2 sm:px-4`}
              style={!isLargeDesktop ? { width: `${100 / visibleCards}%` } : {}}
            >
              <div
                className={isLargeDesktop ? "h-full" : "flex justify-center"}
              >
                <ReportCard
                  title={card.title}
                  content={card.content}
                  width="206px"
                  image={card.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles de navegación */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-6 space-x-2 sm:space-x-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-[#00C19F]" : "bg-gray-300"
              }`}
              aria-label={`Ir a grupo ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Flechas de navegación - solo se muestran si hay más de un grupo */}
      {totalSlides > 1 && !isLargeDesktop && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white p-1 sm:p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Grupo anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
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
            className="absolute right-0 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white p-1 sm:p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Siguiente grupo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
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
        </>
      )}
    </div>
  );
};

export default ReportCardSlider;
