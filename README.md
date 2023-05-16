# Chat App

This project is a chat app for mobile devices using React Native.
It is built as a task for Achievement 5 of [CareerFoundry's Full-Stack Web Development program](https://careerfoundry.com/en/courses/become-a-web-developer).

## About

The achievement objective is to build a chat app for mobile devices using React Native, a framework for building Android and iOS apps that only requires one codebase. The app will provide users with a chat interface and options to share images and their location.

## Key Features

-   A page where users can enter their name and choose a background color for the chat screen before joining the chat.
-   A page displaying the conversation, as well as an input field and submit button.
-   The chat must provide users with two additional communication features: sending images
    and location data.
-   Data gets stored online and offline.

## User Stories

-   As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
-   As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
-   As a user, I want to send images to my friends to show them what I’m currently doing.
-   As a user, I want to share my location with my friends to show them where I am.
-   As a user, I want to be able to read my messages offline so I can reread conversations at any
    time.
-   As a user with a visual impairment, I want to use a chat app that is compatible with a screen
    reader so that I can engage with a chat interface.

## Technical requirements

-   The app must be written in React Native
-   The app must be developed using Expo
-   The app must be styled according to the given screen design
-   Chat conversations must be stored in Google Firestore Database
-   The app must authenticate users anonymously via Google Firebase authentication
-   Chat conversations must be stored locally
-   The app must let users pick and send images from the phone’s image library
-   The app must let users take pictures with the device’s camera app, and send them
-   The app must store images in Firebase Cloud Storage
-   The app must be able to read the user’s location data
-   Location data must be sent via the chat in a map view
-   The chat interface and functionality must be created using the Gifted Chat library
-   The app’s codebase must contain comments

## Tech stack

-   [React Native](https://reactnative.dev/)
-   [Expo](https://expo.dev/)
-   [Google Firestore Database](https://firebase.google.com/)
-   Google Firebase Authentication
-   [React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)

## Dependencies

-   "@expo/webpack-config": "^18.0.4",
-   "@react-navigation/native": "^6.1.6",
-   "@react-navigation/native-stack": "^6.9.12",
-   "expo": "~48.0.16",
-   "expo-status-bar": "~1.4.4",
-   "firebase": "^9.22.0",
-   "react": "18.2.0",
-   "react-dom": "18.2.0",
-   "react-native": "0.71.7",
-   "react-native-gifted-chat": "^2.1.0",
-   "react-native-safe-area-context": "4.5.0",
-   "react-native-screens": "~3.20.0",
-   "react-native-web": "~0.18.10",
-   "@react-native-community/netinfo": "9.3.7",
-   "@react-native-async-storage/async-storage": "1.17.11",
-   "expo-image-picker": "~14.1.1",
-   "expo-location": "~15.1.1",
-   "react-native-maps": "1.3.2"\_

## Setting up the app

### Getting started

-   Clone the repository `git clone https://github.com/NeleSchallenberg/chat-app.git`
-   Install and use nodejs version 16.19.0

### Expo

-   Install Expo CLI as a global npm package: npm add global expo-cli
-   Create an account and log in at https://expo.dev/
-   Follow expo CLI's instructions
-   Install the [Expo Go](https://expo.dev/client) app on your phone for testing
-   Install [Android Studio](https://developer.android.com/studio) to use Android Emulator or [Xcode](https://apps.apple.com/de/app/xcode/id497799835?mt=12) for to use iOS Simulator for testing
-   Start the project: npx expo start
-   Scan the QR code provided in your terminal

### Firebase/ Firestore

-   Sign in at Google Firebase
-   Create a new project
-   Inside the project, create a Firestore Database
-   At 'Settings' -> 'General' -> 'Your apps' -> 'Firestore for Web' generate your configuration object
-   In the `App.js` file replace the `firebaseConfig` variable with the configuration info from your own Firestore database
-   Run `npx expo install` and then `npx expo start`

## Links

[Project Brief](https://images.careerfoundry.com/public/courses/fullstack-immersion/full-stack-project-briefs/A5-Project-Brief-Mar2023.pdf)

## Web View

![Meet App web view](https://github.com/NeleSchallenberg/chat-app/blob/main/assets/screenshot.png)
