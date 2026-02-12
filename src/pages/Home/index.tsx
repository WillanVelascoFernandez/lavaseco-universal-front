import React from 'react';
import { HomeView } from './HomeView';
import { useHomeController } from './HomeController';

const Home: React.FC = () => {
    const controller = useHomeController();
    return <HomeView {...controller} />;
};

export default Home;
