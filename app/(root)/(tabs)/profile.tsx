import React from "react"
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

const menuItems = [
  {
    id: "daily-intake",
    icon: <Ionicons name="calendar-outline" size={24} color="#6B7280" />,
    title: "Daily Intake",
  },
  {
    id: "my-meals",
    icon: <Ionicons name="restaurant-outline" size={24} color="#6B7280" />,
    title: "My Meals",
  },
  {
    id: "nutrition",
    icon: <Ionicons name="document-text-outline" size={24} color="#6B7280" />,
    title: "Nutrition Report",
  },
  {
    id: "favorites",
    icon: <Ionicons name="heart-outline" size={24} color="#6B7280" />,
    title: "Favorites Food",
  },
  {
    id: "logout",
    icon: <MaterialIcons name="logout" size={24} color="#6B7280" />,
    title: "Log out",
  },
]

import { NavigationProp } from '@react-navigation/native';
import { router } from "expo-router";

interface ProfileScreenProps {
  navigation: NavigationProp<any>;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-14 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">My Profile</Text>
        <TouchableOpacity className="p-2">
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="items-center mt-4 mb-8">
          <View className="relative">
            <Image
              source={{
                uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K6BNktdElAeW0kBhSc9gJ0YiWPnvbg.png",
              }}
              className="w-24 h-24 rounded-full bg-gray-200"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-lime-400 rounded-full p-1">
              <Ionicons name="pencil" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-semibold mt-3">Siddesh Pansare</Text>
          <Text className="text-gray-500">@siddheshreact101</Text>
        </View>

        {/* Menu Items */}
        <View className="px-4">
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} className="flex-row items-center py-4 border-b border-gray-100">
              <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">{item.icon}</View>
              <Text className="flex-1 ml-4 text-base text-gray-800">{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View className="flex-row items-center justify-between px-8 py-4 border-t border-gray-100">
        <TouchableOpacity className="items-center">
          <Ionicons name="home-outline" size={24} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="restaurant-outline" size={24} color="#6B7280" />
        </TouchableOpacity>
        <View className="relative -top-5">
          <TouchableOpacity className="w-14 h-14 rounded-full bg-lime-400 items-center justify-center">
            <Ionicons name="add" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="items-center">
          <Ionicons name="stats-chart" size={24} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="person" size={24} color="#000" />
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

