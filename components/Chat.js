import { useState, useEffect } from 'react';
// Import react native components
import {
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
// Import Gifted Chat library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// Import firebase functions
import {
	collection,
	onSnapshot,
	query,
	where,
	orderBy,
	addDoc,
} from 'firebase/firestore';

// Create chat screen
const Chat = ({ route, navigation, db }) => {
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

	// useEffect(() => {
	// 	navigation.setOptions({ title: name });
	// 	const q = query(
	// 		collection(db, 'messages'),
	// 		orderBy('createdAt', 'desc')
	// 	);
	// 	const unsubMessages = onSnapshot(q, (docs) => {
	// 		let newMessages = [];
	// 		docs.forEach((doc) => {
	// 			newMessages.push({
	// 				id: doc.id,
	// 				...doc.data(),
	// 				createdAt: new Date(doc.data().createdAt.toMillis()),
	// 			});
	// 		});
	// 		setMessages(newMessages);
	// 	});
	// 	return () => {
	// 		if (unsubMessages) unsubMessages();
	// 	};
	// }, []);

	useEffect(() => {
		// Display username in navigation header
		navigation.setOptions({ title: name });

		// Create listener on query that targets messages collection
		const q = query(
			collection(db, 'messages'),
			orderBy('createdAt', 'desc')
		);
		const unsubChat = onSnapshot(q, (documentsSnapshot) => {
			let newMessages = [];
			documentsSnapshot.forEach((doc) => {
				newMessages.push({
					id: doc.id,
					...doc.data(),
					createdAt: new Date(doc.data().createdAt.toMillis()),
				});
			});
			setMessages(newMessages);
		});

		// Clean up code
		return () => {
			if (unsubChat) unsubChat();
		};

		// Set state with static message
		// setMessages([
		// 	// User message
		// 	{
		// 		_id: 1,
		// 		text: `Hey ${name}, welcome to the chat!`,
		// 		createdAt: new Date(),
		// 		user: {
		// 			_id: 2,
		// 			name: 'React Native',
		// 			avatar: 'https://robohash.org/2a02:3033:404:a55a:295a:3115:d5eb:b603.png',
		// 		},
		// 	},
		// 	// System message
		// 	{
		// 		_id: 2,
		// 		text: `${name} has joined the group`,
		// 		createdAt: new Date(),
		// 		system: true,
		// 	},
		// ]);
	}, []);

	return (
		// Render chat interface

		<View style={styles.container}>
			<GiftedChat
				messages={messages}
				backgroundColor={backgroundColor}
				renderBubble={renderBubble}
				onSend={(messages) => onSend(messages)}
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
