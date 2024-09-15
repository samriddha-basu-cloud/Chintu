import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import InventoryScreen from '../screens/InventoryScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CategoryItemsScreen from '../screens/CategoryItemsScreen';
import EditInventoryItemScreen from '../screens/EditInventoryItemScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="Inventory"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconSource;

                    if (route.name === 'Inventory') {
                        iconSource = focused
                            ? require('../assets/icons/home.png')
                            : require('../assets/icons/home-outline.png');
                    } else if (route.name === 'BarcodeScanner') {
                        iconSource = focused
                            ? require('../assets/icons/qrcode.png')
                            : require('../assets/icons/qrcode-outline.png');
                    } else if (route.name === 'Profile') {
                        iconSource = focused
                            ? require('../assets/icons/user.png')
                            : require('../assets/icons/user-outline.png');
                    }

                    return <Image source={iconSource} style={{ width: 28, height: 28, tintColor: color }} />;
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: '#8e8e93',
                headerShown: false,
                tabBarStyle: {
                    height: 70, // Increase the height to make the tab bar bigger
                    paddingBottom: 10, // Add padding for the icons
                    paddingTop: 10, // Add padding to make the tab bar more spacious
                    backgroundColor: '#fff', // White background for a modern look
                    borderTopWidth: 0, // Remove the top border for a cleaner look
                    elevation: 10, // Add some shadow for a modern, floating effect
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                },
                tabBarLabelStyle: {
                    fontSize: 12, // Adjust font size for label
                    fontWeight: '600', // Make the font weight semi-bold
                },
            })}
        >
            <Tab.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
            <Tab.Screen name="BarcodeScanner" component={BarcodeScannerScreen} options={{ title: 'Scan' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
};

const MainStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            <Stack.Screen name="CategoryItems" component={CategoryItemsScreen} />
            <Stack.Screen name="EditInventoryItem" component={EditInventoryItemScreen} />
        </Stack.Navigator>
    );
};

export default MainStack;