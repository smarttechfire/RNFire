import React, {useEffect, useState} from 'react';

import LoginScreen from './src/screens/LoginScreen';
import auth from '@react-native-firebase/auth';
import Logout from './src/screens/LogoutScreen';
import LoginPage from './src/screens/LoginPage';

const App = () => {
  const [user, setUser] = useState();
  console.log('user :', user);
  const onAuthStateSave = (user: any) => setUser(user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateSave);
    return subscriber;
  });

  return <>
    {user ? <Logout /> : <LoginPage />}
  </>;
};

export default App;
