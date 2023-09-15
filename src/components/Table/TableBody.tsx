import React from 'react';
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { EnhancedTableBodyProps } from './Table.types'

export const EnhancedTableBody: React.FC<EnhancedTableBodyProps> = ({
  columns,
  data
}) => {

  return (
    <TableBody>
      {data.map((row) => {

        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.S_no}
          >
            {columns.map((column, keyIndex) => (
              <TableCell {...column?.style} key={keyIndex}>
                {column?.cellRenderer
                  ? column?.cellRenderer(row)
                  : row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
