import { View, Text } from 'react-native'
<<<<<<< HEAD
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ImageScanner from '@/components/ImageScanner'
import { registerUser } from "@/api"

=======
import React from 'react'
import { useSelector } from 'react-redux'
import ImageScanner from '@/components/ImageScanner'
>>>>>>> 289325c (Initial setup for app)

const home = () => {
  // console.log(state)
  const age = useSelector((state : any ) => state.user.userData.age)
  console.log(age)
<<<<<<< HEAD

  useEffect(()=>{

    const fetchData = async() => {
      const response = await registerUser();
      console.log(response);
    }
    
    fetchData()
  } , [])
=======
>>>>>>> 289325c (Initial setup for app)
  return (
    <View>
      <Text>home</Text>
      <Text>{age}</Text>
      <ImageScanner />
    </View>
  )
}

export default home