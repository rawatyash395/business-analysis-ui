import { FC } from 'react'
import { EnhancedTable } from '../../../../components/Table/Table'

import { tableColumns } from './columns'

import { TableDataType } from './TableData.types'

/**
 * Pages - Dashboard -> Sections -> TableData
 */
export const TableData: FC<TableDataType> = ({ data }) => {
    return (
        <div>
            <EnhancedTable columns={tableColumns} rows={data} />
        </div>
    )
}