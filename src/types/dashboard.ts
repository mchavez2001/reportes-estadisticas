export type Categories = {
  [category: string]: string[];
};

export interface ChartDataPoint {
  year: number;
  value: number;
}

export interface ChartDataPointMonth {
  year: number;
  month: number;
  value: number;
}

export interface CategoryData {
  name: string;
  color: string;
  data: ChartDataPoint[];
  typeChart?: string;
}

export interface FilterState {
  category: string;
  subCategory: string;
  yearRange: [number, number];
  months: number[];
  type: string;
  byMonth: boolean;
  inUSD: boolean;
}

export interface Terms {
  name: string;
  desc: string;
}
