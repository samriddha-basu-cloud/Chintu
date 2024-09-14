import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import AuthStack from './src/navigation/AuthStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainStack from './src/navigation/MainStack';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {/* <AuthStack /> */}
        <MainStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
};

export default App;
