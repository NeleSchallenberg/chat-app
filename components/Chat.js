import { useState, useEffect } from 'react';
// Import react native components
import { StyleSheet, View, Text } from 'react-native';
// Import Gifted Chat library
import { GiftedChat } from 'react-native-gifted-chat';

// Create chat screen
const Chat = ({ route, navigation }) => {
	const { name, backgroundColor } = route.params;
	// Initialize messages state
	const [messages, setMessages] = useState([]);
	// Call function when user sends message
	const onSend = (newMessages) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, newMessages)
		);
	};

	useEffect(() => {
		// Display username in navigation header
		navigation.setOptions({ title: name });
		// Set state with static message
		setMessages([
			{
				_id: 1,
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
		]);
	}, []);

	return (
		// Render chat interface
		<GiftedChat
			messages={messages}
			onSend={(messages) => onSend(messages)}
			user={{
				_id: 1,
			}}
		/>
	);
};

const styles = StyleSheet.create({
	// Main view
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	// Welcome message
	welcomeMessage: {
		fontSize: 40,
		fontWeight: 600,
		color: 'white',
	},
});

export default Chat;
