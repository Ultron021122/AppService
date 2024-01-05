import React from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const VisitItem = ({ visitors, handleDelete }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.itemContainer} elevation={5} >
            <View style={styles.itemCard}>
                <TouchableOpacity onPress={() => navigation.navigate('VisitFormScreen', { ID: visitors.ID })}>
                    <Text style={styles.itemTitle}>{visitors.Nombre} {visitors.Apellidos}</Text>
                    <Text style={styles.itemText}>{visitors.Destino}</Text>
                    <Text style={styles.itemText}>{moment(visitors.FechaCita).format('YYYY-MM-DD')}</Text>
                    <Text style={styles.itemText}>{visitors.HoraCita}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: '#E73F40', padding: 7, borderRadius: 5 }}
                    onPress={() => handleDelete(visitors.ID)}
                >
                    <Text style={styles.itemSubTitle}>Eliminar</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={styles.itemTitle}>Modelo</Text>
                    <Text style={styles.itemTextCard}>{visitors.Modelo}</Text>
                </View>
                <View>
                    <Text style={styles.itemTitle}>Placas</Text>
                    <Text style={styles.itemTextCard}>{visitors.Placas}</Text>
                </View>
                <View>
                    <Text style={styles.itemTitle}>Color</Text>
                    <Text style={styles.itemTextCard}>{visitors.Color}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#333333',
        fontSize: 15,
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
    },
    itemCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        color: '#ffffff',
    },
    itemTextCard: {
        color: '#ffffff',
        textAlign: 'center',
    },
    itemTitle: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemSubTitle: {
        color: '#ffffff',
        fontWeight: '500',
    },
});

export default VisitItem;