// src/screens/BarcodeScannerScreen.tsx
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
interface BarcodeScannerScreenProps {
    navigation: any;
}

const BarcodeScannerScreen: React.FC<BarcodeScannerScreenProps> = ({ navigation }): React.JSX.Element => {
    const onBarcodeRead = ({ data }: { data: string }) => {

        Alert.alert('Barcode detected', `Data: ${data}`);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.preview}
                onBarCodeRead={onBarcodeRead}
                captureAudio={false}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
});

export default BarcodeScannerScreen;
