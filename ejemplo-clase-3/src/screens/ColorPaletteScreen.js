import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ColorCard from '../components/ColorCard';

const colorGroups = [
    {
        title: "Colores Acuosos",
        colors: [
            { name: "TURQUOISE", hex: "#1abc9c" },
            { name: "EMERALD", hex: "#2ecc71" },
            { name: "PETER RIVER", hex: "#3498db" },
            { name: "AMETHYST", hex: "#9b59b6" },
            { name: "WET ASPHALT", hex: "#34495e" },
            { name: "GREEN SEA", hex: "#16a085" }
        ]
    },
    {
        title: "Natural Colors",
        colors: [
            { name: "NEPHRITIS", hex: "#27ae60" },
            { name: "BELIZE HOLE", hex: "#2980b9" },
            { name: "WISTERIA", hex: "#8e44ad" },
            { name: "MIDNIGHT BLUE", hex: "#2c3e50" },
            { name: "SUN FLOWER", hex: "#f1c40f" },
            { name: "CARROT", hex: "#e67e22" }
        ]
    },
    {
        title: "Other Colors",
        colors: [
            { name: "ALIZARIN", hex: "#e74c3c" },
            { name: "CLOUDS", hex: "#ecf0f1" },
            { name: "CONCRETE", hex: "#95a5a6" },
            { name: "ORANGE", hex: "#f39c12" },
            { name: "PUMPKIN", hex: "#d35400" },
            { name: "POMEGRANATE", hex: "#c0392b" },
            { name: "SILVER", hex: "#bdc3c7" },
            { name: "ASBESTOS", hex: "#7f8c8d" }
        ]
    }
];

const ColorPaletteScreen = () => {
    const renderColorCard = ({ item }) => (
        <ColorCard colorName={item.name} hexCode={item.hex} />
    );

    return (
        <FlatList
            data={colorGroups}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.group}>
                    <Text style={styles.title}>{item.title}</Text>
                    <FlatList
                        data={item.colors}
                        keyExtractor={(color, index) => index.toString()}
                        renderItem={renderColorCard}
                        numColumns={3}
                        columnWrapperStyle={styles.row}
                    />
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    group: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default ColorPaletteScreen;
