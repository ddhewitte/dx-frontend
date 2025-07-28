import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AuthLogout() {

  const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        navigate('/');
    }, [navigate]);

    return null;
};
