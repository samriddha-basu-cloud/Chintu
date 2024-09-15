import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';

const BarcodeScanner: React.FC = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);

  // Handle the barcode scanning event
  const handleBarCodeRead = (event: BarCodeReadEvent) => {
    if (event.data !== scannedData) {
      setScannedData(event.data);
      Alert.alert('Scanned Data', event.data, [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeRead}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
      >
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scan a Barcode</Text>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  scanText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BarcodeScanner;
