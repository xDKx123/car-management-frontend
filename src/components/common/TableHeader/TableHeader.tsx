import { Box } from '@mui/material';
import {
  HeaderContext
} from '@tanstack/react-table';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';


interface TableHeaderProps {
  header: HeaderContext<any, any>
  label: string
}

const TableHeader: FC<TableHeaderProps> = (props: TableHeaderProps) => {
  const { t } = useTranslation()
  return (
    <Box>
      {
        t(props.label)
      }
    </Box>
  )
}

export default TableHeader;

