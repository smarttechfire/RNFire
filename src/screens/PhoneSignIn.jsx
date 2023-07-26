import {Button, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import OTPScreen from './OTPScreen';

const PhoneSignIn = () => {
  const [confirm, setConfirm] = useState(null);
  console.log('confirm :', confirm);

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  return (
    <View style={styles.container}>
      {confirm ? (
        <OTPScreen confirm={confirm} />
      ) : (
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber('+91 9000109117')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default PhoneSignIn;
