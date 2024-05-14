import React, { FC } from 'react';
import './Page404.css';

interface Page404Props {}

const Page404: FC<Page404Props> = () => {
  return (
    <div className="Page404" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      flexDirection: 'column',
    }}>
      <h1>Page Not Found</h1>
    </div>
  );
}

export default Page404;
