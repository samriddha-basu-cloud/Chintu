// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

const ProfileScreen: React.FC = () => {
    // Define state for each field
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [phone, setPhone] = useState('+1234567890');
    const [language, setLanguage] = useState('English');

    // Example state for user profile picture URL
    const [profileImage, setProfileImage] = useState<string | null>(null); // Set to null if no profile image is available

    // Logout function
    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => console.log('Logged out') },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>

            {/* Circular Profile Picture */}
            <Image
                source={profileImage ? { uri: profileImage } : require('../assets/icons/user.png')} // Use default image if profileImage is null
                style={styles.profileImage}
            />

            {/* Display user's profile details */}
            <CustomTextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                editable={false}
            />
            <CustomTextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                editable={false}
            />
            <CustomTextInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                editable={false}
            />
            <CustomTextInput
                placeholder="Language"
                value={language}
                onChangeText={setLanguage}
                editable={false}
            />

            {/* Logout Button */}
            <CustomButton title="Logout" onPress={handleLogout} color="red" />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // Makes the image circular
        alignSelf: 'center', // Centers the image horizontally
        marginBottom: 20, // Adds space below the image
    },
});

export default ProfileScreen;