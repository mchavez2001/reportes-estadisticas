export const formatAxisCurrency = (value: number, isMillions: boolean) => {
  if (value === 0) return "0";

  if (isMillions) {
    return (value / 1000000).toLocaleString("es-PE", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  } else {
    return `${(value / 1000).toFixed(1)}`;
  }
}