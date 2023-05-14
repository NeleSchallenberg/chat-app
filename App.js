// Initialise connection for firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Import react navigation library
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import start and chat screen
import Start from './components/Start';
import Chat from './components/Chat';

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

// Create navigator
const Stack = createNativeStackNavigator();

// Export root component
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Start'>
				<Stack.Screen name='Start' component={Start} />
				<Stack.Screen name='Chat'>
					{(props) => <Chat db={db} {...props} />}
				</Stack.Screen>
				{/* <Stack.Screen name='Chat' component={Chat} /> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
