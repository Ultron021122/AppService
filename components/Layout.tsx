import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';

const Layout = ({ children }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#222f3e" />
            <View style={styles.content}>{children}</View>
        </View>
    );
};

const styles =StyleSheet.create({
    container: {
        backgroundColor: '#222f3e',
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default Layout;