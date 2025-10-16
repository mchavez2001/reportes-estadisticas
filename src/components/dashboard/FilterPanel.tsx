import ReactSlider from "react-slider";
import React, { useState, useEffect } from "react";

import type { FilterState, Categories } from "../../types/dashboard";

interface FilterPanelProps {
  initialFilters: FilterState;
  categories: Categories;
  onFilterSubmit: (filters: FilterState) => void;
  yearRange: [number, number];
  months: number[];
  types: string[];
}

const monthNames = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const FilterPanel = ({
  initialFilters,
  categories,
  yearRange,
  months,
  types,
  onFilterSubmit,
}: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [availableSubCategories, setAvailableSubCategories] = useState<
    string[]
  >(categories[filters.category] || []);

  useEffect(() => {
    let availableSubs = categories[filters.category] || [];
    setAvailableSubCategories(availableSubs);
  }, [filters.category]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, type: e.target.value });
  };

  const handleByMonthChange = () => {
    setFilters({
      ...filters,
      byMonth: !filters.byMonth,
    });
  };

  const handleInUSDChange = () => {
    setFilters({
      ...filters,
      inUSD: !filters.inUSD,
    });
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, subCategory: e.target.value });
  };

  const handleYearRangeChange = (value: [number, number]) => {
    setFilters({ ...filters, yearRange: value });
  };

  const handleMonthToggle = (monthId: number) => {
    const updatedMonths = filters.months.includes(monthId)
      ? filters.months.filter((id) => id !== monthId)
      : [...filters.months, monthId];

    setFilters({ ...filters, months: updatedMonths });
  };

  const handleClean = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({
      category: "",
      subCategory: "",
      yearRange: [2018, 2025],
      months: [],
      type: "Primas de Seguros Netas",
      byMonth: false,
      inUSD: false,
    });
    onFilterSubmit({
      category: "",
      subCategory: "",
      yearRange: [2018, 2025],
      months: [],
      type: "Primas de Seguros Netas",
      byMonth: false,
      inUSD: false,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterSubmit(filters);
  };

  const sortCategories = (categories: Categories): Categories => {
    const { Generales, ...rest } = categories;
    return Generales ? { Generales, ...rest } : { ...categories };
  };

  useEffect(() => {
    let availableSubs = categories[filters.category] || [];
    setAvailableSubCategories(availableSubs);
  }, [filters.category]);

  return (
    <div className="rounded-lg shadow-b-lg p-6 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Variable/Indicador
            </label>
            <select
              id="type"
              value={filters.type}
              onChange={handleTypeChange}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ramo
            </label>
            <select
              id="category"
              value={filters.category}
              onChange={handleCategoryChange}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option key="Todos" value="">
                Todos los ramos
              </option>
              {Object.entries(sortCategories(categories)).map(([key, _]) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Riesgo
            </label>
            <select
              id="subcategory"
              value={filters.subCategory}
              onChange={handleSubCategoryChange}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option key="Todos" value="">
                Todos los riesgos
              </option>
              {availableSubCategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="my-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-start gap-3">
            <label
              htmlFor="accumulated_by_year"
              className="inline-flex items-center gap-3"
            >
              <input
                type="radio"
                name="accumulation_type"
                className="size-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="accumulated_by_year"
                checked={!filters.byMonth}
                onChange={() => handleByMonthChange()}
              />
              <span className="text-sm text-gray-700">Por año</span>
            </label>

            <label
              htmlFor="accumulated_by_month"
              className="inline-flex items-center gap-3"
            >
              <input
                type="radio"
                name="accumulation_type"
                className="size-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="accumulated_by_month"
                checked={filters.byMonth}
                onChange={() => handleByMonthChange()}
              />
              <span className="text-sm text-gray-700">Por mes</span>
            </label>
          </div>
        </div>

        {filters.type !== "Siniestralidad" && (
          <div className="my-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start gap-3">
              <label
                htmlFor="inSoles"
                className="inline-flex items-center gap-3"
              >
                <input
                  type="radio"
                  name="currency_type"
                  className="size-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="inSoles"
                  checked={!filters.inUSD}
                  onChange={() => handleInUSDChange()}
                />
                <span className="text-sm text-gray-700">En S/</span>
              </label>

              <label htmlFor="inUSD" className="inline-flex items-center gap-3">
                <input
                  type="radio"
                  name="currency_type"
                  className="size-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="inUSD"
                  checked={filters.inUSD}
                  onChange={() => handleInUSDChange()}
                />
                <span className="text-sm text-gray-700">En US$</span>
              </label>
            </div>
          </div>
        )}

        <div className="mb-16">
          <label className="block text-sm font-medium text-gray-700 mb-8">
            Rango de Años: {filters.yearRange[0]} - {filters.yearRange[1]}
          </label>
          <div className="mb-8 px-2">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="slider-thumb"
              trackClassName="slider-track"
              min={yearRange[0]}
              max={yearRange[1]}
              defaultValue={filters.yearRange}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state: { valueNow: any }) =>
                `Year ${state.valueNow}`
              }
              pearling
              minDistance={1}
              onChange={handleYearRangeChange}
              renderThumb={(
                props: { [x: string]: any; key: any },
                state: {
                  valueNow:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactPortal
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              ) => {
                const { key, ...restProps } = props;
                return (
                  <div
                    key={key}
                    {...restProps}
                    className="h-5 w-5 rounded-full bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-grab active:cursor-grabbing"
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                      {state.valueNow}
                    </div>
                  </div>
                );
              }}
              renderTrack={(
                props: { [x: string]: any; key: any },
                state: { index: number }
              ) => {
                const { key, ...restProps } = props;
                return (
                  <div
                    key={key}
                    {...restProps}
                    className={`h-1 ${
                      state.index === 1 ? "bg-indigo-600" : "bg-gray-300"
                    } rounded-full`}
                  />
                );
              }}
            />
          </div>
        </div>

        <div className="mt-16 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meses
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {months.map((month) => (
              <div key={month} className="flex items-center">
                <input
                  id={`month-${month}`}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={filters.months.includes(month)}
                  onChange={() => handleMonthToggle(month)}
                />
                <label
                  htmlFor={`month-${month}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {monthNames[month]}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden mb-8">
          <label
            htmlFor="byMonth"
            className="inline-flex items-center gap-4 cursor-pointer"
          >
            <span className="text-base font-medium text-gray-900">
              Graficar la información por meses
            </span>
            <input
              id="byMonth"
              name="byMonth"
              type="checkbox"
              value={filters.byMonth ? 1 : 0}
              checked={filters.byMonth}
              onChange={handleByMonthChange}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
          </label>
        </div>

        <div className="mt-4 flex justify-end gap-8">
          <button
            type="button"
            onClick={handleClean}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Limpiar
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Consultar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterPanel;
