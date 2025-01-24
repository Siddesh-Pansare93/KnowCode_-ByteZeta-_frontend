import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageScanner = () => {
  const [image, setImage] = useState<string | null>(null);

  // Request permission and handle image selection
  const pickImage = async (source: 'camera' | 'gallery') => {
    // Request necessary permissions
    const permissionResult =
      source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', `You need to grant ${source} access to use this feature.`);
      return;
    }

    // Open camera or gallery
    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Specify media type for camera
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Specify media type for gallery
            quality: 1,
          });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Save the selected image's URI
    }
  };

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center p-4">
      <Text className="text-xl font-bold text-gray-800 mb-4">Image Scanner</Text>

      {/* Buttons for selecting image */}
      <View className="flex-row space-x-4 mb-6">
        <TouchableOpacity
          className="bg-green-500 py-3 px-6 rounded-lg"
          onPress={() => pickImage('gallery')}
        >
          <Text className="text-white font-medium text-base">Select from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 py-3 px-6 rounded-lg"
          onPress={() => pickImage('camera')}
        >
          <Text className="text-white font-medium text-base">Take a Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Display selected image */}
      {image && (
        <View className="items-center">
          <Image
            source={{ uri: image }}
            className="w-48 h-48 rounded-lg mb-4"
          />
          <TouchableOpacity
            className="bg-indigo-500 py-3 px-6 rounded-lg"
            onPress={() => Alert.alert('Image Ready', 'You can now upload this image!')}
          >
            <Text className="text-white font-medium text-base">Upload Image</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageScanner;
