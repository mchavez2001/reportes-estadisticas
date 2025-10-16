//=== Librerías de terceros ===//
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#392a7e] px-4 py-2">
        <div className="flex justify-end items-center m-auto max-w-[1200px] gap-4">
          <ul className="m-0 p-0 [list-style:none] gap-4 hidden lg:flex">
            <li className="after:content-[] after:inline-block after:ml-4 after:h-[10px] after:w-px after:bg-white [transition:all_0.3s_e]">
              <a
                target="_blank"
                href="https://www.apeseg.org.pe/insurance-day-2025/"
                className="no-underline text-[0.8rem] font-['Montserrat',_sans-serif] font-medium [transition:all_0.3s_ease-in] text-white hover:text-[#00c19f]"
              >
                Insurance Day 2025
              </a>
            </li>
            <li className="after:content-[] after:inline-block after:ml-4 after:h-[10px] after:w-px after:bg-white">
              <a
                href="https://www.dimequetienesseguro.com/consulta-soat/"
                className="no-underline text-[0.8rem] font-['Montserrat',_sans-serif] font-medium [transition:all_0.3s_ease-in] text-white hover:text-[#00c19f]"
              >
                Consulta SOAT
              </a>
            </li>
            <li className="after:content-[] after:inline-block after:ml-4 after:h-[10px] after:w-px after:bg-white">
              <a
                href="https://www.apeseg.org.pe/seguro-de-vida-ley-preguntas/"
                className="no-underline text-[0.8rem] font-['Montserrat',_sans-serif] font-medium [transition:all_0.3s_ease-in] text-white hover:text-[#00c19f]"
              >
                Seguro de Vida Ley
              </a>
            </li>
            <li>
              <a
                href="https://www.apeseg.org.pe/category/palabra-de-eduardo-moron/"
                className="no-underline text-[0.8rem] font-['Montserrat',_sans-serif] font-medium [transition:all_0.3s_ease-in] text-white hover:text-[#00c19f]"
              >
                La palabra de Eduardo Morón
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`w-full bg-[#fff] p-4 shadow-md shadow-gray-400 ${
          isScrolled ? "fixed z-50 top-[0px]" : "top-[40px]"
        } transition-all duration-300`}
      >
        <div className="flex justify-between items-center m-auto max-w-[1199px]">
          <a href="https://www.apeseg.org.pe/">
            <img
              width="124"
              height="44"
              src="https://www.apeseg.org.pe/wp-content/uploads/2025/03/image-7.png"
              alt="Logo APESEG"
            />
          </a>
          <button
            id="btn-primary"
            onClick={toggleMenu}
            className={`relative flex lg:hidden flex-col justify-center items-center border-solid border rounded-[${
              isOpen ? "50px" : "3px"
            }] bg-transparent h-[42px] w-[42px] p-0 [transition:all_0.3s_ease-in]`}
          >
            <span
              className={`${
                isOpen ? "absolute rotate-45" : "relative"
              } inline-block bg-[#392a7e] rounded-[5px] mx-[0] my-[2px] h-[4px] w-[20px] [transition:all_0.3s_ease-in]`}
            ></span>
            <span
              className={`${
                isOpen ? "w-[0px]" : "w-[20px]"
              } inline-block bg-[#392a7e] rounded-[5px] mx-[0] my-[2px] h-[4px] [transition:all_0.3s_ease-in]`}
            ></span>
            <span
              className={`${
                isOpen ? "absolute -rotate-45" : "relative"
              } inline-block bg-[#392a7e] rounded-[5px] mx-[0] my-[2px] h-[4px] w-[20px] [transition:all_0.3s_ease-in]`}
            ></span>
          </button>

          <ul className="hidden lg:flex gap-4 items-center">
            <li>
              <a
                href="https://www.apeseg.org.pe/nosotros/"
                className="font-['Montserrat',_sans-serif] text-[#6f6f6e] text-[0.95rem] font-medium hover:text-[#00c19f] [transition:all_0.3s_ease-in]"
              >
                Conócenos
              </a>
            </li>
            <li>
              <a
                href="https://www.apeseg.org.pe/derechos-de-los-usuarios/"
                className="font-['Montserrat',_sans-serif] text-[#6f6f6e] text-[0.95rem] font-medium hover:text-[#00c19f] [transition:all_0.3s_ease-in]"
              >
                Derechos de los usuarios
              </a>
            </li>
            <li>
              <a
                href="https://www.apeseg.org.pe/compromiso-con-la-sociedad/"
                className="font-['Montserrat',_sans-serif] text-[#6f6f6e] text-[0.95rem] font-medium hover:text-[#00c19f] [transition:all_0.3s_ease-in]"
              >
                Compromiso con la sociedad
              </a>
            </li>
            <li>
              <a
                href="https://www.apeseg.org.pe/category/nota-de-prensa/"
                className="font-['Montserrat',_sans-serif] text-[#6f6f6e] text-[0.95rem] font-medium hover:text-[#00c19f] [transition:all_0.3s_ease-in]"
              >
                Sala de prensa
              </a>
            </li>
            <li>
              <a
                href="https://www.apeseg.org.pe/estadisticas/"
                className="font-['Montserrat',_sans-serif] text-[#6f6f6e] text-[0.95rem] font-medium hover:text-[#00c19f] [transition:all_0.3s_ease-in]"
              >
                Reportes y estadísticas
              </a>
            </li>
            <li className="max-w-[135px]">
              <a
                target="_blank"
                href="https://www.dimequetienesseguro.com/"
                className="font-['Barlow_Condensed',_sans-serif] text-[#085445] text-[1.5rem] leading-[0.75em] font-semibold text-left [transition:all_0.3s_ease-in] text-balance hover:text-[#64d8c2]"
              >
                Dime que tienes seguro…
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? "visible" : "invisible bg-transparent"
        }`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed top-0 left-0 z-50 h-screen w-[80%] max-w-[350px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-30`}
        style={{
          background: "linear-gradient(-45deg, #00c19f 5%, #392a7e)",
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center mb-[6px]">
            <a href="https://www.apeseg.org.pe/">
              <img
                width="180"
                height="70"
                src="https://www.apeseg.org.pe/wp-content/uploads/2020/12/apeseg-logo-verde.png"
                alt="Logo APESEG"
              />
            </a>
          </div>

          <div className="overflow-y-auto w-full z-30">
            <ul className="flex flex-col">
              <li>
                <a
                  href="https://www.apeseg.org.pe/nosotros/"
                  className="py-[0.5rem] px-[1.5rem] block font-['Montserrat',_sans-serif] text-white text-[0.95rem] font-medium hover:text-[#f0f0f0] [transition:all_0.3s_ease-in]"
                  onClick={toggleMenu}
                >
                  Conócenos
                </a>
              </li>
              <li>
                <a
                  href="https://www.apeseg.org.pe/derechos-de-los-usuarios/"
                  className="py-[0.5rem] px-[1.5rem] block font-['Montserrat',_sans-serif] text-white text-[0.95rem] font-medium hover:text-[#f0f0f0] [transition:all_0.3s_ease-in]"
                  onClick={toggleMenu}
                >
                  Derechos de los usuarios
                </a>
              </li>
              <li>
                <a
                  href="https://www.apeseg.org.pe/compromiso-con-la-sociedad/"
                  className="py-[0.5rem] px-[1.5rem] block font-['Montserrat',_sans-serif] text-white text-[0.95rem] font-medium hover:text-[#f0f0f0] [transition:all_0.3s_ease-in]"
                  onClick={toggleMenu}
                >
                  Compromiso con la sociedad
                </a>
              </li>
              <li>
                <a
                  href="https://www.apeseg.org.pe/category/nota-de-prensa/"
                  className="py-[0.5rem] px-[1.5rem] block font-['Montserrat',_sans-serif] text-white text-[0.95rem] font-medium hover:text-[#f0f0f0] [transition:all_0.3s_ease-in]"
                  onClick={toggleMenu}
                >
                  Sala de prensa
                </a>
              </li>
              <li>
                <a
                  href="https://www.apeseg.org.pe/estadisticas/"
                  className="py-[0.5rem] px-[1.5rem] block font-['Montserrat',_sans-serif] text-white text-[0.95rem] font-medium hover:text-[#f0f0f0] [transition:all_0.3s_ease-in]"
                  onClick={toggleMenu}
                >
                  Reportes y estadísticas
                </a>
              </li>
              <li className="w-full bg-[#00c19f]">
                <a
                  target="_blank"
                  href="https://www.dimequetienesseguro.com/"
                  className="py-[0.5rem] px-[1.5rem] block font-barlow text-white text-[1.5rem] break-words-[2] text-left leading-[0.85em] font-[600] hover:text-[#f0f0f0] [transition:all_0.3s_ease-in]"
                  onClick={toggleMenu}
                >
                  Dime que
                  <br /> tienes seguro…
                </a>
              </li>
              <li>
                <a
                  href="https://www.apeseg.org.pe/insurance-day-2025/"
                  className="py-[0.5rem] px-[1.5rem] block font-['Montserrat',_sans-serif] text-white text-[0.95rem] font-medium hover:text-[#f0f0f0] [transition:all_0.3s_ease-in]"
                  onClick={toggleMenu}
                >
                  Insurance Day 2025
                </a>
              </li>
              <li>
                <a
                  href="https://www.dimequetienesseguro.com/consulta-soat/"
                  className="py-[0.5rem] px-[1.5rem] block font-['Montserrat',_sans-serif] text-white text-[0.95rem] font-medium hover:text-[#f0f0f0] [transition:all_0.3s_ease-in]"
                  onClick={toggleMenu}
                >
                  Consulta SOAT
                </a>
              </li>
              <li>
                <a
                  href="https://www.apeseg.org.pe/seguro-de-vida-ley-preguntas/"
                  className="py-[0.5rem] px-[1.5rem] block font-['Montserrat',_sans-serif] text-white text-[0.95rem] font-medium hover:text-[#f0f0f0] [transition:all_0.3s_ease-in]"
                  onClick={toggleMenu}
                >
                  Seguro de Vida Ley
                </a>
              </li>
              <li>
                <a
                  href="https://www.apeseg.org.pe/category/palabra-de-eduardo-moron/"
                  className="py-[0.5rem] px-[1.5rem] block font-['Montserrat',_sans-serif] text-white text-[0.95rem] font-medium hover:text-[#f0f0f0] [transition:all_0.3s_ease-in]"
                  onClick={toggleMenu}
                >
                  La palabra de Eduardo Morón
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
