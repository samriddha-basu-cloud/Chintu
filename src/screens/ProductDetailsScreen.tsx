// import React, { useState } from 'react';
// import {  } from 'react-native';
// import CustomTextInput from '../components/CustomTextInput';
// import CustomButton from '../components/CustomButton';





// const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ navigation }): React.JSX.Element => {
//     const [name, setName] = useState('');
//     const [stock, setStock] = useState('');
//     const [price, setPrice] = useState('');
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState('');
//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalMessage, setModalMessage] = useState('');

//     const addProduct = async () => {
//         if (!name || !stock || !price || !description || !category) {
//             showModal('Please fill in all fields.');
//             return;
//         }

//         try {
//             const stockNumber = parseInt(stock, 10);
//             const priceNumber = parseFloat(price);
//             if (isNaN(stockNumber) || isNaN(priceNumber)) {
//                 showModal('Stock and Price must be numeric.');
//                 return;
//             }

//             await addDoc(collection(firestore, 'inventory'), { name, stock: stockNumber, price: priceNumber, description, category });

//             showModal('Product added successfully!', true);
//         } catch (error) {
//             console.error('Error adding product: ', error);
//             showModal('There was an issue adding the product.');
//         }
//     };

   

//     return (
      
//     );
// };



// export default ProductDetailsScreen;