import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View, StyleSheet } from 'react-native';
import InventoryScreen from '../screens/InventoryScreen';
// import ProductDetailsScreen from '../screens/ProductDetailsScreen';
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

                    if (route.name === 'BarcodeScanner') {
                        return (
                            <View style={styles.scanButtonContainer}>
                                <View style={styles.scanButton}>
                                    <Image source={iconSource} style={[styles.scanIcon, { tintColor: '#FFFFFF' }]} />
                                </View>
                            </View>
                        );
                    }

                    return <Image source={iconSource} style={[styles.icon, { tintColor: color }]} />;
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: '#8e8e93',
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
            })}
        >
            <Tab.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
            <Tab.Screen
                name="BarcodeScanner"
                component={BarcodeScannerScreen}
                options={{
                    title: 'Scan',
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
};

const MainStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            {/* <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} /> */}
            <Stack.Screen name="CategoryItems" component={CategoryItemsScreen} />
            <Stack.Screen name="EditInventoryItem" component={EditInventoryItemScreen} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
    icon: {
        width: 43,
        height: 43,
    },
    scanButtonContainer: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    scanButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#03A9F4',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#03A9F4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    scanIcon: {
        width: 55,
        height: 55,
    },
});

export default MainStack;