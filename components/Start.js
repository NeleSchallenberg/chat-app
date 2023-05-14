import { useState } from 'react';

// Import react native components
import {
	StyleSheet,
	ImageBackground,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';

// Import authentication functions
import { getAuth, signInAnonymously } from 'firebase/auth';

// Create start screen
const Start = ({ navigation }) => {
	// Initialize Firebase authentication handler
	const auth = getAuth();
	const [name, setName] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');

	// Function to sign in the user anonymously
	const signInUser = () => {
		signInAnonymously(auth)
			.then((result) => {
				navigation.navigate('Chat', {
					userID: result.user.uid,
					name: name,
					backgroundColor: backgroundColor,
				});
				Alert.alert('Signed in successfully!');
			})
			.catch((error) => {
				Alert.alert('Unable to sign in, try later again.');
			});
	};

	return (
		<ImageBackground
			source={require('../assets/background.png')}
			style={{ width: '100%', height: '100%' }}>
			{/* Main view */}
			<View style={styles.container}>
				<Text style={styles.appTitle}>Chat App</Text>

				{/* Login container */}
				<View style={styles.loginContainer}>
					{/* Name input field */}
					<TextInput
						style={styles.textInput}
						value={name}
						onChangeText={setName}
						placeholder='Your name'
					/>

					{/* Background color container */}
					<View style={styles.colorContainer}>
						<Text style={styles.choseColorText}>
							Choose your background color:
						</Text>
						<View style={styles.colorRow}>
							<TouchableOpacity
								style={[
									styles.colorButton,
									{ backgroundColor: '#090C08' },
								]}
								onPress={() => setBackgroundColor('#090C08')}
								accessible={true}
								accessibilityLabel='Select color'
								accessibilityHint='Lets you choose black as a color for your chat background.'
								accessibilityRole='button'></TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.colorButton,
									{ backgroundColor: '#474056' },
								]}
								onPress={() => setBackgroundColor('#474056')}
								accessibilityLabel='Select color'
								accessibilityHint='Lets you choose dark purple as a color for your chat background.'
								accessibilityRole='button'></TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.colorButton,
									{ backgroundColor: '#8A95A5' },
								]}
								onPress={() => setBackgroundColor('#8A95A5')}
								accessibilityLabel='Select color'
								accessibilityHint='Lets you choose pale blue as a color for your chat background.'
								accessibilityRole='button'></TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.colorButton,
									{ backgroundColor: '#B9C6AE' },
								]}
								onPress={() => setBackgroundColor('#B9C6AE')}
								accessibilityLabel='Select color'
								accessibilityHint='Lets you choose sage green as a color for your chat background.'
								accessibilityRole='button'></TouchableOpacity>
						</View>
					</View>

					{/* Login button */}
					<TouchableOpacity
						style={styles.button}
						onPress={signInUser}
						// onPress={() =>
						// 	navigation.navigate('Chat', {
						// 		name: name,
						// 		backgroundColor: backgroundColor,
						// 	})
						// }
						accessibilityLabel='Start chatting'
						accessibilityHint='Lets you enter the chat.'
						accessibilityRole='button'>
						<Text style={styles.buttonText}>Start Chatting</Text>
					</TouchableOpacity>
				</View>
			</View>
			{Platform.OS === 'ios' ? (
				<KeyboardAvoidingView behavior='padding' />
			) : null}
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	// Main view
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	appTitle: {
		fontSize: 45,
		fontWeight: 600,
		color: '#FFFFFF',
		marginTop: '15%',
	},

	// Login container
	loginContainer: {
		justifyContent: 'space-between',
		backgroundColor: '#FFFFFF',
		width: '88%',
		height: '44%',
		marginBottom: '6%',
	},

	// Name input field
	textInput: {
		width: '88%',
		height: 50,
		fontSize: 16,
		fontWeight: '300',
		color: '#757083',
		opacity: 50,
		borderColor: '#757083',
		padding: 15,
		borderWidth: 1,
		borderRadius: 2,
		marginTop: 15,
		alignSelf: 'center',
	},

	// Background color container
	colorContainer: {
		alignSelf: 'center',
		width: '88%',
	},
	choseColorText: {
		fontSize: 16,
		fontWeight: 300,
		color: '#757083',
		opacity: 100,
		marginBottom: 12,
	},
	colorRow: {
		flexDirection: 'row',
	},
	colorButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 20,
	},

	// Login button
	button: {
		width: '88%',
		height: 50,
		backgroundColor: '#757083',
		marginBottom: 15,
		alignSelf: 'center',
		alignItems: 'center',
		borderRadius: 2,
		justifyContent: 'center',
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 600,
	},
});

export default Start;
