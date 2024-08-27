import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import './Page404.css';
import { useTranslation } from 'react-i18next';

interface Page404Props { }

const Page404: FC<Page404Props> = () => {
  const { t } = useTranslation();
  return (
    <Box className="fkex justify-center items-center h-screen w-screen flex-col"
    >
      <Typography variant={'h1'}>
        {
          t('pageNotFound')
        }
      </Typography>
    </Box>
  );
}

export default Page404;
