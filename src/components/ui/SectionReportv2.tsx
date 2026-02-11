const SectionReportv2 = ({
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
          <h1 className="font-montserrat text-[#392A7E] text-[20px] lg:text-[28px] font-bold">
            {title}
          </h1>
          <p className="font-[Inter] mt-2 text-[16px] lg:text-[18px] text-pretty text-[#6F6F6E] leading-[1.3em]">
            A diciembre del 2025, en términos anualizados, las 17 empresas del sector asegurador recibieron S/24,035 millones en primas de seguros netas (+8.3% respecto del 2024), siendo los seguros de vida (S/ 11,160 millones) los que más crecieron (+26.6%), consolidándose con ello en el principal ramo de seguros (46.43% de las primas totales). En el l trimestre, dos ramos exhibieron resultados negativos, con la caída anualizada más fuerte experimentada por el ramo de seguros del Sistema Privado de Pensiones (-11.7%). Con estos resultados, la penetración del seguro en el Perú (primas / PBI) alcanzó el 2.04% con un gasto per cápita anual en seguros de US$ 173.
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

          <button className="bg-[#00C19F] p-[10px] cursor-pointer rounded-[10px] hidden">
            <a
              href="https://www.dimequetienesseguro.com/wp-content/uploads/2025/02/radiografia-DQTS-interactivo-2023-1.pdf"
              target="_blank"
              className="underline-none text-white font-semibold"
            >
              Reporte 2023
            </a>
          </button>
          <button className="bg-[#00C19F] p-[10px] cursor-pointer rounded-[10px]">
            <a
              href="https://www.dimequetienesseguro.com/wp-content/uploads/2025/10/reporte-asegurador-2024.pdf"
              target="_blank"
              className="underline-none text-white font-semibold"
            >
              Reporte 2024
            </a>
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionReportv2;
