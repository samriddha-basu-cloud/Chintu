// src/components/CustomTextInput.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, value, onChangeText, ...rest }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="gray" // Set the placeholder color to gray
            value={value}
            onChangeText={onChangeText}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        borderRadius: 5,
        color: 'black', // Set the input text color to black
    },
});

export default CustomTextInput;