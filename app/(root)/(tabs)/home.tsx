import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import ImageScanner from '@/components/ImageScanner'

const home = () => {
  // console.log(state)
  const age = useSelector((state : any ) => state.user.userData.age)
  console.log(age)
  return (
    <View>
      <Text>home</Text>
      <Text>{age}</Text>
      <ImageScanner />
    </View>
  )
}

export default home