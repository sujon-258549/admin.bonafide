const readVar = (name: string): string => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

export const themeColors = () => ({
  primary: readVar("--primary"),
  secondary: readVar("--secondary"),
  chart1: readVar("--chart-1"),
  chart2: readVar("--chart-2"),
  chart3: readVar("--chart-3"),
  chart4: readVar("--chart-4"),
  chart5: readVar("--chart-5"),
});

export const chartPalette = (): string[] => {
  const c = themeColors();
  return [c.chart1, c.chart2, c.chart3, c.chart4, c.chart5];
};
