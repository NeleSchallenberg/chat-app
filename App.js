// Initialise connection for firestore
import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	disableNetwork,
	enableNetwork,
} from 'firebase/firestore';

// Import react navigation library
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import start and chat screen
import Start from './components/Start';
import Chat from './components/Chat';

// Import function to determine network status
import { useNetInfo } from '@react-native-community/netinfo';

import { useEffect } from 'react';
import { Alert } from 'react-native';

import { getStorage } from 'firebase/storage';

// Export root component
const App = () => {
	// Firebase configuration
	const firebaseConfig = {
		apiKey: 'AIzaSyDA463iEoP6Vz9G11ZHUcaQK6cYagbWPxQ',
		authDomain: 'chat-app-6d02d.firebaseapp.com',
		projectId: 'chat-app-6d02d',
		storageBucket: 'chat-app-6d02d.appspot.com',
		messagingSenderId: '155429726943',
		appId: '1:155429726943:web:cffdbb52ad4bc2ed81176a',
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	// Initialize Cloud Firestore and get reference to service
	const db = getFirestore(app);

	// Initialize storage handler
	const storage = getStorage(app);

	// Create navigator
	const Stack = createNativeStackNavigator();

	// Define new state that represents network connectivity status
	const connectionStatus = useNetInfo();

	// Display alert popup if connection is lost
	useEffect(() => {
		if (connectionStatus.isConnected === false) {
			Alert.alert('Connection Lost!');
			// Disable attempt to reconnect to database
			disableNetwork(db);
		} else if (connectionStatus.isConnected === true) {
			// Re-enable attempt to reconnect to database
			enableNetwork(db);
		}
	}, [connectionStatus.isConnected]);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Start'>
				<Stack.Screen name='Start' component={Start} />
				<Stack.Screen name='Chat'>
					{(props) => (
						<Chat
							db={db}
							storage={storage}
							{...props}
							isConnected={connectionStatus.isConnected}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
