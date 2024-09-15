// src/screens/CategoryItemsScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import { firestore } from '../services/firebaseConfig';
import { collection, query, where, getDocs, QueryDocumentSnapshot, doc, deleteDoc } from 'firebase/firestore';
import InventoryItem from '../components/InventoryItem';
import LoadingDots from '../components/LoadingDots';
import { useFocusEffect } from '@react-navigation/native';

interface InventoryItemData {
    sId: string;
    name: string;
    stock: number;
    price?: number;
    description?: string;
    category?: string;
}

const CategoryItemsScreen = ({ route, navigation }: any): React.JSX.Element => {
    const { category } = route.params; // Get category from navigation params
    const [categoryItems, setCategoryItems] = useState<InventoryItemData[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCategoryItems = async () => {
        try {
            setLoading(true);
            const inventoryCollection = collection(firestore, 'inventory');
            let q;
            if (category) {
                q = query(inventoryCollection, where('category', '==', category));
            } else {
                q = inventoryCollection; // Fetch all items if category is null
            }
            const inventorySnapshot = await getDocs(q);
            const inventoryList = inventorySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
                const data = doc.data() as Partial<InventoryItemData>;
                return {
                    sId: doc.id,
                    name: data.name ?? 'Unnamed Product',
                    stock: data.stock ?? 0,
                    price: data.price ?? 0,
                    description: data.description ?? 'No description available',
                    category: data.category ?? 'Uncategorized',
                };
            });
            setCategoryItems(inventoryList);
        } catch (error) {
            console.error('Error fetching category items: ', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCategoryItems();
        }, [category])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCategoryItems();
        setRefreshing(false);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(firestore, 'inventory', id));
            fetchCategoryItems(); // Refresh the data after deletion
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item: InventoryItemData) => {
        navigation.navigate('EditInventoryItem', { item });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{category ? `${category} Items` : 'All Items'}</Text>
            {loading ? (
                <LoadingDots />
            ) : (
                <FlatList
                    data={categoryItems}
                    keyExtractor={(item) => item.sId}
                    renderItem={({ item }) => (
                        <InventoryItem
                            name={item.name}
                            stock={item.stock}
                            price={item.price}
                            description={item.description}
                            category={item.category}
                            onEdit={() => handleEdit(item)}  // Pass the item to edit
                            onDelete={() => handleDelete(item.sId)}  // Pass the item ID to delete
                        />
                    )}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={<Text style={styles.emptyText}>No items available</Text>}
                    contentContainerStyle={categoryItems.length === 0 ? styles.emptyContainer : null}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },
    emptyContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default CategoryItemsScreen;