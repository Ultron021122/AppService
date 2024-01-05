import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

const Template = ({children}) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#222f3e" />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222f3e',
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Template;