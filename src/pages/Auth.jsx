import AuthForm from "../components/AuthForm"
import { authLogin, getUserProfile} from "../services/AuthService";
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const navigate = useNavigate();

    const loginProcess = async (data) => {
        try {
            const res = await authLogin(data); 
            const token = res.accessToken;

            const resProfile = await getUserProfile(token);

            //Store it to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', resProfile.role);
            localStorage.setItem('userId', resProfile.id);
            localStorage.setItem('user', resProfile.user);

            console.log('resProfile.role', resProfile.role);

            //redirect after login
            if (resProfile.role === 'ADMIN') {
                console.log('admin');
                navigate('/dashboard-admin');
            } else {
                navigate('/dashboard-user');
            }
        } catch (err) {
            alert('Login error: ' + err.message);
        }
    };

    return <AuthForm onLogin={loginProcess} />;
}