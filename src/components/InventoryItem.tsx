// src/components/InventoryItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface InventoryItemProps {
    name: string;
    stock: number;
    price?: number;
    description?: string;
    category?: string;
    onPress?: () => void;
    onDelete: () => void; // Make sure these are not optional
    onEdit: () => void;   // Make sure these are not optional
}

const InventoryItem: React.FC<InventoryItemProps> = ({
    name,
    stock,
    price = 0,
    description = 'No description available',
    category = 'Uncategorized',
    onPress,
    onDelete,
    onEdit,
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
        <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
            {/* Edit and Delete Icons */}
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
                    <Image source={require('../assets/icons/edit.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
                    <Image source={require('../assets/icons/delete.png')} style={[styles.icon, styles.deleteIcon]} />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{name}</Text>
                    <Text style={styles.itemCategory}>{category}</Text>
                    <Text style={styles.itemPrice}>₹{price.toFixed(2)}</Text>
                    <Text style={styles.itemStock}>{stock} units in stock</Text>
                    <Text style={styles.itemDescription} numberOfLines={2}>
                        {description}
                    </Text>
                </View>
                <View style={[styles.stockIndicator, { backgroundColor: getStockColor() }]}>
                    <Text style={styles.stockLevel}>{getStockLevel()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 10,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        position: 'relative', // Relative positioning for absolute-positioned icons
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        zIndex: 10, // Ensure icons are above other content
    },
    iconButton: {
        marginLeft: 10,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#007BFF', // Tint color for the edit icon
    },
    deleteIcon: {
        tintColor: 'red', // Red tint color for the delete icon
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    itemInfo: {
        flex: 1,
        paddingRight: 16,
    },
    itemName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 6,
    },
    itemCategory: {
        fontSize: 14,
        color: '#4a4e69',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        fontWeight: '600',
    },
    itemPrice: {
        fontSize: 18,
        color: '#1a1a2e',
        marginBottom: 6,
        fontWeight: '600',
    },
    itemStock: {
        fontSize: 14,
        color: '#4a4e69',
        marginBottom: 6,
    },
    itemDescription: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 6,
        lineHeight: 20,
    },
    stockIndicator: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stockLevel: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});

export default InventoryItem;