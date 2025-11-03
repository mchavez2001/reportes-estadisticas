//=== Librerías de terceros ===//
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

//=== Componentes locales ===//
import Title from "./components/ui/Title";
import Navbar from "./components/dashboard/Navbar";
import Footer from "./components/dashboard/Footer";
import TimeLineFiles from "./components/ui/TimeLineFiles";
import SectionReport from "./components/ui/SectionReport";
import ChartsGroup from "./components/dashboard/ChartsGroup";
import FilterPanel from "./components/dashboard/FilterPanel";
import ResultsChart from "./components/dashboard/ResultsChart";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import ReportCardSlider from "./components/dashboard/ReportCardSlider";
import ReportCardResponsive from "./components/cards/ReportCardResponsive";
import IndicatorCardSlider from "./components/dashboard/IndicatorCardSlider";

//=== Archivos de utilidades ===//
//===================================
// Ojo: Estamos usando información de prueba solo para la visualización de data y para que vean
// la estructura del cuerpo que debe tener el formato JSON que deberán enviar. La información de
// prueba está en el archivo "dummyData.ts"
//===================================//
import {
  filters,
  last_year,
  categories,
  last_month,
  filtered_data,
  yearly_net_premium,
  yearly_percent_premium,
  yearly_sinister_premium,
} from "./utils/dummyData";
import type {
  Categories,
  FilterState,
  ChartDataPoint,
  ChartDataPointMonth,
} from "./types/dashboard";
import Report2023 from "./assets/images/report_2023.png";
import Report2025 from "./assets/images/report_2025.png";
import { API_PATHS } from "./utils/apiPaths"; // Aquí colocarán sus APIs
import { axiosInstance } from "./utils/axiosInstance"; // Este es el instanciador de axios

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>({
    filtered_data: filtered_data,
    yearly_net_premium,
    yearly_percent_premium,
    yearly_sinister_premium,
  });
  const [filteredData, setFilteredData] = useState<any>(filtered_data);

  const defaultFilters: FilterState = {
    category: "",
    subCategory: "",
    type: "Primas de Seguros Netas",
    yearRange: [2018, 2025],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    byMonth: true,
    inUSD: false,
  };
  const [filtersState, setFiltersState] = useState<FilterState>(defaultFilters);

  const handleFilterSubmit = async (filters: FilterState) => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INSURANCE.GET_RESUMEN,
        {
          params: {
            category: filters.category,
            subCategory: filters.subCategory,
            yearRange: filters.yearRange.join(","),
            months: filters.months.join(","),
            type: filters.type,
            byMonth: filters.byMonth,
            inUSD: filters.inUSD,
          },
        }
      );

      setDashboardData(response.data);
      setFilteredData(response.data.filtered_data); // 🔹 actualizar filteredData desde API
    } catch (error) {
      console.log("Error completo:", error);
      setFilteredData(null); // opcional: limpiar si falla
    }
  };

  const handleSubmitAndKeepOpen = (filters: FilterState) => {
    setFiltersState(filters);
    handleFilterSubmit(filters);
    setIsOpen(true);
  };

  useEffect(() => {
    handleSubmitAndKeepOpen(filtersState); // 🔹 cargar datos desde API al inicio
  }, []);

  const showResults = filtered_data ? true : false;
  //const showResults = filteredData && filteredData.length > 0;

  //----- Información de las categorías
  const categoriesData = [
    {
      name: "Primas de Seguros Netas",
      color: "#392a7e",
      data: dashboardData?.yearly_net_premium,
    },
    {
      name: "Siniestros de Primas de Seguros Netos",
      color: "#00c19f",
      data: dashboardData?.yearly_sinister_premium,
    },
    {
      name: "Siniestralidad",
      color: "#14B8A6",
      data: dashboardData?.yearly_percent_premium,
      typeChart: "line",
    },
  ];

  //----- Handlers -----//s
  //const handleFilterSubmit = (filters: FilterState) => {
  // try {
  //   const response = await axiosInstance.post({ENDPOINT,
  //     category: filters.category,
  //     subCategory: filters.subCategory,
  //     yearRange: filters.yearRange,
  //     months: filters.months,
  //     type: filters.type,
  //     byMonth: filters.byMonth,
  //     inUSD: filters.inUSD,
  //   });
  // } catch (error) {
  //   if (error.response && error.response.data.message) {
  //     console.error(error.response.data.message);
  //   } else {
  //     console.error("¡Algo salió mal. Inténtalo nuevamente!");
  //   }
  // }
  //console.log(filters);
  //};

  //console.log("📦 filters actuales:", filtersState);

  return (
    <main className="min-h-screen">
      {/* Componente: Barra de navegación */}
      <Navbar />

      {/* Sección de estadísticas */}
      <section className="flex flex-col shadow-inner-lg">
        {/* Componente: Cabecera principal  */}
        <DashboardHeader />

        {/* Componente: Total de casos de registrados */}
        <div className="mt-6 lg:mt-12 container mx-auto px-4 max-w-7xl">
          {/* Componente: Tarjetas de reportes versión de escritorio */}
          <ReportCardSlider />

          {/* Componente: Tarjetas de reportes versión de escritorio */}
          <ReportCardResponsive />

          {/* Fuente */}
          <div className="mt-5 flex items-end justify-end">
            <p className="text-sm text-end text-[#6F6F6E]">
              Fuente: Reporte del Sector Asegurador 2024
            </p>
          </div>
        </div>

        {/* Estadísticas de Principales variables del sector asegurador peruano */}
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mt-20">
            {/* Componente: Título */}
            <Title title="Principales variables del sector asegurador peruano" />

            {/* Componente: Grupo de estadísticas */}
            <ChartsGroup
              data={categoriesData}
              last_month={dashboardData?.last_month}
              last_year={dashboardData?.last_year}
              in_usd={filtersState ? filtersState.inUSD : false}
            />

            {/* Fuente */}
            <div className="mt-5 flex flex-col items-end justify-end leading-0">
              <p className="text-sm text-end text-[#6F6F6E]">
                * Datos acumulados de enero a mayo del 2025
              </p>
              <p className="text-sm text-end text-[#6F6F6E]">
                Fuente: SBS | Elaboración: APESEG
              </p>
            </div>
          </div>
        </div>

        {/* Principales indicadores de calidad */}
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mt-20">
            {/* Componente: Título */}
            <Title title="Principales indicadores de calidad" />

            {/* Título centrado */}
            <h1 className="mt-6 text-[#392A7E] text-[20px] lg:text-[28px] text-center font-bold">
              Reclamos
            </h1>

            {/* Componente: Carrusel de indicadores */}
            <IndicatorCardSlider />

            {/* Fuente extra */}
            <div className="mt-6 flex flex-col items-start justify-start gap-1">
              <p className="text-xs md:text-sm text-start text-neutral-800">
                * Datos correspondientes al primer trimestre del 2025.
              </p>
            </div>

            {/* Fuente */}
            <div className="mt-6 flex items-end justify-end">
              <p className="text-sm text-end text-[#6F6F6E]">
                Fuente y elaboración: SBS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de consultas y filtros */}
      <section className="mt-12 container mx-auto px-4 max-w-7xl">
        <div className="rounded-lg overflow-hidden border-b-0">
          {/* Botón de apertua de la sección u ocultarse */}
          <button
            className="w-full flex justify-between items-center text-left bg-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Componente: Título */}
            <Title title="Realiza una consulta personalizada" />

            {/* Icono */}
            <ChevronDown
              className={`w-6 h-6 transform transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`transition-all duration-300 ${
              isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 border-t">
              <FilterPanel
                initialFilters={
                  filters ?? {
                    category: "",
                    subCategory: "",
                    yearRange: [2018, 2025],
                    months: [],
                    type: "Primas de Seguros Netas",
                    byMonth: false,
                    inUSD: false,
                  }
                }
                types={[
                  "Primas de Seguros Netas",
                  "Siniestros de Primas de Seguros Netos",
                  "Siniestralidad",
                ]}
                months={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                categories={categories}
                yearRange={[2018, 2025]}
                onFilterSubmit={handleSubmitAndKeepOpen}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de resultados */}
      <section
        id="results-section"
        className="container mx-auto px-4 max-w-7xl transition-opacity duration-500"
      >
        <ResultsChart
          monthsFiltered={
            filtersState ? filtersState.months.length < 12 : false
          }
          data={
            dashboardData?.filtered_data
              ? dashboardData?.filtered_data
              : [
                  {
                    year: 2023,
                    value: 2,
                  },
                ]
          }
          type={filters ? filters.type : "Primas de Seguros Netas"}
          category={filters ? filters.category : "Todos los ramos"}
          subCategory={filters ? filters.subCategory : "Todos los riesgos"}
          isVisible={showResults}
          inUSD={filtersState ? filtersState.inUSD : false}
          color={
            categoriesData.filter(
              (item) => item.name == `${filters ? filters.type : "#4F46E5"}`
            )[0]?.color
          }
        />
      </section>

      {/* Secciónes de reportes informativos */}
      <section className="container mx-auto px-4 max-w-7xl transition-opacity duration-500">
        <div className="mt-12 flex flex-col">
          {/* Componente: Título */}
          <Title title="Conoce nuestra contribución al bienestar de la población peruana" />

          {/* Componente: Sección de reporte 01 */}
          <SectionReport
            title={"Reporte 2023"}
            content={
              "El sector asegurador peruano desembolsó diariamente S/ 4.6 millones para dar tranquilidad financiera a aquellas familias que perdieron a un ser querido en el 2023. Además, pagó S/ 3.3 millones para cubrir robos y daños a vehículos; S/ 2.4 millones destinados a la atención de salud, desde consultas ambulatorias hasta hospitalizaciones; S/ 1.8 millones para atender los daños originados por incendios y demás daños a los negocios; y S/ 1 millón para casos de SOAT, daños a viviendas, problemas de viajes y siniestros agrícolas. El dinero desembolsado por el sector asegurador duplicó a la inversión en infraestructura educativa y fue equivalente a 12 veces lo que se invertirá en la Vía Expresa Sur."
            }
            image={Report2023}
            isBackground={true}
            contentSide="left"
            hasActionsButtons={true}
          />
        </div>

        <div className="flex flex-col">
          {/* Componente: Título */}
          <Title title="Revisa nuestro Reporte Estadístico Trimestral" />

          {/* Componente: Sección de reporte 02 */}
          <SectionReport
            title={"Reporte Marzo 2025"}
            content={
              "A marzo del 2025, en términos anualizados, las 17 empresas del sector asegurador recibieron S/22,535 millones en primas de seguros netas (+9% respecto del 2024), siendo los seguros de vida (S/ 9,347 millones) los que más crecieron (+23.6%), pasando con ello a convertirse en el principal ramo de seguros (41.48% de las primas totales). El único ramo que tuvo una caída en el periodo fue el de seguros del Sistema Privado de Pensiones (-2.4%). Con estos resultados, la penetración del seguro en el Perú (primas / PBI) alcanzó el 2.06% con un gasto per cápita en seguros de US$ 180."
            }
            image={Report2025}
            isBackground={false}
            contentSide="right"
            hasActionsButtons={false}
          />
        </div>
      </section>

      {/* Secciónes de reportes informativos */}
      <section className="container mx-auto px-4 max-w-7xl transition-opacity duration-500">
        <TimeLineFiles />
      </section>

      {/* Pie de página */}
      <Footer />
    </main>
  );
};

export default App;
