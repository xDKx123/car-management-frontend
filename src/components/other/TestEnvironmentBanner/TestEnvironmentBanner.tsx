import React, { FC, useEffect } from 'react';
import './TestEnvironmentBanner.css';
import { Box } from '@mui/material';
import { UtilityRepository } from '../../../repositories/utility';

interface TestEnvironmentBannerProps { }

const TestEnvironmentBanner: FC<TestEnvironmentBannerProps> = () => {
  const [displayBody, setDisplayBody] = React.useState<boolean>(false);

  useEffect(() => {
    UtilityRepository.getEnvironment().then((environment) => {
      if (environment === 'development') {
        console.log('This is a test environment');
        setDisplayBody(true);
      }
    });
  }, []);

  if (!displayBody) {
    return null;
  }

  return (
    <Box style={{
      //Display at the top left corner of the page
      //Titlted at 45 degrees
      //Red background color
      //White text color
      position: 'fixed',
      top: 10,
      left: -60,
      transform: 'rotate(-45deg)',
      backgroundColor: 'red',
      color: 'white',
      padding: '2px 60px',

      zIndex: 10000,

    }}>
      TEST
    </Box >
  );
}

export default TestEnvironmentBanner;
