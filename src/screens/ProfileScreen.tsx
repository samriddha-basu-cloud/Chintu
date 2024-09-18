import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen: React.FC = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [phone, setPhone] = useState('+1234567890');
    const [department, setDepartment] = useState('Marketing');
    const [position, setPosition] = useState('Senior Manager');
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => console.log('Logged out') },
        ]);
    };

    const ProfileItem = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
        <View style={styles.profileItem}>
            <Icon name={icon} size={22} color="#555" />
            <View style={styles.profileItemText}>
                <Text style={styles.profileItemLabel}>{label}</Text>
                <Text style={styles.profileItemValue}>{value}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Employee Profile</Text>
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={profileImage ? { uri: profileImage } : require('../assets/icons/user.png')}
                            style={styles.profileImage}
                        />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.positionText}>{position}</Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <ProfileItem icon="email" label="Email" value={email} />
                    <ProfileItem icon="phone" label="Phone" value={phone} />
                    <ProfileItem icon="business" label="Department" value={department} />
                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="edit" size={20} color="#007AFF" />
                        <Text style={styles.actionButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="lock" size={20} color="#007AFF" />
                        <Text style={styles.actionButtonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="exit-to-app" size={22} color="#FFF" />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    header: {
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E1E8ED',
        backgroundColor: '#FFF',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF',
    },
    profileImageContainer: {
        marginRight: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    nameContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    positionText: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
    infoContainer: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 20,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileItemText: {
        marginLeft: 16,
        flex: 1,
    },
    profileItemLabel: {
        fontSize: 14,
        color: '#777',
    },
    profileItemValue: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
        marginTop: 2,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginBottom: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E8ED',
    },
    actionButtonText: {
        marginLeft: 8,
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 20,
    },
    logoutButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default ProfileScreen;