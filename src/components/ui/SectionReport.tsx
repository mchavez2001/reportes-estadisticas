const SectionReport = ({
  title,
  image,
  isBackground,
  contentSide,
  hasActionsButtons,
}: {
  title: string;
  image: string;
  isBackground: boolean;
  contentSide: string;
  hasActionsButtons: boolean;
}) => {
  return (
    <div
      className={`flex flex-col ${
        isBackground ? "bg-[#DEFFF9]/40" : "bg-white"
      }`}
    >
      <div
        className={`px-4 py-12 flex ${
          contentSide === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
        } flex-col-reverse  items-center justify-evenly rounded-[20px] `}
      >
        <div className="w-full max-w-[640px] flex-1 flex flex-col gap-2">
          <h1 className="text-[#392A7E] text-[20px] lg:text-[28px] font-bold">
            {title}
          </h1>
          <p className="font-[Inter] mt-2 text-[16px] lg:text-[18px] text-pretty text-[#6F6F6E] leading-[1.3em]">
            En el 2024, el sector asegurador entregó cada día{" "}
            <b>S/ 4.5 millones</b> para apoyar a las familias que perdieron a un
            ser querido. También desembolsó <b>S/ 3.3 millones</b> por robos,
            daños vehiculares e indemnizaciones; <b>S/ 2.5 millones</b>{" "}
            destinados a la atención de salud, desde consultas ambulatorias
            hasta hospitalizaciones; <b>S/ 1.3 millones</b> para atender los
            daños originados por incendios y demás daños a los negocios; y{" "}
            <b>S/ 1.1 millones</b> para casos de SOAT, daños a viviendas,
            problemas de viajes y siniestros agrícolas. El dinero desembolsado
            superó en casi <b>S/ 2 millones</b> al gasto público conjunto de
            tres regiones y fue casi el doble de la inversión inicial para el
            Terminal Portuario de Chancay.
          </p>
        </div>

        <img
          src={image}
          alt={title}
          className="mb-4 lg:mb-0 w-full max-w-[264px]"
        />
      </div>

      {hasActionsButtons && (
        <div className="w-full max-w-[636px] mx-auto mb-12 lg:my-6 flex flex-col lg:flex-row items-center justify-center gap-6">
          <p className="text-[18px] text-black font-semibold">
            Revisa nuestros reportes:
          </p>          
          <button className="bg-[#00C19F] p-[10px] cursor-pointer rounded-[10px]">
            <a
              href="https://www.dimequetienesseguro.com/wp-content/uploads/2025/10/reporte-asegurador-2024.pdf"
              target="_blank"
              className="underline-none text-white font-semibold"
            >
              Reporte 2024
            </a>
          </button>
          <button className="bg-[#696969] p-[10px] cursor-pointer rounded-[10px]">
            <a
              href="https://www.dimequetienesseguro.com/wp-content/uploads/2025/09/radiografia-DQTS-interactivo-final_compressed.pdf"
              target="_blank"
              className="underline-none text-white font-semibold"
            >
              Reporte 2023
            </a>
          </button>
          <button className="bg-[#696969] p-[10px] cursor-pointer rounded-[10px]">
            <a
              href="https://www.dimequetienesseguro.com/wp-content/uploads/2024/05/Radiografia-DQTS-interactivo.pdf"
              target="_blank"
              className="underline-none text-white font-semibold"
            >
              Reporte 2022
            </a>
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionReport;
