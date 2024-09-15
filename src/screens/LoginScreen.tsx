import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../navigation/NavigationTypes';

const LoginScreen = () => {

    const navigation = useNavigation<LoginScreenNavigationProp>();
  return (
    <View style={styles.loginPage}>
      <View style={styles.loginContainer}>
        <Text style={styles.welcomeText}>Welcome back</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signUpText}>New user? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#333333',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#A0A0A0',
    textAlign: 'right',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginScreen;
