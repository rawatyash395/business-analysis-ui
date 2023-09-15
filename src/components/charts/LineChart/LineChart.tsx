import { FC } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { LineChartType } from './LineChart.types'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**
 * Components - charts -> Line Chart
 */
export const LineChart: FC<LineChartType> = ({
    data,
    options
}) => {

    return (
        <Line
            options={options}
            data={data}
        />
    )
}