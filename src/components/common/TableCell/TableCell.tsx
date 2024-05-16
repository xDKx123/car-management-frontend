import React, { FC } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Box } from '@mui/material';

interface TableCellProps {
  cell: CellContext<any, any>
}

const TableCell: FC<TableCellProps> = (props: TableCellProps) => {
  return (
    <Box>
      {
        props.cell.getValue()
      }
    </Box>
  )
}

export default TableCell;
