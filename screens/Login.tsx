import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { getLogin } from "../Api";
import Template from "../components/LayoutLogin";

const LoginScreen = () => {

    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const authenticateUser = async (username, password) => {
        try {
            const usuario = await getLogin(username);
            if (usuario) {
                if (password == usuario.Password) {
                    navigation.navigate('Home');
                }
                else {
                    setError('Contraseña Incorrecta');
                }
            } else {
                setError('Usuario no encontrado');
            }
        }
        catch (error) {
            console.log(error);
            setError('Error en la autenticación');
        }
    };

    const handleLogin = () => {
        setError('');
        if (!username && !password) {
            Alert.alert('Error al intentar iniciar sesión', 'Por favor, ingresa tu usuario y contraseña', [
                {
                    text: 'OK',
                },
            ]);
            return;
        }
        authenticateUser(username, password);
    };

    return (
        <Template>
            <Image
                source={require('../assets/img/udgb.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Iniciar sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#546574"
                value={username}
                onChangeText={(text) => setUsername(text.toUpperCase())} // Convierte el texto a mayúsculas
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#546574"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.text}>INGRESAR</Text>
            </TouchableOpacity>
        </Template>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 181,
        height: 256,
        resizeMode: 'contain',  // Ajusta la imagen para que se ajuste al contenedor
        marginBottom: 10,
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: '90%',
        borderColor: '#4CAF50',
        borderWidth: 2,
        marginBottom: 12,
        color: "#ffffff",
        padding: 8,
        borderRadius: 5,
        fontSize: 15,
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginVertical: 3,
        backgroundColor: "#003366",
        width: '90%',
    },
    text: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 16,
    },
    errorContainer: {
        width: '90%',
        backgroundColor: '#e73f40',
        padding: 10,
        marginBottom: 12,
        borderRadius: 5,
    },
    errorText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
    },
});

export default LoginScreen;