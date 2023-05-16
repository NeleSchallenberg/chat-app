import { useState, useEffect } from 'react';
import CustomActions from './CustomActions';

// Import react native components
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';

// Import Gifted Chat library
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

// Import firebase functions
import {
	collection,
	onSnapshot,
	query,
	orderBy,
	addDoc,
} from 'firebase/firestore';

// Import async storage package
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import MapView component
import MapView from 'react-native-maps';

// Import location API
import * as Location from 'expo-location';

// Create chat screen
const Chat = ({ route, navigation, db, isConnected, storage }) => {
	const { name, backgroundColor } = route.params;
	const { userID } = route.params;

	// Initialize messages state
	const [messages, setMessages] = useState([]);

	// Call function when user sends message
	const onSend = (newMessages) => {
		addDoc(collection(db, 'messages'), newMessages[0]);
	};

	// Create renderBubble function
	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#000',
					},
					left: {
						backgroundColor: '#FFF',
					},
				}}
			/>
		);
	};

	// Declare variable outside useEffect callback function
	let unsubChat;

	useEffect(() => {
		// Display username in navigation header
		navigation.setOptions({ title: name });

		if (isConnected === true) {
			// Avoid registering multiple listeners when useEffect code is re-executed
			if (unsubChat) unsubChat();
			unsubChat = null;

			// Create listener on query that targets messages collection
			const q = query(
				collection(db, 'messages'),
				orderBy('createdAt', 'desc')
			);
			unsubChat = onSnapshot(q, async (documentsSnapshot) => {
				let newMessages = [];
				documentsSnapshot.forEach((doc) => {
					newMessages.push({
						id: doc.id,
						...doc.data(),
						createdAt: new Date(doc.data().createdAt.toMillis()),
					});
				});
				cacheMessages(newMessages);
				setMessages(newMessages);
			});
		} else loadCachedMessages();

		// Clean up code
		return () => {
			if (unsubChat) unsubChat();
		};
	}, [isConnected]);

	// Fetch and cache messages from database
	const cacheMessages = async (MessagesToCache) => {
		try {
			await AsyncStorage.setItem(
				'messages',
				JSON.stringify(MessagesToCache)
			);
		} catch (error) {
			console.log(error.message);
		}
	};

	// Load messages from cache when offline
	const loadCachedMessages = async () => {
		const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
		setMessages(JSON.parse(cachedMessages));
	};

	// Prevent rendering of input toolbar
	const renderInputToolbar = (props) => {
		if (isConnected) return <InputToolbar {...props} />;
		else return null;
	};

	// Create custom actions component
	const renderCustomActions = (props) => {
		return <CustomActions storage={storage} {...props} />;
	};

	// Check if the current message contains location data
	const renderCustomView = (props) => {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<MapView
					style={{
						width: 150,
						height: 100,
						borderRadius: 13,
						margin: 3,
					}}
					region={{
						latitude: currentMessage.location.latitude,
						longitude: currentMessage.location.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			);
		}
		return null;
	};

	return (
		// Render chat interface
		<View style={{ ...styles.container, backgroundColor: backgroundColor }}>
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				renderInputToolbar={renderInputToolbar}
				onSend={(messages) => onSend(messages)}
				renderActions={renderCustomActions}
				renderCustomView={renderCustomView}
				user={{
					_id: userID,
					name: name,
				}}
			/>
			{Platform.OS === 'android' ? (
				<KeyboardAvoidingView behavior='height' />
			) : null}
		</View>
	);
};

/* ---------- STYLING ---------- */
const styles = StyleSheet.create({
	// Main view
	container: {
		flex: 1,
		justifyContent: 'center',
	},

	// Welcome messages
	welcomeMessage: {
		fontSize: 40,
		fontWeight: 600,
		color: 'white',
	},
});

export default Chat;
