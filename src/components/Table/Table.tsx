import { useState, useCallback, useMemo } from "react";
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
  isSelect,
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof RowData>("name");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleRequestSort = useCallback(
    (property: keyof RowData) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    [rows]
  );

  const handleClick = useCallback(
    (_: React.MouseEvent<unknown>, name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const handleChangePage = useCallback((_, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const isSelected = useMemo(
    () => (name: string) => selected.indexOf(name) !== -1,
    [selected]
  );

  return (
    <Box sx={{ width: "100%", padding: "16px", overflow: "auto" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead
              headerData={columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              isSelect={isSelect}
            />

            <TableBody
              data={rows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
              isSelected={isSelected}
              page={page}
              rowsPerPage={rowsPerPage}
              columns={columns}
              handleClick={handleClick}
              isSelect={isSelect}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
