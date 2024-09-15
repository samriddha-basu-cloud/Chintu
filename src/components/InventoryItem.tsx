import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InventoryItemProps {
    name: string;
    stock: number;
    price?: number; // Make price optional
    description?: string; // Make description optional
    category?: string; // Make category optional
}

const InventoryItem: React.FC<InventoryItemProps> = ({
    name,
    stock,
    price = 0, // Provide a default value for price
    description = 'No description available', // Provide a default value for description
    category = 'Uncategorized', // Provide a default value for category
}) => {
    const getStockLevel = () => {
        if (stock > 50) return 'High';
        if (stock > 20) return 'Medium';
        return 'Low';
    };

    const getStockColor = () => {
        if (stock > 50) return '#4CAF50';
        if (stock > 20) return '#FFC107';
        return '#F44336';
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{name}</Text>
                <Text style={styles.itemCategory}>{category}</Text>
                <Text style={styles.itemPrice}>Price: ₹{price.toFixed(2)}</Text>
                <Text style={styles.itemStock}>Stock: {stock} units</Text>
                <Text style={styles.itemDescription}>{description}</Text>
            </View>
            <View style={[styles.stockIndicator, { backgroundColor: getStockColor() }]}>
                <Text style={styles.stockLevel}>{getStockLevel()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    itemCategory: {
        fontSize: 14,
        color: '#007AFF',
        marginBottom: 6,
    },
    itemPrice: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 4,
    },
    itemStock: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 4,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666666',
        marginTop: 6,
    },
    stockIndicator: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginLeft: 12,
    },
    stockLevel: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default InventoryItem;