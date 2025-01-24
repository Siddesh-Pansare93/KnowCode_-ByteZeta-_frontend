import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { Ionicons } from "@expo/vector-icons"
import { ScanningAnimation } from "./ScanningAnimation"
import { FoodAnalysisDrawer } from "./FoodAnalysisDrawer"

const ImageScanner = () => {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [foodData, setFoodData] = useState<{
    name: string
    description: string
    nutritionalInfo?: string
  } | null>(null)

  const pickImage = async (source: "camera" | "gallery") => {
    const permissionResult =
      source === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", `You need to grant ${source} access to use this feature.`)
      return
    }

    const result =
      source === "camera"
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      analyzeFoodImage(result.assets[0].uri)
    }
  }

  const analyzeFoodImage = async (imageUri: string) => {
    setIsAnalyzing(true)
    setShowDrawer(true)
    setFoodData(null)

    try {
      // Validate if the image exists
      const fileInfo = await FileSystem.getInfoAsync(imageUri)
      if (!fileInfo.exists) {
        throw new Error("File does not exist at the specified URI")
      }

      // Prepare the image for the FormData
      const fileBlob = {
        uri: imageUri,
        type: "image/jpeg", // Update type as needed
        name: "food_image.jpg",
      }

      const formData = new FormData()
      formData.append("image", fileBlob as any) // Cast for TypeScript compatibility

      // POST the image to the backend
      const response = await fetch("http://192.168.151.2:5000/scan_img", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to upload the image")
      }

      const data = await response.json()

      setFoodData({
        name: data.name || "Unknown Food",
        description: data.description || "No description available",
        nutritionalInfo: data.nutritionalInfo || "Nutritional information not available",
      })
    } catch (error) {
      console.error(error)
      Alert.alert("Error", "Failed to analyze the image. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleConsume = () => {
    Alert.alert("Confirmed", "You have confirmed to consume this food!")
    setShowDrawer(false)
    setImage(null)
    setFoodData(null)
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-white">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800 ml-4">Analysis</Text>
        <TouchableOpacity className="ml-auto">
          <Ionicons name="ellipsis-horizontal" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center p-4">
        {image ? (
          <View className="w-full aspect-square relative rounded-2xl overflow-hidden">
            <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
            {isAnalyzing && <ScanningAnimation />}
          </View>
        ) : (
          <View className="flex-row space-x-4">
            <TouchableOpacity className="bg-green-500 py-3 px-6 rounded-lg" onPress={() => pickImage("gallery")}>
              <Text className="text-white font-medium">Select from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-500 py-3 px-6 rounded-lg" onPress={() => pickImage("camera")}>
              <Text className="text-white font-medium">Take a Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Analysis Drawer */}
      <FoodAnalysisDrawer
        isVisible={showDrawer}
        isAnalyzing={isAnalyzing}
        foodData={foodData}
        onConsume={handleConsume}
      />
    </View>
  )
}

export default ImageScanner
