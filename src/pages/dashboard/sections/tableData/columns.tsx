import { Column } from "../../../../components/Table/Table.types";

export const tableColumns: Column[] = [
    {
        id: 'S_no',
        key: "S_no",
        label: "S No.",
        style: {
            align: "left",
        },
    },
    {
        id: "line_of_business",
        key: "line_of_business",
        label: "Line of Business",
        style: {
            align: "left",
        },
    },
    {
        id: "revenue_type",
        key: "revenue_type",
        label: "Revenue Type",
        style: {
            align: "left",
        },
    },
    {
        id: "product",
        key: "product",
        label: "Product",
        style: {
            align: "left",
        },
    },
    {
        id: "posting_period",
        key: "posting_period",
        label: "Posting Period",
        style: {
            align: "left",
        },
        cellRenderer: (row) => (
            <div>{`${row.month}-${row.year}`}</div>
        ),
    },
    {
        id: "acv",
        key: "acv",
        label: "ACV",
        style: {
            align: "left",
        },
        sort: true
    },
    {
        id: "tcv",
        key: "tcv",
        label: "TCV",
        style: {
            align: "left",
        },
    }
];