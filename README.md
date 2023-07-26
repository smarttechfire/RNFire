This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

<!-- ============================================= My Steps ============================================= -->
<!-- ============================================= Firebase Steps ======================================= -->

- [React Native Firebase](https://rnfirebase.io/) - learn more about React Native Firebase

## Firebase Setup Steps

**Open Firebase Console**

- create a new Firebase project RNFire
- create a android app in RNFire
- Here we have package name
  package name location ./android/app/src/build.gradle
  find the application Id? and we got package name
  -com.rnfire
  -Here we want SHA-1 KEY
  Find with this cmd ./gradlew signingReport
  follow the steps
  cd android after we apply the cmd
  ./gradlew signingReport
  paste the key in SHA-1

-Download the google-service.json file

## Add Firebase SDK

**./android/builde.gradle**
-Add the plugin as a dependency to your project-level build.gradle file:
-classpath 'com.google.gms:google-services:4.3.15'
**./android/app/build.gradle**
-id 'com.google.gms.google-services'

implementation platform('com.google.firebase:firebase-bom:32.2.0')
implementation 'com.google.firebase:firebase-analytics'

## After adding the plugin and the desired SDKs, sync your Android project with Gradle files.

./gradlew clean

## React Native Firebase

**Install via NPM**
-npm install --save @react-native-firebase/app

-npm install @react-native-firebase/auth

**Email/Password sign-in**
-Email/password sign in is a common method for user sign in on applications. This requires the user to provide an email address and secure password. Users can both register and sign in using a method called createUserWithEmailAndPassword or sign in to an existing account with signInWithEmailAndPassword.
-Ensure the "Email/Password" sign-in provider is enabled on the Firebase Console.
-The createUserWithEmailAndPassword performs two operations; first creating the user if they do not already exist, and then signing them in.

import auth from '@react-native-firebase/auth';

auth()
.createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
.then(() => {
console.log('User account created & signed in!');
})
.catch(error => {
if (error.code === 'auth/email-already-in-use') {
console.log('That email address is already in use!');
}

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);

});

## Listening to authentication state

---

In most scenarios using Authentication, you will want to know whether your users are currently signed-in or signed-out of your application. The module provides a method called **onAuthStateChanged** which allows you to subscribe to the users current authentication state, and receive an event whenever that state changes.

---

It is important to remember the `onAuthStateChanged` listener is asynchronous and will trigger an initial state once a connection with Firebase has been established. Therefore it is important to setup an "initializing" state which blocks render of our main application whilst the connection is established:

---

---

                                          **Smaple Code**

```
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

```

If the `user` returned within the handler is `null` we assume the `user` is currently signed-out, otherwise they are signed-in and a User interface is returned.

---

The `onAuthStateChanged` method also returns an unsubscriber function which allows us to stop listening for events whenever the hook is no longer in use.
