import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';

const Logout = () => {
  const { disconnect } = useStateContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await disconnect();
      navigate('/');
    } catch (err) {
      console.log('Unable to log out', err.message);
      navigate(-1);
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return null;
};

export default Logout;
