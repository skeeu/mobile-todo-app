import { View, Text, TouchableOpacity } from 'react-native';
const Task = (props) => {
    return (
        <TouchableOpacity onPress={() => props.completeTask(props.index)}>
            <View style={styles.container}>
                <View style={styles.task_left}>
                    <View style={styles.square}></View>
                    <View style={styles.text}>
                        <Text>{props.text}</Text>
                    </View>
                </View>
                <View style={styles.task_right}></View>
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,

        paddingHorizontal: 15,
        paddingVertical: 20,
        marginVertical: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    task_left: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '75%',
    },
    square: {
        width: 24,
        height: 24,
        borderRadius: 5,
        backgroundColor: '#55BCF666',
        opacity: 0.4,
        marginRight: 15,
    },
    text: {
        fontSize: 14,
    },
    task_right: {
        content: '',
        width: 12,
        height: 12,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#55BCF6',
    },
};

export default Task;
