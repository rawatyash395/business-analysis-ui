import { MonthData } from "../../../../types/revenue"

export type ChartDataType = {
    data: Record<string, MonthData>
    selectedProduct: string
}