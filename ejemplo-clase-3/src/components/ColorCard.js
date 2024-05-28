import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorCard = ({ colorName, hexCode }) => {
    return (
        <View style={[styles.card, { backgroundColor: hexCode }]}>
            <Text style={styles.text}>{colorName}</Text>
            <Text style={styles.hexCode}>{hexCode}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100, // To ensure the card has a minimum width
        maxWidth: 100, // To control the width of each card
        height: 100, // To control the height of each card
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
    hexCode: {
        color: '#fff',
    },
});

export default ColorCard;
