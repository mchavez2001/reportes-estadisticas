const Footer = () => {
  return (
    <div className="inline-block mt-[30px] w-full pt-[30px] bg-[#392a7e]">
      <div className="relative flex m-auto max-w-[1199px] w-full items-start gap-[20px] flex-wrap pl-4 pr-4">
        <div className="mb-[20px] flex-grow [flex-basis:200px] flex-shrink">
          <img
            src="https://www.apeseg.org.pe/wp-content/uploads/2019/06/apeseg.png"
            alt="Logo APESEG"
          />
        </div>
        <div className="mb-[20px] flex-grow [flex-basis:200px] flex-shrink">
          <div className="text-white text-sm font-light">
            <b>(511) 2011600</b>
            <br />
            <br />
            Amador Merino Reyna 307
            <br />
            Edificio Nacional piso 9<br />
            San Isidro - Lima
            <br />
            <br />
            <a
              href="mailto:seguros@apeseg.org.pe"
              className="font-normal hover:text-[#00c19f] [transition:all_.3s_ease-in]"
            >
              seguros@apeseg.org.pe
            </a>
          </div>
        </div>
        <div className="mb-[20px] flex-grow [flex-basis:200px] flex-shrink">
          <h3 className="text-white text-[1rem] mb-2 font-semibold relative after:absolute after:bottom-[0] after:left-[0] after:content-[] after:h-[2px] after:w-[30px] after:bg-[#00c19f]">
            Links de interés
          </h3>
          <div className="text-white text-sm">
            <a
              href="http://www.defaseg.com.pe"
              className="hover:text-[#00c19f] [transition:all_.3s_ease-in]"
            >
              Defensoría del Asegurado
            </a>
            <br />
            <a
              href="https://www.apeseg.org.pe/linea-de-integridad/"
              className="hover:text-[#00c19f] [transition:all_.3s_ease-in]"
            >
              Línea de Integridad
            </a>
          </div>
        </div>

        <div className="mb-[20px] flex-grow [flex-basis:200px] flex-shrink">
          <div className="text-white text-sm font-normal">
            <ul>
              <li className="pl-4 list-['-']">
                <a
                  href="https://www.apeseg.org.pe/estadisticas/"
                  className="hover:text-[#00c19f] [transition:all_.3s_ease-in]"
                >
                  Estadísticas
                </a>
              </li>
              <li className="pl-4 list-['-']">
                <a
                  href="https://www.apeseg.org.pe/sala-de-prensa/"
                  className="hover:text-[#00c19f] [transition:all_.3s_ease-in]"
                >
                  Sala de prensa
                </a>
              </li>
              <li className="pl-4 list-['-']">
                <a
                  href="https://www.dimequetienesseguro.com/consulta-soat/"
                  className="hover:text-[#00c19f] [transition:all_.3s_ease-in]"
                >
                  Consulta SOAT
                </a>
              </li>
              <li className="pl-4 list-['-']">
                <a
                  href="https://www.apeseg.org.pe/nosotros/"
                  className="hover:text-[#00c19f] [transition:all_.3s_ease-in]"
                >
                  Conócenos
                </a>
              </li>
              <li className="pl-4 list-['-']">
                <a
                  href="https://www.apeseg.org.pe/glosario-de-terminos/"
                  className="hover:text-[#00c19f] [transition:all_.3s_ease-in]"
                >
                  Glosario
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-[20px] flex-grow [flex-basis:200px] flex-shrink">
          <div className="text-white text-sm font-normal">
            <ul>
              <li className="pl-4 list-['-']">
                <a
                  href="https://www.apeseg.org.pe/preguntas-frecuentes/"
                  className="hover:text-[#00c19f] [transition:all_.3s_ease-in]"
                >
                  Preguntas frecuentes
                </a>
              </li>
              <li className="pl-4 list-['-']">
                <a
                  href="https://www.apeseg.org.pe/politica-web-de-proteccion-de-datos-personales/"
                  className="hover:text-[#00c19f] [transition:all_.3s_ease-in]"
                >
                  Política web de protección de datos personales
                </a>
              </li>
              <li className="pl-4 list-['-']">
                <a
                  href="https://www.apeseg.org.pe/contactenos/"
                  className="hover:text-[#00c19f] [transition:all_.3s_ease-in]"
                >
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="justify-center px-[10px] py-[5px] text-white text-center">
        Todos los derechos reservados 2019 | APESEG - Asociación Peruana de
        Empresas de Seguros
      </div>
    </div>
  );
};

export default Footer;
