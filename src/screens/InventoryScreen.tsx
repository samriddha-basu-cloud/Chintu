// Import necessary components from React Native
import React, { useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { firestore } from '../services/firebaseConfig';
import { collection, deleteDoc, doc, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import LoadingDots from '../components/LoadingDots';
import CustomButton from '../components/CustomButton';

interface InventoryItemData {
    sId: string;
    name: string;
    stock: number;
    price?: number;
    description?: string;
    category?: string;
}

const InventoryScreen = ({ navigation }: any): React.JSX.Element => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
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

            // Extract unique categories from inventory and add "All Categories" option
            const uniqueCategories = Array.from(new Set(inventoryList.map(item => item.category)));
            setCategories(['All Categories', ...uniqueCategories]); // Add "All Categories" at the start
        } catch (error) {
            console.error('Error fetching inventory data: ', error);
        } finally {
            setLoading(false);
        }
    };

    // Refetch data whenever the screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const handleCategoryPress = (category: string) => {
        if (category === 'All Categories') {
            navigation.navigate('CategoryItems', { category: null }); // Navigate to CategoryItems screen with no filter
        } else {
            navigation.navigate('CategoryItems', { category }); // Navigate to CategoryItems screen with selected category
        }
    };

    // Get screen width and calculate tile size for a grid of two columns
    const { width } = Dimensions.get('window');
    const tileSize = (width - 60) / 2; // Adjust to fit two tiles with proper margin

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(firestore, 'inventory', id));
            fetchData(); // Refresh the data after deletion
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item: any) => {
        navigation.navigate('EditInventoryItemScreen', { item });
    };

    const getCategoryImage = (category: string) => {
        switch (category) {
            case 'All Categories':
                return require('../assets/images/allCategory.png');
            case 'Food':
                return require('../assets/images/food.png');
            case 'Grocery':
                return require('../assets/images/grocery.png');
            case 'Healthcare':
                return require('../assets/images/healthCare.png');
            default:
                return null; // No image for "Others" or any other category
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Categories</Text>
                <CustomButton
                    title="Add Product"
                    onPress={() => navigation.navigate('ProductDetails')}
                />
            </View>
            {loading ? (
                <LoadingDots />
            ) : (
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item}
                    key={`grid-${2}`} // Use key prop to force re-render when changing columns
                    numColumns={2} // Display items in two columns
                    renderItem={({ item }) => {
                        const backgroundImage = getCategoryImage(item);
                        return (
                            <TouchableOpacity
                                style={[styles.categoryTile, { width: tileSize, height: tileSize }]}
                                onPress={() => handleCategoryPress(item)}
                            >
                                {backgroundImage ? (
                                    <ImageBackground
                                        source={backgroundImage}
                                        style={styles.imageBackground}
                                        imageStyle={{ opacity: 0.6 }} // Set reduced opacity for the image
                                    >
                                        <Text style={styles.categoryText}>{item}</Text>
                                    </ImageBackground>
                                ) : (
                                    <Text style={styles.categoryText}>{item}</Text>
                                )}
                            </TouchableOpacity>
                        );
                    }}
                    contentContainerStyle={styles.gridContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
    },
    addButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        elevation: 3, // Adds subtle shadow for a raised effect
    },
    gridContainer: {
        justifyContent: 'center',
        paddingBottom: 20, // Adds some space at the bottom
    },
    categoryTile: {
        backgroundColor: '#FFFFFF',
        borderColor: '#007BFF', // Blue border
        borderWidth: 1.5,
        borderRadius: 12,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Adds subtle shadow for a modern look
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    categoryText: {
        color: '#007BFF',
        fontWeight: '900',
        fontSize: 25, // Slightly smaller font size to fit within the tiles
        textAlign: 'center',
        paddingHorizontal: 5,
    },
});

export default InventoryScreen;