import { FC, useEffect, useMemo, useState } from 'react'
import { UseQueryResult, useQueries } from '@tanstack/react-query'

import Box from '@mui/material/Box'
import { SelectChangeEvent } from '@mui/material'

import { NavBar } from '../../components/navBar/NavBar'
import { BasicSelect } from '../../components/Select/Select'

import { ChartData } from './sections/chartData/ChartData'
import { TableData } from './sections/tableData/TableData'

import { getRevenueData, getRevenueChartData } from '../../api/revenue.api'

import { MonthData, RevenueDataArray } from '../../types/revenue'

import '../../components/navBar/navbar.scss'

type MyQueries = [
    UseQueryResult<{ data: { data: Record<string, MonthData>; revenueType: string[], } }, Error>,
    UseQueryResult<{ data: RevenueDataArray & { total: number }, }, Error>
]

/**
 * Pages - Dashboard
 */
export const Dashboard: FC = () => {
    const [selectedProduct, setSelectedProduct] = useState('all')
    const [page, setPage] = useState<number>(0)


    const [revenueChartsQuery, revenueDataQuery] = useQueries<MyQueries>({
        queries: [
            {
                queryKey: ['revenueChartsQuery'],
                queryFn: () => getRevenueChartData(),
            },

            {
                queryKey: ['revenueDataQuery'],
                queryFn: () => getRevenueData({ page }),
            },
        ],
    });

    useEffect(() => {
        revenueDataQuery.refetch()
    }, [page])


    const revenueTypes = useMemo(() => {
        return (revenueChartsQuery.data?.data.revenueType)?.map(type => ({ label: type, value: type })) || []
    }, [revenueChartsQuery])

    const products = useMemo(() => {
        const uniqueProducts = Array.from(new Set(Object.keys((revenueChartsQuery?.data?.data?.data || []) as Record<string, MonthData>)))


        return uniqueProducts.map((product) => ({
            label: product,
            value: product,
        }));
    }, [revenueChartsQuery])

    if (revenueChartsQuery.isLoading) {
        return <span>Loading...</span>
    }

    if (revenueChartsQuery.isError) {
        return <span>Error: {revenueChartsQuery?.error?.message}</span>
    }

    /**
     * Manage all the filter change
     */
    const handleProductChange = (event: SelectChangeEvent<unknown>) => {
        setSelectedProduct(event.target.value as string)
    }

    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <NavBar revenueTypes={revenueTypes} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Box sx={{ maxWidth: '80%' }}>
                    <Box sx={{ padding: '10px 21px', display: 'flex', marginTop: '20px' }}>
                        <BasicSelect
                            label={'Product'}
                            value={selectedProduct}
                            options={[{ label: 'all', value: 'all' }, ...products]}
                            onChange={handleProductChange}
                        />

                    </Box>
                    {revenueChartsQuery?.data && <ChartData data={revenueChartsQuery.data.data.data} selectedProduct={selectedProduct} />}
                    {revenueDataQuery?.data &&
                        <TableData
                            data={revenueDataQuery.data.data}
                            count={revenueDataQuery.data.data.total}
                            page={page}
                            handleChangePage={handleChangePage}
                        />
                    }

                </Box>
            </Box>

        </div>
    )
}