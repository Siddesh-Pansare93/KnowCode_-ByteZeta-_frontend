import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ImageScanner from '@/components/ImageScanner'
import { registerUser } from "@/api"


const home = () => {
  // console.log(state)
  const age = useSelector((state : any ) => state.user.userData.age)
  console.log(age)

  useEffect(()=>{

    const fetchData = async() => {
      const response = await registerUser();
      console.log(response);
    }
    
    fetchData()
  } , [])
  return (
    <View>
      <Text>home</Text>
      <Text>{age}</Text>
      <ImageScanner />
    </View>
  )
}

export default home