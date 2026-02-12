import React from 'react';
import { UsuariosView } from './UsuariosView';
import { useUsuariosController } from './UsuariosController';

const Usuarios: React.FC = () => {
    const controller = useUsuariosController();
    return <UsuariosView {...controller} />;
};

export default Usuarios;
