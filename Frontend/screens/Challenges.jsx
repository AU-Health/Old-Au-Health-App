import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Task from '../components/Tasks';
import * as Progress from 'react-native-progress';


var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const progress = 0.3;
const numberOfCompletedTasks = 2;
const NumberOftasks = 5;

let incompleteTasks = [
    {
        name: 'task2',
        desc: 'drink 8 gallons a day',
        type: 'dare',
        completed: false,
    },
    {
        name: 'task3',
        desc: 'drink 8 gallons a day',
        type: 'truth',
        completed: false,
    },
    {
        name: 'task4',
        desc: 'drink 8 gallons a day',
        type: 'question',
        completed: false,
    },
    
];

let completedTasks = [
    {
        name: 'task5',
        desc: 'drink 8 gallons a day',
        type: 'dare',
        completed: true,
    },
    {
        name: 'task1',
        desc: 'drink 8 gallons a day',
        type: 'truth',
        completed: true,
    },
];

let test = [
    {
        title: 'title of the truth or dare',
        desc: 'desc of the task',
        type: 'truth or dare or question',
        completed: true, 
    }
];

let task, length;
/*
color options for differebt kinds of tasks
//borderColor: '#A93226', //red color dare
//borderColor: '#27AE60', //green color question
//borderColor: '#F1C40F', //yellow color truth
*/


export default class ChallengeScreen extends React.Component {
  render() {

    //function that updates the task lists when one is marked completed
    const _updateTaskList = (taskName) => {
        let tmp;
        for(let i = 0; i < incompleteTasks.length; i++){
            if(incompleteTasks['name'] == taskName) {
                tmp = i;
                incompleteTasks['completed'] = true;
            }
        }
        completedTasks.push(incompleteTasks.splice(tmp))
    };


    return(
      <View style={styles.screenContainer}>
        <View style={styles.progressBarContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, paddingBottom: 5 }}> Challenges </Text>
            <View style={{ width: deviceWidth * 80 / 100, paddingBottom: 20, }}>
                <Text style={{ position: 'absolute', left: 0 }}> {numberOfCompletedTasks}/{NumberOftasks} </Text>
                <Text style={{ position: 'absolute', right: 0 }}> {progress * 100}% </Text>
            </View>
            <Progress.Bar progress={progress} width={deviceWidth * 80 / 100} />

        </View>
        <View style={styles.tasksContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.tasksTitle}> Goals </Text>
            </View>

            {incompleteTasks.map((task) => {
                    return (
                        <Task title={task['name']} info={task['desc']}/>
                    )
                })
            }

        </View>
        <View style={styles.tasksContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.tasksTitle}> Completed </Text>
            </View>

            {completedTasks.map((task) => {
                    return (
                        <Task title={task.name} info={task.desc}/>
                    )
                })
            }

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    progressBarContainer: {
        height: '20%',
        //flex: 1,
        //backgroundColor: 'blue',
        width: deviceWidth,
        justifyContent: 'center',
        alignItems: 'center',
        //height: deviceHeight * 10 / 100,
    },
    tasksContainer: {
        height: '40%',
        //flex: 2,
        //backgroundColor: '#ffffff',
        width: deviceWidth * 90 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        //margin: 'auto',
        //height: deviceHeight * 50 / 100,
    },
    tasksTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        left: 0,
    },
    titleContainer: {
        width: deviceWidth * 90 / 100,
    },
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
