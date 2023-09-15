import { ChartOptions } from 'chart.js';

export type LineChartType = {
    options: ChartOptions
    data: {
        labels: string[]; // Array of labels for the x-axis
        datasets: {
          label: string; // Dataset label
          data: number[]; // Array of data points
          borderColor: string; // Line color
          backgroundColor: string; // Fill color (if needed)
        }[];
      };
}