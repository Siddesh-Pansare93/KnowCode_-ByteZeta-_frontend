import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '@/store/features/userDataSlice';

const UserDetailsForm = () => {

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    gender: '',
    medicalHistory: '',
    goals: '',
  });

  const genderOptions = ['Male', 'Female', 'Other'];

interface FormData {
    age: string;
    weight: string;
    gender: string;
    medicalHistory: string;
    goals: string;
}

interface HandleInputChange {
    (key: keyof FormData, value: string): void;
}

const handleInputChange: HandleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
};

  const handleSubmit = () => {

    alert(`User Data: ${JSON.stringify(formData, null, 2)}`);
    dispatch(setUserDetails(formData));
    router.push('/(root)/(tabs)/home')
  };

  return (
  
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900 px-4 py-6 ">
      <Text className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
        Personalize Your Diet Plan
      </Text>

      {/* Age Input */}
      <View className="mb-4">
        <Text className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Age
        </Text>
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-200"
          placeholder="Enter your age"
          placeholderTextColor="#A1A1A1"
          keyboardType="numeric"
          value={formData.age}
          onChangeText={(text) => handleInputChange('age', text)}
        />
      </View>

      {/* Weight Input */}
      <View className="mb-4">
        <Text className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Weight (kg)
        </Text>
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-200"
          placeholder="Enter your weight"
          placeholderTextColor="#A1A1A1"
          keyboardType="numeric"
          value={formData.weight}
          onChangeText={(text) => handleInputChange('weight', text)}
        />
      </View>

      {/* Gender Selector */}
      <View className="mb-4">
        <Text className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Gender
        </Text>
        <View className="flex-row flex-wrap">
          {genderOptions.map((gender) => (
            <TouchableOpacity
              key={gender}
              className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
                formData.gender === gender
                  ? 'bg-indigo-500'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
              onPress={() => handleInputChange('gender', gender)}
            >
              <Text
                className={`text-center font-medium ${
                  formData.gender === gender ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Medical History Input */}
      <View className="mb-4">
        <Text className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Medical History
        </Text>
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-200"
          placeholder="Enter your medical history"
          placeholderTextColor="#A1A1A1"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={formData.medicalHistory}
          onChangeText={(text) => handleInputChange('medicalHistory', text)}
        />
      </View>

      {/* Goals Input */}
      <View className="mb-4">
        <Text className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Goals
        </Text>
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-200"
          placeholder="Enter your fitness or health goals"
          placeholderTextColor="#A1A1A1"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={formData.goals}
          onChangeText={(text) => handleInputChange('goals', text)}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className={`mt-6 bg-indigo-500 py-4 rounded-lg shadow-lg ${
          !formData.age || !formData.weight || !formData.gender
            ? 'opacity-50'
            : ''
        }`}
        disabled={!formData.age || !formData.weight || !formData.gender}
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-bold text-lg">
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
    
  );
};

export default UserDetailsForm;


