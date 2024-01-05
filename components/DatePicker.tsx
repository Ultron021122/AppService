import React, { useState } from 'react';
import 'moment/locale/es';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';

const DatePicker = ({ onDateChange, initialDate }) => {
    const [date, setDate] = useState(initialDate || new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const showDateTimePicker = () => {
        setShowDatePicker(true);
        setDate(initialDate || new Date());
    };

    const onChange = (event, selectedDate) => {
        setDate(date, new Date());
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        onDateChange(currentDate);
    };

    return (
        <>
            <TouchableOpacity style={styles.buttonDate} onPress={showDateTimePicker}>
                <Text style={styles.buttonText}>Selecciona la fecha:</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    style={{backgroundColor: "#10ac84"}}
                    testID='dateTimePicker'
                    value={date}
                    mode='date'
                    textColor='#ffffff'
                    display={"calendar" || "spinner"}
                    minimumDate={new Date()}
                    onChange={onChange}
                    locale="es"
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    buttonDate: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 5,
        backgroundColor: "#4CAF50",
        // 10ac84
        width: '90%',
    },
    buttonText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 15,
    },
});

export default DatePicker;