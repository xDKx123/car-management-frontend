import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../providers/UserProvider';
import './LogOut.css';

interface LogOutProps {}

const LogOut: FC<LogOutProps> = () => {
  const userContext = useUser();
  const navigate = useNavigate();


  const handleClick = () => {
    userContext.dispatch({ type: 'REMOVE_USER' });
    navigate('/login');
  }

  return (
    <Button
      onClick={handleClick}
    >
      Log Out
    </Button>
  )
}

export default LogOut;
