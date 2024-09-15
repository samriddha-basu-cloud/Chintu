// InventoryScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text } from 'react-native';
import { firestore } from '../services/firebaseConfig';
import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import CustomButton from '../components/CustomButton';
import InventoryItem from '../components/InventoryItem';
import LoadingDots from '../components/LoadingDots'; // Import LoadingDots component

interface InventoryItemData {
    sId: string;
    name: string;
    stock: number;
    price?: number;
    description?: string;
    category?: string;
}

const InventoryScreen = ({ navigation }: any): React.JSX.Element => {
    const [inventory, setInventory] = useState<InventoryItemData[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    const fetchData = async () => {
        try {
            setLoading(true); // Set loading to true before fetching data
            const inventoryCollection = collection(firestore, 'inventory');
            const inventorySnapshot = await getDocs(inventoryCollection);
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
            setInventory(inventoryList);
        } catch (error) {
            console.error('Error fetching inventory data: ', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inventory</Text>
            {loading ? (
                // Display custom loading dots while loading
                <LoadingDots />
            ) : (
                <FlatList
                    data={inventory}
                    keyExtractor={(item) => item.sId}
                    renderItem={({ item }) => (
                        <InventoryItem
                            name={item.name}
                            stock={item.stock}
                            price={item.price}
                            description={item.description}
                            category={item.category}
                        />
                    )}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={<Text style={styles.emptyText}>No items available</Text>}
                    contentContainerStyle={inventory.length === 0 ? styles.emptyContainer : null}
                />
            )}
            <CustomButton
                title="Add Product"
                onPress={() => navigation.navigate('ProductDetails')}
            />
            <CustomButton
                title="Scan Barcode"
                onPress={() => navigation.navigate('BarcodeScanner')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 16,
    },
    button: {
        marginTop: 10,
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

export default InventoryScreen;