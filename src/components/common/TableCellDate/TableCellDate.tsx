import React, { FC } from 'react';
import { CellContext } from '@tanstack/react-table';
import i18n from '../../../i18n/i18n';
import { Box } from '@mui/material';

interface TableCellDateProps {
  cell: CellContext<any, Date>
}

const TableCellDate: FC<TableCellDateProps> = (props: TableCellDateProps) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return (
    <Box>
      {
        (props.cell.getValue() as Date).toLocaleString(i18n.language, options as any)
      }
    </Box>
  )
}

export default TableCellDate;
