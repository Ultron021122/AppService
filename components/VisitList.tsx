import React, { useState, useEffect } from "react";
import VisitItem from "./VisitItem";
import { getVisitors, deleteVisitor } from '../Api';
import { FlatList, RefreshControl, Alert, TextInput, StyleSheet, Text } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

const VisitList = ({ navigation }) => {

    const [visitors, setVisitors] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [searchText, setSearchText] = useState("");
    const isFocused = useIsFocused();

    const loadVisitors = async () => {
        const data = await getVisitors()
        setVisitors(data)
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadVisitors();
        setRefreshing(false);
    }, []);

    const handleDelete = async (ID) => {
        Alert.alert("Eliminar visitante", "¿Estas seguro de eliminar el registro?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Ok",
                onPress: async () => {
                    await deleteVisitor(ID);
                    await loadVisitors();
                },
            },
        ]);
    };

    useEffect(() => {
        loadVisitors();
    }, [isFocused]);

    const filteredVisitors = visitors.filter((visitor) =>
        visitor.Nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderItem = ({ item }) => {
        return <VisitItem visitors={item} handleDelete={handleDelete} />;
    };

    return (
        <>
            <Text style={styles.text}>Busqueda de visitantes</Text>
            <TextInput
                style={styles.search}
                placeholder="Ingresa el nombre..."
                placeholderTextColor="#546574"
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
            />
            <FlatList
                data={filteredVisitors}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={renderItem}
                style={{
                    width: '100%'
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors={["#78e08f"]}
                        onRefresh={onRefresh}
                        progressBackgroundColor="#0a3d62"
                    />
                }
            />
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        marginLeft: 5,
        marginBottom: 2,
        fontSize: 16,
    },
    search: {
        height: 40,
        borderColor: "#4CAF50",
        fontSize: 15,
        color: '#ffffff',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        padding: 8,
    },
});

export default VisitList