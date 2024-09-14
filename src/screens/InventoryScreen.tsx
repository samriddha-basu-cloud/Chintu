// src/screens/InventoryScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { firestore } from '../services/firebaseConfig'; // Import Firestore instance
import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore'; // Import Firestore methods and types
import CustomButton from '../components/CustomButton';
import InventoryItem from '../components/InventoryItem';

// Updated interface to match the fetched data
interface InventoryItemData {
    sId: string;
    name: string;
    stock: number;
}

const InventoryScreen = ({ navigation }: any): React.JSX.Element => {
    const [inventory, setInventory] = useState<InventoryItemData[]>([]); // Use a typed state with the updated interface

    useEffect(() => {
        const fetchData = async () => {
            try {
                const inventoryCollection = collection(firestore, 'inventory'); // Use collection method to reference the Firestore collection
                const inventorySnapshot = await getDocs(inventoryCollection); // Fetch the documents
                const inventoryList = inventorySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
                    const data = doc.data() as Omit<InventoryItemData, 'sId'>; // Omit sId to avoid duplicate keys
                    return {
                        sId: doc.id, // Set the id from the document's ID
                        ...data,    // Spread the remaining data
                    };
                });
                setInventory(inventoryList);
            } catch (error) {
                console.error('Error fetching inventory data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={inventory}
                keyExtractor={(item) => item.sId} // Use sId for the key extractor
                renderItem={({ item }) => <InventoryItem name={item.name} stock={item.stock} />}
            />
            <CustomButton title="Add Product" onPress={() => navigation.navigate('ProductDetails')} />
            <CustomButton title="Scan Barcode" onPress={() => navigation.navigate('BarcodeScanner')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
});

export default InventoryScreen;
