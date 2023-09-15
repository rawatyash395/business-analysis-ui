import { useCallback, MouseEvent } from 'react';

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";

import { EnhancedTableHeadProps } from './Table.types';

export const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = (props) => {
  const {
    order,
    orderBy,
    onRequestSort,
    headerData,
  } = props;

  const createSortHandler = useCallback((property: string) => (event: MouseEvent) => {
    onRequestSort(event, property);
  }, [onRequestSort]);

  return (
    <TableHead>
      <TableRow>
        {headerData.map((headCell) => (
          <TableCell
            key={`table-header-${headCell.label}`}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && headCell.sort ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
