import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import {StyleSheet,View,TextInput,Text,FlatList, TouchableOpacity, Alert,} from 'react-native';

const App = () => {
  const [textInput, setTextInput] = React.useState('');
  const [tasks, settasks] = React.useState([]);

  const addTask = () => {
    if(textInput==''){
      Alert.alert('Error', 'Please write a task.');
      return;
    }
      const newTask = {
        id: Math.random(),
        task: textInput,
        isDone: false,
      };
      settasks([...tasks, newTask]);
      setTextInput('');
  };

  const deleteTask = taskId => {
    const newtasksItem = tasks.filter(item => item.id !== taskId);
    settasks(newtasksItem);
  };

  const deleteAllTasks = () => {
    if(tasks.length==0){
      Alert.alert('Info', 'There is no task in Todo list')
      return;
    }
    Alert.alert('Info', 'Delete all tasks?', [
      {
        text: 'No',
      },
      {
        text: 'Delete',
        onPress: () => settasks([]),
      },
    ]);
  };

  const DoneTask = taskId => {
    const newtasksItem = tasks.map(item => {
      if (item.id === taskId) {
        return { ...item, isDone: true };
      }
      return item;
    });
    settasks(newtasksItem);
  };

  const ListTasks = ({ task }) => {
    return (
      <View style={styles.taskList}>
        <View style={{ flex: 1 }}>
          <Text
            style={{fontWeight: 'bold', fontSize: 15, textDecorationLine: task?.isDone ? 'line-through' : 'none',}}>
            {task?.task}
          </Text>
        </View>
        {!task?.isDone && (
          <TouchableOpacity onPress={() => DoneTask(task.id)}>
            <View style={[styles.Iconstyle, { backgroundColor: 'green' }]}>
              <MaterialIcons name="done" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTask(task.id)}>
          <View style={styles.Iconstyle}>
            <MaterialIcons name="delete" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <View style={styles.header}>
          <Text style={styles.headertitle}>TODO App</Text>
          <MaterialIcons name="delete" backgroundColor='white' size={30} color="red" onPress={deleteAllTasks} />

        </View>
        <TextInput
          style={styles.input}
          value={textInput}
          placeholder="Write a task"
          onChangeText={text => setTextInput(text)}
        />

        <TouchableOpacity onPress={addTask}>
          <View style={styles.btn}>
            <Text style={{ color: 'white' }}>Add Task</Text>
          </View>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          renderItem={({ item }) => <ListTasks task={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#E8EAED",
  },

  btn: {
    marginTop: 10,
    marginLeft:200,
    backgroundColor: "black",
    flexDirection: "row",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  headertitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 160,
  },

  header:{
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  taskWrapper: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 50,
  },

  taskList: {
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
  },

  Iconstyle: {
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 20,
    height: 30,
    width: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
});
export default App;