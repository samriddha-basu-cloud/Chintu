
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InventoryItemProps {
    name: string;
    stock: number;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ name, stock }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{name}</Text>
            <Text style={styles.itemStock}>Stock: {stock} units</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 5,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemStock: {
        fontSize: 16,
        color: 'gray',
    },
});

export default InventoryItem;
