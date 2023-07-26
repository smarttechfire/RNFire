import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = () => {
    auth()
        .signInWithEmailAndPassword(email,password)
        .then(response => {
            Alert.alert('Login Successfully!');
            console.log('response :', response);
        }).catch(error => {
            console.log('error :',error);
            if (error.code === 'auth/wrong-password'){
                Alert.alert('Password is not correct!');
                console.log('error :',error);
            }
            else if (error.code === 'auth/user-not-found'){
                Alert.alert('There is no user record doesnt exist');
            }
            else {
                Alert.alert('error :', error);
            }
        });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.inputBox}
        value={email}
        onChangeText={value => setEmail(value)}
      />

      <TextInput
        placeholder="Password"
        style={styles.inputBox}
        value={password}
        onChangeText={value => setPassword(value)}
      />
      <TouchableOpacity onPress={onLogin} style={styles.register}>
        <Text style={styles.registerTitle}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '90%',
    marginTop: 20,
  },
  register: {
    width: '90%',
    backgroundColor: '#FCAF03',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  registerTitle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  login: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '600',
    alignItems:'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
export default LoginScreen;
