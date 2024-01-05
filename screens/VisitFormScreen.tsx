import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Alert, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { saveVisitors, getVisitor, updateVisitor } from '../Api';
import DatePicker from '../components/DatePicker';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';

const VisitFormScreen = ({ navigation, route }) => {
  const [editing, setEditing] = useState(false);
  const puertasEntradaOptions = ["Olimpica", "Revolución", "Boulevard"];
  const colores = ["Blanco", "Negro", "Gris", "Plateado", "Azul", "Rojo", "Verde", "Amarillo", "Naranja", "Marrón", "Beige", "Oro", "Morado"];

  const [errors, setErrors] = useState({
    Nombre: '',
    Apellidos: '',
    Modelo: '',
    Placas: '',
    Color: '',
    PuertaEntrada: '',
    Destino: '',
    FechaCita: '',
    HoraCita: '',
  });

  useEffect(() => {
    if (route.params && route.params.ID) {
      setEditing(true);
      navigation.setOptions({ headerTitle: 'Actualizar visitante' });
      (async () => {
        const visitors = await getVisitor(route.params.ID);
        const format = moment(visitors.FechaCita).format('YYYY-MM-DD');
        setVisitors({
          Nombre: visitors.Nombre,
          Apellidos: visitors.Apellidos,
          Modelo: visitors.Modelo,
          Placas: visitors.Placas,
          Color: visitors.Color,
          PuertaEntrada: visitors.PuertaEntrada,
          Destino: visitors.Destino,
          FechaCita: format,
          HoraCita: visitors.HoraCita,
        });
      })();
    }
  }, []);

  const [visitors, setVisitors] = useState({
    Nombre: '',
    Apellidos: '',
    Modelo: '',
    Placas: '',
    Color: '',
    PuertaEntrada: '',
    Destino: '',
    FechaCita: '',
    HoraCita: '',
  });

  const handleValidate = async () => {
    const fieldsToValidate = [
      { key: 'Nombre', label: 'Nombre', minLength: 2, maxLength: 30, allowedCharacters: /^[A-Za-záéíóúÁÉÍÓÚüÜ\s]+$/ },
      { key: 'Apellidos', label: 'Apellidos', minLength: 2, maxLength: 50, allowedCharacters: /^[A-Za-záéíóúÁÉÍÓÚüÜ\s]+$/ },
      { key: 'Modelo', label: 'Modelo', minLength: 2, maxLength: 50, allowedCharacters: /^[A-Za-z0-9\s]+$/ },
      { key: 'Placas', label: 'Placas', minLength: 1, maxLength: 10, allowedCharacters: /^[A-Za-z0-9]+$/ },
      { key: 'Color', label: 'Color', minLength: 2, maxLength: 20, allowedCharacters: /^[A-Za-záéíóúÁÉÍÓÚüÜ\s]+$/ },
      { key: 'PuertaEntrada', label: 'Puerta de entrada', minLength: 1, maxLength: 2, allowedCharacters: /^[0-9:]+$/ },
      { key: 'Destino', label: 'Destino', minLength: 2, maxLength: 50, allowedCharacters: /^[A-Za-z\s]+$/ },
      { key: 'FechaCita', label: 'Fecha Cita', minLength: 10, maxLength: 10, allowedCharacters: /^\d{4}-\d{2}-\d{2}$/ },
      { key: 'HoraCita', label: 'Hora Cita', minLength: 8, maxLength: 8, allowedCharacters: /^(0[0-9]|1[0-9]|2[0-3]):[0-5]\d:[0-5]\d$/ },
    ];

    const newErrors = {};

    fieldsToValidate.forEach(({ key, label, minLength, maxLength, allowedCharacters }) => {
      const value = visitors[key];

      if (!value) {
        newErrors[key] = `El campo ${label} es obligatorio.`;
      } else if (value.length < minLength || value.length > maxLength) {
        newErrors[key] = `El campo ${label} debe tener entre ${minLength} y ${maxLength} caracteres.`;
      } else if (allowedCharacters && !allowedCharacters.test(value)) {
        newErrors[key] = `El campo ${label} solo puede contener caracteres permitidos.`;
      } else {
        newErrors[key] = '';
      }
    });
    // Actualizar el estado de los errores
    setErrors(newErrors);
    // Verificar si hay algún error
    if (Object.values(newErrors).some((error) => error !== '')) {
      Alert.alert('Error', 'Corrija los errores antes de enviar el registro.', [
        {
          text: 'OK',
        },
      ]);
    } else {
      handleSubmit();
      if (!editing) {
        Alert.alert('Éxito', 'Visitante guardado.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      } else {
        Alert.alert('Éxito', 'Visitante actualizado', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      }
    }
  }

  const handleSubmit = async () => {
    try {
      if (!editing) {
        await saveVisitors(visitors);
      } else {
        await updateVisitor(route.params.ID, { ...visitors });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCharge = (name, value) =>
    setVisitors({ ...visitors, [name]: value });

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.label}>Nombre(s)</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          placeholderTextColor="#546574"
          onChangeText={text => handleCharge('Nombre', text)}
          value={visitors.Nombre}
        />
        {errors.Nombre !== '' && <Text style={styles.error}>{errors.Nombre}</Text>}

        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tus apellidos"
          placeholderTextColor="#546574"
          onChangeText={text => handleCharge('Apellidos', text)}
          value={visitors.Apellidos}
        />
        {errors.Apellidos !== '' && <Text style={styles.error}>{errors.Apellidos}</Text>}

        <Text style={styles.label}>Modelo</Text>
        <TextInput
          style={styles.input}
          placeholder='Escribe el modelo del automóvil'
          placeholderTextColor="#546574"
          onChangeText={text => handleCharge('Modelo', text)}
          value={visitors.Modelo}
        />
        {errors.Modelo !== '' && <Text style={styles.error}>{errors.Modelo}</Text>}

        <Text style={styles.label}>Hora de entrada</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe la hora"
          placeholderTextColor="#546574"
          onChangeText={text => handleCharge('HoraCita', text)}
          value={visitors.HoraCita}
        />
        {errors.HoraCita !== '' && <Text style={styles.error}>{errors.HoraCita}</Text>}

        <Text style={styles.label}>Fecha de entrada</Text>
        <DatePicker
          onDateChange={selectedDate =>
            handleCharge('FechaCita', moment(selectedDate).format('YYYY-MM-DD'))
          }
          initialDate={editing ? new Date(visitors.FechaCita) : null}
        />
        <TextInput
          style={styles.input}
          placeholder="..."
          placeholderTextColor="#546574"
          value={visitors.FechaCita}
          editable={false}
        />
        {errors.FechaCita !== '' && <Text style={styles.error}>{errors.FechaCita}</Text>}

        <Text style={styles.label}>Destino</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu destino"
          placeholderTextColor="#546574"
          onChangeText={text => handleCharge('Destino', text)}
          value={visitors.Destino}
        />
        {errors.Destino !== '' && <Text style={styles.error}>{errors.Destino}</Text>}

        <Text style={styles.label}>Puerta de entrada</Text>
        <SelectDropdown
          data={puertasEntradaOptions}
          onSelect={(selectedItem, index) => {
            handleCharge('PuertaEntrada', index + 1);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          buttonStyle={styles.buttonSelect}
          buttonTextStyle={styles.buttonTextSelect}
          dropdownStyle={styles.dropStyle}
          rowStyle={styles.rowStyle}
          rowTextStyle={styles.rowTextStyle}
          selectedRowStyle={styles.selectedRow}
          selectedRowTextStyle={styles.selectedRowText}
          defaultButtonText="Selecciona una opción"
          defaultValue={puertasEntradaOptions[visitors.PuertaEntrada]}
        />
        {errors.PuertaEntrada !== '' && <Text style={styles.error}>{errors.PuertaEntrada}</Text>}

        <Text style={styles.label}>Placas</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tus placas"
          placeholderTextColor="#546574"
          onChangeText={text => handleCharge('Placas', text)}
          value={visitors.Placas}
        />
        {errors.Placas !== '' && <Text style={styles.error}>{errors.Placas}</Text>}

        <Text style={styles.label}>Color del automóvil</Text>
        <SelectDropdown
          data={colores}
          onSelect={(selectedItem, index) => {
            handleCharge('Color', selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.buttonSelect}
          buttonTextStyle={styles.buttonTextSelect}
          dropdownStyle={styles.dropStyle}
          rowStyle={styles.rowStyle}
          rowTextStyle={styles.rowTextStyle}
          selectedRowStyle={styles.selectedRow}
          selectedRowTextStyle={styles.selectedRowText}
          defaultButtonText="Selecciona una opción"
          defaultValue={visitors.Color}
        />
        {errors.Color !== '' && <Text style={styles.error}>{errors.Color}</Text>}

        {!editing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleValidate}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonUpdate} onPress={handleValidate}>
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  error: {
    color: '#E73F40',
    paddingBottom: 2,
  },
  label: {
    color: '#ffffff',
    fontSize: 15,
    paddingBottom: 2,
    marginLeft: 5,
    width: '90%',
  },
  buttonSelect: {
    backgroundColor: '#4CAF50',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    height: 40,
    width: '90%',
  },
  buttonTextSelect: {
    color: '#ffffff',
    fontSize: 15,
  },
  dropStyle: {
    backgroundColor: '#4CAF50',
  },
  rowStyle: {
    backgroundColor: '#4CAF50',
    height: 40,
  },
  rowTextStyle: {
    fontSize: 15,
    color: '#ffffff',
  },
  selectedRow: {
    backgroundColor: '#39A53D',
  },
  selectedRowText: {
    color: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '90%',
    fontSize: 16,
    marginBottom: 7,
    borderWidth: 2,
    borderColor: '#4CAF50',
    height: 40,
    color: '#ffffff',
    padding: 8,
    textAlign: 'center',
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginVertical: 7,
    backgroundColor: '#003366',
    width: '90%',
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginVertical: 7,
    backgroundColor: '#e58e26',
    width: '90%',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default VisitFormScreen;
