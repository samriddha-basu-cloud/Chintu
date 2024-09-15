import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';

const { width } = Dimensions.get('window');
const cameraWidth = width * 0.8; // Set camera width to 80% of screen width
const cameraHeight = cameraWidth * 1.5; // Set camera height to maintain aspect ratio

const BarcodeScanner: React.FC = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(0);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const handleBarCodeRead = (event: BarCodeReadEvent) => {
    if (event.data !== scannedData) {
      setScannedData(event.data);
      setModalVisible(true); // Show modal when barcode is scanned
    }
  };

  const increaseZoom = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 1)); // Increase zoom level up to maximum of 1
  };

  const decreaseZoom = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0)); // Decrease zoom level down to minimum of 0
  };

  const closeModal = () => {
    setModalVisible(false);
    setScannedData(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanner</Text>
      <View style={styles.cameraContainer}>
        <RNCamera
          style={styles.camera}
          onBarCodeRead={handleBarCodeRead}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          zoom={zoom} // Apply the zoom level
        >
          <View style={styles.overlay}>
            <Text style={styles.scanText}>Align the barcode within the frame</Text>
          </View>
        </RNCamera>
      </View>
      <View style={styles.zoomControls}>
        <TouchableOpacity onPress={decreaseZoom} style={styles.zoomButton}>
          <Text style={styles.zoomButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.zoomLevelText}>Zoom: {(zoom * 10).toFixed(1)}</Text>
        <TouchableOpacity onPress={increaseZoom} style={styles.zoomButton}>
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Modal for Scanned Data */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Scanned Data</Text>
            <Text style={styles.modalText}>{scannedData}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  cameraContainer: {
    width: cameraWidth,
    height: cameraHeight,
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  scanText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  zoomButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  zoomButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  zoomLevelText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BarcodeScanner;