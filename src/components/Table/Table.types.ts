import React from "react";
import { RevenueData, RevenueDataArray } from "../../types/revenue";

export type RowData =  RevenueData

export type Column = {
    id: string;
    label: string;
    key: string;
    style?: unknown;
    cellRenderer?: (row: RevenueData) => React.ReactNode;
    sort?: boolean
}

export type EnhancedTableProps = {
    columns: Column[];
    rows: RevenueDataArray;
    isSelect?: boolean
    count: number
    page: number
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void
}

export type EnhancedTableBodyProps = {
    columns: Column[];
    data: RowData[];
}

export type HeadCell = {
    id: string;
    label: string;
    disablePadding?: boolean;
    sort?: boolean
}

export type EnhancedTableHeadProps = {
    order: "asc" | "desc";
    orderBy: string;
    onRequestSort: (event: MouseEvent, property: string) => void;
    headerData: HeadCell[];
}