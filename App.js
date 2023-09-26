import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Task from './components/Task';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState();

    useEffect(() => {
        (async () => {
            const value = await AsyncStorage.getItem('tasks');
            if (value) {
                setTasks(JSON.parse(value));
            }
        })();
    }, []);

    const addTask = async () => {
        const newTasks = [...tasks, taskInput];
        await AsyncStorage.setItem(
            'tasks',
            JSON.stringify([...tasks, taskInput])
        );
        setTasks(newTasks);
        setTaskInput(null);
        Keyboard.dismiss();
    };

    const completeTask = async (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
        setTasks(newTasks);
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>Today’s tasks</Text>
                    <FlatList
                        style={styles.tasks}
                        data={tasks}
                        renderItem={({ index, item }) => {
                            return (
                                <Task
                                    index={index}
                                    text={item}
                                    completeTask={completeTask}
                                />
                            );
                        }}
                    />
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                >
                    <View style={styles.bottom}>
                        <TextInput
                            style={styles.input}
                            placeholder="Input new task"
                            placeholderTextColor="#C0C0C0"
                            value={taskInput}
                            onChangeText={(text) => setTaskInput(text)}
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={addTask}
                        >
                            <Icon
                                name="plus"
                                size={32}
                                color="#C0C0C0"
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E8EAED',
        paddingTop: 64,
        paddingHorizontal: 20,

        justifyContent: 'space-between',
        gap: 12,
    },
    heading: {
        fontWeight: '800',
        fontSize: 24,
    },
    tasks: {
        gap: 15,
        height: '75%',
    },

    bottom: {
        position: 'absolute',
        bottom: 36,

        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: '75%',
        backgroundColor: '#fff',
        borderRadius: 60,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 52,
        backgroundColor: '#fff',

        justifyContent: 'center',
        alignItems: 'center',
    },
});
