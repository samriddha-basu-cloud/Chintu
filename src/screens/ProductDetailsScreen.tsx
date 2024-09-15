import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, Modal, TouchableOpacity } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { firestore } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface ProductDetailsScreenProps {
    navigation: any;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ navigation }): React.JSX.Element => {
    const [name, setName] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const addProduct = async () => {
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

            await addDoc(collection(firestore, 'inventory'), { name, stock: stockNumber, price: priceNumber, description, category });

            showModal('Product added successfully!', true);
        } catch (error) {
            console.error('Error adding product: ', error);
            showModal('There was an issue adding the product.');
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
            <Text style={styles.title}>Add Product Details</Text>
            <CustomTextInput
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
            />
            <CustomTextInput
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
            />
            <CustomTextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <CustomTextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <CustomTextInput
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
            />
            <CustomButton title="Save Product" onPress={addProduct} />

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
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
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

export default ProductDetailsScreen;