import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Box from '@mui/material/Box'
import { SelectChangeEvent } from '@mui/material'

import { NavBar } from '../../components/navBar/NavBar'
import { BasicSelect } from '../../components/Select/Select'

import { ChartData } from './sections/chartData/ChartData'
import { TableData } from './sections/tableData/TableData'

import { getRevenueData, getRevenueChartData } from '../../api/revenue.api'

import { MonthData, RevenueDataArray } from '../../types/revenue'

import '../../components/navBar/navbar.scss'

type ChartDataType = { data: { data: Record<string, MonthData>; revenueType: string[] } }
type RevenueDataType = { data: RevenueDataArray & { total: number } }

/**
 * Pages - Dashboard
 */
export const Dashboard: FC = () => {
    const [selectedProduct, setSelectedProduct] = useState('all')
    const [page, setPage] = useState<number>(0)

    const revenueChartsQuery = useQuery<ChartDataType, Error>({
        queryKey: ['revenueChartsQuery'],
        queryFn: () => getRevenueChartData(),
        refetchOnWindowFocus: false,
    })

    const revenueDataQuery = useQuery<RevenueDataType, Error>({
        queryKey: ['revenueDataQuery'],
        queryFn: () => getRevenueData({ page }),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    const { refetch } = revenueDataQuery

    useEffect(() => {
        // Refetch revenue paginated data based on current page
        refetch()
    }, [page, refetch])

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

    /**
     * Manage all the filter change
     */
    const handleProductChange = useCallback((event: SelectChangeEvent<unknown>) => {
        setSelectedProduct(event.target.value as string)
    }, [])

    const handleChangePage = useCallback((_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    }, []);

    if (revenueChartsQuery.isLoading) {
        return <span>Loading...</span>
    }

    if (revenueChartsQuery.isError) {
        return <span>Error: {revenueChartsQuery?.error?.message}</span>
    }


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
                            options={[{ label: 'All', value: 'all' }, ...products]}
                            onChange={handleProductChange}
                        />

                    </Box>
                    {revenueChartsQuery?.data && <ChartData data={revenueChartsQuery.data.data.data || {}} selectedProduct={selectedProduct} />}
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