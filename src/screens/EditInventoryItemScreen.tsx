// src/screens/EditInventoryItemScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { firestore } from '../services/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const EditInventoryItemScreen = ({ route, navigation }: any): React.JSX.Element => {
    const { item } = route.params; // Receive the item from navigation params
    const [name, setName] = useState(item.name);
    const [stock, setStock] = useState(String(item.stock));
    const [price, setPrice] = useState(String(item.price));
    const [description, setDescription] = useState(item.description);
    const [category, setCategory] = useState(item.category);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleUpdate = async () => {
        if (!name || !stock || !price || !description || !category) {
            showModal('Please fill in all fields.');
            return;
        }

        try {
            const stockNumber = parseInt(stock, 10);
            const priceNumber = parseFloat(price);
            if (isNaN(stockNumber) || isNaN(priceNumber)) {
                showModal('Stock and Price must be numeric.');
                return;
            }

            const itemRef = doc(firestore, 'inventory', item.sId);
            await updateDoc(itemRef, {
                name,
                stock: stockNumber,
                price: priceNumber,
                description,
                category,
            });

            showModal('Item updated successfully!', true);
        } catch (error) {
            console.error('Error updating item: ', error);
            showModal('There was an issue updating the item.');
        }
    };

    const showModal = (message: string, success = false) => {
        setModalMessage(message);
        setModalVisible(true);
        if (success) {
            setTimeout(() => {
                setModalVisible(false);
                navigation.goBack();
            }, 1500);
        }
    };

    return (
        <View style={styles.container}>
            <CustomTextInput placeholder="Name" value={name} onChangeText={setName} />
            <CustomTextInput placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" />
            <CustomTextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
            <CustomTextInput placeholder="Description" value={description} onChangeText={setDescription} />
            <CustomTextInput placeholder="Category" value={category} onChangeText={setCategory} />

            <CustomButton title="Update Item" onPress={handleUpdate} />

            {/* Custom Modal for Alerts */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalMessage: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditInventoryItemScreen;