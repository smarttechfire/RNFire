import {View, Button, StyleSheet} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
const GoogleLogin = () => {
  GoogleSignin.configure({
    webClientId:
      '164448642532-99mt35h85qepl1imrr84h61g1obgjnti.apps.googleusercontent.com',
  });

  const onGoogleSignin = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={styles.container}>
      <Button title="Google Sign in" onPress={onGoogleSignin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default GoogleLogin;
