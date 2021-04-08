import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//icons
import { Feather as Icon } from '@expo/vector-icons';

const Page = ({ backgroundColor, icon, title, desc }) => {
    return (
        <View style={styles.pageContainer}>
            <Icon name={icon} size={16} color='white' />
            <View style={{ marginTop: 8 }}>
                <Text style={styles.textTitle}>
                    {title}
                </Text>
            </View>
            <View style={{ marginTop: 12 }}>
                <Text style={styles.textBody}>
                    {desc}
                </Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor
    },
    textTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    textBody: {
        fontSize: 18,
        fontWeight: 'regular',
        color: 'white',
    },
});

export default Page;
