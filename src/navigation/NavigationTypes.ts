import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  SignUpScreen: undefined;
};


export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpScreen'>;
