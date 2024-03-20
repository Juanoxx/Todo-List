import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if(task.trim().length > 0) {
      setTaskList(currentTasks => [...currentTasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    Alert.alert(
      "Eliminar Tarea",
      "¿Estás seguro de querer eliminar esta tarea?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "Eliminar", onPress: () => setTaskList(currentTasks => currentTasks.filter((_, i) => i !== index)) }
      ]
    );
  };

  const resetList = () => {
    Alert.alert(
      "Resetear Lista",
      "¿Estás seguro de querer resetear la lista completa?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "Resetear", onPress: () => setTaskList([]) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo-List By Juanoxx</Text>
      <View style={styles.topRow}>
        <TextInput
          placeholder='Agrega elementos a la lista'
          style={styles.textInput}
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetList}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.taskList}>
        {taskList.map((item, index) => (
          <View key={index} style={styles.taskItemContainer}>
            <Text style={styles.taskItem}>{item}</Text>
            <TouchableOpacity onPress={() => deleteTask(index)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 15,
    padding: 10,
    backgroundColor: '#c7c1c170',
    borderRadius: 20,
    width: "60%", 
  },
  button: {
    backgroundColor: '#012b55',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
  },
  taskList: {
    width: '100%',
  },
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
  },
  taskItem: {
    maxWidth: '90%', // Permite que el texto no se sobreponga al botón de eliminar
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
  deleteButtonText: {
    color: '#ff0000',
    fontWeight: 'bold',
  }
});
