import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState('India');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Sign up</Text>

        <TextInput
          placeholder="Enter your first name"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your last name"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your email address"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
        />
        <TextInput
          placeholder="Create a password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="(123) 456-7890"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Enter your shop name"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your business address"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
        />

        <View style={styles.input}>
          <RNPickerSelect
            onValueChange={value => setSelectedCountry(value)}
            placeholder={{
              label: 'Select your country/region',
              value: null,
              color: '#A0A0A0',
            }}
            items={[
              {label: 'India', value: 'India'},
              {label: 'Sri Lanka', value: 'Sri Lanka'},
            ]}
            style={pickerSelectStyles}
            value={selectedCountry}
          />
        </View>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  formContainer: {
    flex: 1,
  },
  header: {
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
  continueButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  continueButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
    height: 40,
    backgroundColor: '#333333',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
    backgroundColor: '#333333',
  },
  placeholder: {
    color: '#A0A0A0',
    fontSize: 16,
  },
  modalViewTop: {
    backgroundColor: 'red',
  },
  modalViewBottom: {
    backgroundColor: 'gray',
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
};

export default SignUpScreen;
