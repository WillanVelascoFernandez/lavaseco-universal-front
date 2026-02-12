import React from 'react';
import { LoginView } from './LoginView';
import { useLoginController } from './LoginController';

const Login: React.FC = () => {
    const controller = useLoginController();
    return <LoginView {...controller} />;
};

export default Login;
