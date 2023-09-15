import { RevenueDataArray } from "../../../../types/revenue"

export type TableDataType = {
    data: RevenueDataArray
    count: number
    page: number
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void
}