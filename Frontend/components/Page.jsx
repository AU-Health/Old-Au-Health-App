import React from 'react';
import { View, Text } from 'react-native';
//icons
import { Feather as Icon } from '@expo/vector-icons';

const Page = ({ backgroundColor, icon, title, desc }) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor
            }}
        >
            <Icon name={icon} size={16} color='white' />
            <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                    {title}
                </Text>
            </View>
            <View style={{ marginTop: 12 }}>
                <Text style={{ fontSize: 18, fontWeight: 'regular', color: 'white' }}>
                    {desc}
                </Text>
            </View>
        </View>

    );
};

export default Page;
