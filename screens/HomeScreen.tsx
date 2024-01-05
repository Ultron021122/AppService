import React from 'react';
import Layout from '../components/Layout';
import VisitList from '../components/VisitList';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => null, // Esto quitará la flecha de retorno
        });
    }, [navigation]);
    
    return (
        <Layout>
            <VisitList />
        </Layout>
    )
};

export default HomeScreen;