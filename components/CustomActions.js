import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

// Import function to fetch action sheet
import { useActionSheet } from '@expo/react-native-action-sheet';

// Import location API
import * as Location from 'expo-location';

// Import image picker package
import * as ImagePicker from 'expo-image-picker';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CustomActions = ({
	wrapperStyle,
	iconTextStyle,
	onSend,
	storage,
	userID,
}) => {
	const actionSheet = useActionSheet();
	const onActionPress = () => {
		// Define array with actions
		const options = [
			'Choose From Library',
			'Take Picture',
			'Send Location',
			'Cancel',
		];

		// Create cancel button
		const cancelButtonIndex = options.length - 1;

		// Add functions to action options
		actionSheet.showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
			},
			async (buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						pickImage();
						return;
					case 1:
						takePhoto();
						return;
					case 2:
						getLocation();
					default:
				}
			}
		);

		// Request permission to access location
		const getLocation = async () => {
			let permissions =
				await Location.requestForegroundPermissionsAsync();
			if (permissions?.granted) {
				const location = await Location.getCurrentPositionAsync({});
				if (location) {
					onSend({
						location: {
							longitude: location.coords.longitude,
							latitude: location.coords.latitude,
						},
					});
				} else Alert.alert('Error occurred while fetching location');
			} else Alert.alert("Permissions haven't been granted.");
		};

		// Upload and send image
		const uploadAndSendImage = async (imageURI) => {
			const uniqueRefString = generateReference(imageURI);
			const newUploadRef = ref(storage, uniqueRefString);
			const response = await fetch(imageURI);
			const blob = await response.blob();
			uploadBytes(newUploadRef, blob).then(async (snapshot) => {
				const imageURL = await getDownloadURL(snapshot.ref);
				onSend({ image: imageURL });
			});
		};

		// Create function to access media library
		const pickImage = async () => {
			let permissions =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (permissions?.granted) {
				let result = await ImagePicker.launchImageLibraryAsync();
				if (!result.canceled)
					await uploadAndSendImage(result.assets[0].uri);
				else Alert.alert("Permissions haven't been granted.");
			}
		};

		// Create function to access camera
		const takePhoto = async () => {
			let permissions = await ImagePicker.requestCameraPermissionsAsync();
			if (permissions?.granted) {
				let result = await ImagePicker.launchCameraAsync();
				if (!result.canceled)
					await uploadAndSendImage(result.assets[0].uri);
				else Alert.alert("Permissions haven't been granted.");
			}
		};

		// Generate unique reference string for image
		const generateReference = (uri) => {
			const timeStamp = new Date().getTime();
			const imageName = uri.split('/')[uri.split('/').length - 1];
			return `${userID}-${timeStamp}-${imageName}`;
		};
	};

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onActionPress}
			accessibilityLabel='Show actions'
			accessibilityHint='Shows you custom actions to send location, take picture or chose image from library'
			accessibilityRole='button'>
			<View style={[styles.wrapper, wrapperStyle]}>
				<Text style={[styles.iconText, iconTextStyle]}>+</Text>
			</View>
		</TouchableOpacity>
	);
};

/* ---------- STYLING ---------- */
const styles = StyleSheet.create({
	container: {
		width: 26,
		height: 26,
		marginLeft: 10,
		marginBottom: 10,
	},
	wrapper: {
		borderRadius: 13,
		borderColor: '#b2b2b2',
		borderWidth: 2,
		flex: 1,
	},
	iconText: {
		color: '#b2b2b2',
		fontWeight: 'bold',
		fontSize: 15,
		backgroundColor: 'transparent',
		textAlign: 'center',
		justifyContent: 'center',
	},
});

export default CustomActions;
