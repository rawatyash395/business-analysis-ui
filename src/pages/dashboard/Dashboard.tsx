import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'

import { NavBar } from '../../components/navBar/navBar'

import { ChartData } from './sections/chartData/ChartData'
import { TableData } from './sections/tableData/TableData'

import { getRevenueData } from '../../api/revenue.api'

/**
 * Pages - Dashboard
 */
export const Dashboard: FC = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryFn: getRevenueData,
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }


    return (
        <div>
            <NavBar />
            <div>
                {data?.data && <ChartData data={data.data} />}
                {data?.data && <TableData data={data.data} />}

            </div>
        </div>
    )
}