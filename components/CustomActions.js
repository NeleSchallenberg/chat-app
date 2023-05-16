import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

// Import function to fetch action sheet
import { useActionSheet } from '@expo/react-native-action-sheet';

// Import location API
import * as Location from 'expo-location';

// Import image picker package
import * as ImagePicker from 'expo-image-picker';

const CustomActions = ({ wrapperStyle, iconTextStyle }) => {
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
	};

	return (
		<TouchableOpacity style={styles.container} onPress={onActionPress}>
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
