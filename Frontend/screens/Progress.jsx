import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import legend from '../components/Legend';
import Legend from '../components/Legend';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

let data = {
  labels: ["Sleep", "Activity", "Hydration"],
  data: [0.4, 0.6, 0.8]
};

let chartConfig={
    backgroundGradientFrom: "#F2F2F2",
    backgroundGradientTo: "#F2F2F2",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 128, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(46, 49, 49, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
    }
};

export default class ProgressScreen extends React.Component {

  render() {
    return(
        <View style={styles.screenContainer}>
          <View style={styles.titleContainer}>
              <Text style={styles.titleText}> Your Progress </Text>
          </View>

          <View style={styles.body}>
                <View style={styles.legendTitle}>
                    <Text style={styles.legendTitleText}> Outer </Text> 
                    <Text style={styles.legendTitleText}> Inner </Text>
                </View>

                <View style={styles.legend}>
                    <Legend data={data}/>
              </View>
              <ProgressChart
                  data={data}
                  width={deviceWidth}
                  height={220}
                  strokeWidth={16}
                  radius={32}
                  chartConfig={chartConfig}
                  hideLegend={true}/>
          </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
    titleContainer: {
        width: deviceWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 5,
    },
    screenContainer: {
        backgroundColor: '#f3f1ef',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        //backgroundColor: '#f3f1ef',
        height: '80%',
        width: deviceWidth * 80 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    legend: {
        width: deviceWidth * 90 / 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    legendTitle: {
        marginBottom: 5,
        width: deviceWidth * 70 / 100,
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    legendTitleText: {
        fontSize: 16,
        fontWeight: '700',
    },
});
