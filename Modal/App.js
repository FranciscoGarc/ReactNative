import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [materiaFavorita, setMateriaFavorita] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [estudiantes, setEstudiantes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setFechaNacimiento(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const agregarEstudiante = () => {
    const nuevoEstudiante = {
      id: estudiantes.length ? estudiantes[estudiantes.length - 1].id + 1 : 1,
      nombre: nombre,
      carnet: carnet,
      materiaFavorita: materiaFavorita,
      fechaNacimiento: fechaNacimiento
    };
    setEstudiantes([...estudiantes, nuevoEstudiante]);
    setNombre('');
    setCarnet('');
    setMateriaFavorita('');
    setFechaNacimiento(new Date());
    setModalVisible(false);
  };

  const eliminarEstudiante = (id) => {
    setEstudiantes(estudiantes.filter((estudiante) => estudiante.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Estudiante" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Carnet"
              value={carnet}
              onChangeText={setCarnet}
            />
            <TextInput
              style={styles.input}
              placeholder="Materia Favorita"
              value={materiaFavorita}
              onChangeText={setMateriaFavorita}
            />
            <TouchableOpacity onPress={showDatepicker}><Text>Seleccionar Fecha de Nacimiento</Text></TouchableOpacity>
            <Text>Fecha seleccionada: {fechaNacimiento.toLocaleDateString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                locale='es-ES'
              />
            )}
            <Button title="Agregar Estudiante" onPress={agregarEstudiante} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={estudiantes}
        renderItem={({ item }) => (
          <View style={styles.estudianteItem}>
            <Text style={styles.estudianteNombre}>ID: {item.id}</Text>
            <Text style={styles.estudianteNombre}>Nombre: {item.nombre}</Text>
            <Text style={styles.estudianteCarnet}>Carnet: {item.carnet}</Text>
            <Text style={styles.estudianteMateria}>Materia Favorita: {item.materiaFavorita}</Text>
            <Text style={styles.estudianteFecha}>
              Fecha de Nacimiento: {item.fechaNacimiento.toDateString()}
            </Text>
            <Button
              title="Eliminar"
              onPress={() => eliminarEstudiante(item.id)}
              color="red"
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  estudianteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  estudianteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  estudianteCarnet: {
    fontSize: 16,
  },
  estudianteMateria: {
    fontSize: 16,
  },
  estudianteFecha: {
    fontSize: 16,
  },
});

export default App;
