import { Container, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import './Settings.css';

interface SettingsProps { }

const Settings: FC<SettingsProps> = () => {
  const { t } = useTranslation();
  
  return (
    <Container>
      <Typography variant={'h3'}>
        {
          t('settings')
        }
      </Typography>
      <LanguageSelector />
    </Container>
  );
}
export default Settings;
