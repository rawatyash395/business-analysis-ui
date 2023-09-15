import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

import { EnhancedTableHead as TableHead } from "./TableHead";
import { EnhancedTableBody as TableBody } from "./TableBody";


import { EnhancedTableProps, RowData } from './Table.types'

/**
 * Component - Table
 */
export const EnhancedTable: React.FC<EnhancedTableProps> = ({
  columns,
  rows,
  count,
  page,
  handleChangePage
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof RowData>("acv");

  const handleRequestSort = useCallback(
    (property: keyof RowData) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead
              headerData={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />

            <TableBody
              data={rows?.data}
              columns={columns}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={count}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
};
