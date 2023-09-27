import { FC, memo } from "react";
import { LineChart } from "../../../../components/charts/LineChart/LineChart";
import { sumOfACVDataset } from "../../../../utils/chartDataset";

import { ChartDataType } from "./ChartData.types";

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
            text: 'Sum of ACV',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Pages - Dashboard -> Section -> ChartData
 */
export const ChartData: FC<ChartDataType> = memo(({ data, selectedProduct }) => {
    const datasets = sumOfACVDataset(labels, data, selectedProduct)
    return (
        <LineChart options={options} data={datasets} />
    )
})