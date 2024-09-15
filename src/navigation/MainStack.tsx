import React from 'react';
import InventoryScreen from '../screens/InventoryScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const MainStack: React.FC = () => {
    return (

            <Stack.Navigator initialRouteName="Inventory" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Inventory" component={InventoryScreen} />
                <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
            </Stack.Navigator>
    );
};

export default MainStack;
