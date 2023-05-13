import { useEffect } from 'react';
// Import react native components
import { StyleSheet, View, Text } from 'react-native';

// Create chat screen
const Chat = ({ route, navigation }) => {
	const { name, backgroundColor } = route.params;

	// Display username in navigation header
	useEffect(() => {
		navigation.setOptions({ title: name });
	}, []);

	return (
		<View style={[styles.container, { backgroundColor: backgroundColor }]}>
			<Text style={styles.welcomeMessage}>Welcome!</Text>
		</View>
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
