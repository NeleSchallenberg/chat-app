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

	useEffect(() => {
		// Display username in navigation header
		navigation.setOptions({ title: name });
		// Set state with static message
		setMessages([
			// User message
			{
				_id: 1,
				text: `Hey ${name}, welcome to the chat!`,
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://robohash.org/2a02:3033:404:a55a:295a:3115:d5eb:b603.png',
				},
			},
			// System message
			{
				_id: 2,
				text: `${name} has joined the group`,
				createdAt: new Date(),
				system: true,
			},
		]);
	}, []);

	return (
		// Render chat interface

		<View style={styles.container}>
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: 1,
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
		// justifyContent: 'center',
		// alignItems: 'center',
	},

	// Welcome message
	welcomeMessage: {
		fontSize: 40,
		fontWeight: 600,
		color: 'white',
	},
});

export default Chat;
