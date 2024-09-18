import React,{useState} from 'react';
import { BottomSheet } from '@rneui/themed';
import {View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomTextInput from './CustomTextInput';
import CustomButton from './CustomButton';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../services/firebaseConfig';

type BottomSheetComponentProps = {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
};

const BottomSheetComponent: React.FunctionComponent<BottomSheetComponentProps> = ({ isVisible, setIsVisible }) => {

    const [state, setState] = useState({
        name: '',
        stock: '',
        price: '',
        description: '',
        category: '',
        modalVisible: false,
        modalMessage: '',
    });

    const showModal = (message: string, success: boolean) => {
        setState((prevState) => ({
            ...prevState,
            modalVisible: true,
            modalMessage: message,
        }));
        if (success) {
            setTimeout(() => {
                setState((prevState) => ({
                    ...prevState,
                    modalVisible: false,
                }));
                setIsVisible(false);
            }, 1500);
        }
    };

    const addProduct = async () => {
        if (!state.name || !state.stock || !state.price || !state.description || !state.category) {
            showModal('Please fill in all fields.', true);
            return;
        }

        try {
            const stockNumber = parseInt(state.stock, 10);
            const priceNumber = parseFloat(state.price);
            if (isNaN(stockNumber) || isNaN(priceNumber)) {
                showModal('Stock and Price must be numeric.', true);
                return;
            }

            await addDoc(collection(firestore, 'inventory'), { 
                name: state.name,
                stock: stockNumber,
                price: priceNumber,
                description: state.description,
                category: state.category
            });

            setState({ ...state, modalVisible: true,modalMessage: 'Product added successfully!' });
            setState({ ...state, name: '', stock: '', price: '', description: '', category: '' });
        } catch (error) {
            console.error('Error adding product: ', error);
            showModal('There was an issue adding the product.', false);
        }
    };


    console.log("sunfsunfsefnbs",state.modalMessage);

    return (
        <SafeAreaProvider>
            <BottomSheet modalProps={{}} isVisible={isVisible}>
            <View style={styles.container}>
            <Text style={styles.title}>Add Product Details</Text>
            <CustomTextInput
                placeholder="Product Name"
                value={state.name}
                onChangeText={(name) => setState({ ...state, name })}
            />
            <CustomTextInput
                placeholder="Stock"
                value={state.stock}
                onChangeText={(stock) => setState({ ...state, stock })}
                keyboardType="numeric"
            />
            <CustomTextInput
                placeholder="Price"
                value={state.price}
                onChangeText={(price) => setState({ ...state, price })}
                keyboardType="numeric"
            />
            <CustomTextInput
                placeholder="Description"
                value={state.description}
                onChangeText={(description) => setState({ ...state, description })}
                multiline
            />
            <CustomTextInput
                placeholder="Category"
                value={state.category}
                onChangeText={(category) => setState({ ...state, category })}
            />
            <CustomButton title="Save Product" onPress={addProduct} />
            <Modal
                visible={state.modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setState({ ...state, modalVisible: false })}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalMessage}>{state.modalMessage}</Text>
                        <TouchableOpacity onPress={() => setState({...state, modalVisible: false})} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
            </BottomSheet>
        </SafeAreaProvider>
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
        color: '#000000',
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

export default BottomSheetComponent;
