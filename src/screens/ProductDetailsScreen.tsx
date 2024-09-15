// src/screens/ProductDetailsScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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

    const addProduct = async () => {
        if (!name || !stock) {
            Alert.alert('Validation Error', 'Please fill in both fields.');
            return;
        }

        try {
            const stockNumber = parseInt(stock);
            if (isNaN(stockNumber)) {
                Alert.alert('Validation Error', 'Stock must be a number.');
                return;
            }

            await addDoc(collection(firestore, 'inventory'), { name, stock: stockNumber });

            Alert.alert('Success', 'Product added successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error adding product: ', error);
            Alert.alert('Error', 'There was an issue adding the product.');
        }
    };

    return (
        <View style={styles.container}>
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
            <CustomButton title="Save Product" onPress={addProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
});

export default ProductDetailsScreen;
