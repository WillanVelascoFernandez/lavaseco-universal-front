import { useState } from 'react';
import { useAuth } from '@/models/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useLoginController = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const success = await login(email, password);
            if (success) {
                navigate('/');
            } else {
                setError('Credenciales inválidas');
            }
        } catch (err) {
            setError('Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        handleSubmit
    };
};
