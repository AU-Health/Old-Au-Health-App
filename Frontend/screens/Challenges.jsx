import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Task from '../components/Tasks';
import * as Progress from 'react-native-progress';

import truths from './data/truths.json';
import dares from './data/dares.json';
import questions from './data/questions.json';


var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

let incompleteTasks = [
    
];

let completedTasks = [
    
];

function TaskObj (title, info, color, completed) {
    this.title = title;
    this.info = info;
    this.color = color;
    this.completion = completed;
}

//function that takes in data in the form of a json and splits into correct array
function _loadDataFromJson(data) {
    //console.log(data)
    //console.log(data[1].Truth);
    for(let i = 0; i < Object.keys(data).length; i++) {
        if(data[i].ActivityCompletedTypeName == 'Completed') {
            completedTasks.push(new TaskObj(data[i].CategoryName, data[i].Description, _selectTaskColor(data[i].CategoryName)));
        } else {
            //console.log(_selectTaskColor(data[i].CategoryName));
            //console.log(new TaskObj(data[i].CategoryName, data[i].Description, _selectTaskColor(data[i].CategoryName)));
            incompleteTasks.push(new TaskObj(data[i].CategoryName, data[i].Description, _selectTaskColor(data[i].CategoryName)));
        }
    }
}

function _selectTaskColor(category) {
    //console.log(category);

    if(category == 'Social Health') {
        return '#E6B0AA';

    } else if(category == 'Emotional Health') {
        return '#C39BD3';

    } else if(category == 'Sleep') {
        return '#6C3483';

    } else if(category == 'Physical Activity') {
        return '#A93226';

    } else if(category == 'Hydration') {
        return '#3498DB';

    } else if(category == 'Fruits & Veggies') {
        return '#52BE80';

    } else if(category == 'Occupational Health') {
        return '#F1C40F';

    } else {
        return '#000080';
    }
}

fetchTruths();
function fetchTruths(){
    let url = 'http://192.168.1.10:3000/dares-truths-questions/truthsHistory' //make sure to add uuid
    fetch(url, {
        withCredentials: true,
        credentials: 'include',
        headers: {
            //swtich the access token to the actual state of the token
            'Authorization': 'Bearer '+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNmI3OWZjYTgtOWY5OS0xMWViLWI1ODMtMjA0NzQ3ZDMyZjk3IiwiaXNBZG1pbiI6dHJ1ZSwiaXNWZXJpZmllZCI6MCwiY29uc2VudFNpZ25lZCI6MCwiaWF0IjoxNjE4OTQ5NTUwLCJleHAiOjE2MTg5NjAzNTB9.rpAxHT9pc8r1adBf4H-ygNE9mlE1-yWtStRroWn84-E"
        },
    }).then(responseJson => {
        responseJson.json().then(data=>{
            if(data.status=="ok"){
                _loadDataFromJson(data.truthsHistory);
            }
            else{
                //worry about issue
            }
        })
    })
    .catch(error => {
        console.log("ERROR!!"+error);
    })

}


// _loadDataFromJson(dares);
// _loadDataFromJson(questions);

/*
color options for differebt kinds of tasks
//borderColor: '#A93226', //red color dare
//borderColor: '#27AE60', //green color question
//borderColor: '#F1C40F', //yellow color truth
*/


export default class ChallengeScreen extends React.Component {

    //getColor = (task) => console.log(task['item']['color']);

    renderListComponent = (task) => <Task title={task['item']['title']} info={task['item']['info']} color={task['item']['color']}/>
    
    render() {
        let numberOfCompletedTasks = completedTasks.length;
        let numberOfTasks = completedTasks.length + incompleteTasks.length;
        let progress = (numberOfCompletedTasks / numberOfTasks);

        console.log(numberOfCompletedTasks);

        //function that updates the task lists when one is marked completed
        //have not tested this yet
        //may not work in the way it needs to.
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
                <Text style={styles.textTitle}> Challenges </Text>
                <View style={styles.Container}>
                    <Text style={{ position: 'absolute', left: 0 }}> {numberOfCompletedTasks}/{numberOfTasks} </Text>
                    <Text style={{ position: 'absolute', right: 0 }}> {Math.ceil(progress * 100)}% </Text>
                </View>
                <Progress.Bar progress={progress} width={deviceWidth * 80 / 100} />

            </View>
            <View style={styles.tasksContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.tasksTitle}> Goals </Text>
                </View>

                <FlatList 
                    data={incompleteTasks}
                    renderItem={item => this.renderListComponent(item)}
                    //keyExtractor={item => item['title']} //supposed to specify a key but doesnt work lol
                />

            </View>
            <View style={styles.tasksContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.tasksTitle}> Completed </Text>
                </View>

                <FlatList 
                    data={completedTasks}
                    renderItem={item => this.renderListComponent(item)}
                />

            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    textTitle: {
        fontWeight: 'bold', 
        fontSize: 24, 
        paddingBottom: 5 
    },
    progressBarContainer: {
        height: '20%',
        //flex: 1,
        //backgroundColor: 'blue',
        width: deviceWidth,
        justifyContent: 'center',
        alignItems: 'center',
        //height: deviceHeight * 10 / 100,
    },
    Container: {
        width: deviceWidth * 80 / 100, 
        paddingBottom: 20,
    },
    tasksContainer: {
        //flex: 1,
        marginTop: 10,
        height: '40%',
        //flex: 2,
        //backgroundColor: '#ffffff',
        width: deviceWidth * 90 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        //paddingBottom: 20,
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

/*

//define url at some point





*/