import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { ScanningAnimation } from "./ScanningAnimation"; // Ensure this component is implemented
import { useSelector, useDispatch } from "react-redux";
import { setNutrients, resetNutrients } from "../store/features/dailyIntakeSlice"; // Update import
import { AppDispatch, RootState } from "../store/store"; // Make sure to import these from store

const ImageScanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  interface FoodData {
    feedback?: string;
    ingredients?: string[];
    nutritional_facts?: string;
    user_diet?: string;
  }

  const [foodData, setFoodData] = useState<FoodData>({});

  const dispatch = useDispatch();
  // const foodData = useSelector((state: RootState) => state.user.dailyIntake) as {
  //   feedback?: string;
  //   ingredients?: string[];
  //   nutritional_facts?: string;
  //   user_diet?: string;
  // }; // Update to `dailyIntake`
  const userDetails = useSelector((state: RootState) => state.user.userData);
  const userDiet = useSelector((state: RootState) => state.user.diet);

  const pickImage = async (source: string) => {
    const permissionResult =
      source === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", `You need to grant ${source} access to use this feature.`);
      return;
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
        });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeFoodImage = async () => {
    if (!image ) {
      Alert.alert("Error", "Please provide both an image ");
      return;
    }

    setIsAnalyzing(true);
    // dispatch(resetNutrients());  // Reset any previous nutrient data

    try {
      // Convert the URI to a Blob
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const fileBlob = {
        uri: image,
        type: `image/${fileType}`,
        name: `food_image.${fileType}`,
      };

      const formData = new FormData();
      formData.append("image", fileBlob as any);
      formData.append("description", description || "");
      formData.append("user_Details", JSON.stringify(userDetails));
      formData.append("user_Diet", JSON.stringify(userDiet));

      // const response = await fetch("http://192.168.151.2:5000/scan_img", {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // const data = await response.json();  // Parse the JSON response
      // console.log(data);

      // if (data) {
      //   setFoodData(data)
      // }

      const dummyFoodData = {
        ingredients: ["Chicken breast", "Olive oil", "Garlic", "Lemon", "Rosemary", "Salt", "Pepper"],
        nutritional_facts: JSON.stringify({
          "Calcium": 50,
          "Calories": 200,
          "Carbohydrates": 250,
          "Fats": 70,
          "Fiber": 40,
          "Iron": 18,
          "Magnesium": 0.4,
          "Potassium": 0.47,
          "Proteins": 120,
          "Sugars": 50,
          "Vitamin A": 0.0009,
          "Vitamin C": 0.075,
          "Vitamin D": 0.015
        }),
        feedback: "This is a healthy meal, rich in protein and low in carbs. Great choice for muscle building!",
        user_diet: "Based on your diet plan, this meal fits perfectly within your recommended daily intake for protein and fat.",
      };
      console.log(foodData)
      setFoodData(dummyFoodData);

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to analyze the image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };


  const dispatch_NutrientsToStore = () => {
    //  Ensuring nutritional facts are available before dispatching
      if (foodData.nutritional_facts) {
        dispatch(setNutrients( JSON.parse(foodData.nutritional_facts),  // Parse and dispatch only nutrients
        ));
      }
  }

  const resetAll = () => {
    setImage(null);
    setDescription("");
    setFoodData({});
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */} 
      <View className="flex-row items-center p-4 bg-white">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800 ml-4">Image Scanner</Text>
        <TouchableOpacity className="ml-auto">
          <Ionicons name="ellipsis-horizontal" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 p-4">
        {image ? (
          <ScrollView className="flex-1">
            <View className="rounded-xl overflow-hidden shadow-md bg-white mb-4">
              <Image source={{ uri: image }} className="w-full h-64" resizeMode="cover" />
              {isAnalyzing && <ScanningAnimation />}
            </View>
            <TextInput
              placeholder="Enter description (OPTIONAL)"
              value={description}
              onChangeText={setDescription}
              className="border border-gray-300 p-3 rounded-lg mt-4"
            />
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className={`flex-1 py-3 px-6 rounded-lg ${isAnalyzing ? "bg-gray-400" : "bg-green-500"
                  }`}
                onPress={analyzeFoodImage}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text className="text-white font-medium text-center">Analyze</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-3 px-6 bg-red-500 rounded-lg ml-4"
                onPress={resetAll}
              >
                <Text className="text-white font-medium text-center">Reset</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View className="flex-row justify-evenly mt-12">
            <TouchableOpacity
              className="bg-green-500 py-3 px-6 rounded-lg"
              onPress={() => pickImage("gallery")}
            >
              <Text className="text-white font-medium">Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-500 py-3 px-6 rounded-lg"
              onPress={() => pickImage("camera")}
            >
              <Text className="text-white font-medium">Camera</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Display Meal Data */}

        <ScrollView>
          {foodData && foodData.ingredients && (
            <View className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <Text className="text-lg font-bold text-gray-800">Ingredients:</Text>
              <Text className="text-gray-600 mt-2">{foodData.ingredients.join(", ")}</Text>
            </View>
          )}

          {foodData && foodData.nutritional_facts && (
            <View className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <Text className="text-lg font-bold text-gray-800">Nutritional Facts:</Text>
              {/* Render each nutritional fact key-value pair */}
              {Object.entries(JSON.parse(foodData.nutritional_facts)).map(([key, value]) => (
                <Text key={key} className="text-gray-600 mt-2">
                  {key}: {String(value)}
                </Text>
              ))}
            </View>
          )}



          {foodData && foodData.feedback && (
            <View className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <Text className="text-lg font-bold text-gray-800">Feedback:</Text>
              <Text className="text-gray-600 mt-2">{foodData.feedback}</Text>
            </View>
          )}
          {foodData && foodData.user_diet && (
            <View className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <Text className="text-lg font-bold text-gray-800">Final Thoughts:</Text>
              <Text className="text-gray-600 mt-2">{foodData.user_diet}</Text>
            </View>
          )}
        </ScrollView>
        {foodData.nutritional_facts && (
  <View className="w-full h-[120px] flex justify-center items-center bg-white shadow-md rounded-lg mt-6">
    <Text className="text-2xl font-extrabold text-gray-900 mb-4">
      Had You Eaten This?
    </Text>
    <View className="flex flex-row justify-evenly w-full gap-x-6 ">
      <Pressable
        onPress={dispatch_NutrientsToStore}
        className="px-6 py-3 rounded-full bg-green-600 bg-gradient-to-r from-green-400 to-green-600 shadow-lg transform hover:scale-105 active:scale-95"
      >
        <Text className="text-xl font-bold text-white">Yes</Text>
      </Pressable>
      <Pressable
        onPress={resetAll}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-red-400 bg-red-600 shadow-lg transform hover:scale-105 active:scale-95"
      >
        <Text className="text-xl font-bold text-white">No</Text>
      </Pressable>
    </View>
  </View>
)}

      </View>
    </View>
  );
};

export default ImageScanner;
