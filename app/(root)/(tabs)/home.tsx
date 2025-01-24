import React from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"
import ImageScanner from "@/components/ImageScanner"

const Home = () => {
  const age = useSelector((state: any) => state.user.userData.age)

  return (
    <View className="flex-1 bg-gray-50">
      <ImageScanner />
    </View>
  )
}

export default Home

