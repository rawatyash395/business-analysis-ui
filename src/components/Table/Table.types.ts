import { RevenueDataArray } from "../../types/revenue";

export type RowData =  RevenueDataArray

export type Column = {
    id: string;
    label: string;
    key: string;
    style?: any;
    cellRenderer?: (row: any) => React.ReactNode;
}

export type EnhancedTableProps = {
    columns: Column[];
    rows: RevenueDataArray;
}

export type EnhancedTableBodyProps = {
    columns: Column[];
    data: RowData[];
    isSelected: (name: string) => boolean;
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void;
    page: number;
    rowsPerPage: number;
    isSelect: boolean;
  }