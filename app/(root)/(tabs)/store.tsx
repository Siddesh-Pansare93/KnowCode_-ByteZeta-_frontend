import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { resetNutrients } from '@/store/features/dailyIntakeSlice'

const store = () => {
  

    const state  = useSelector((state : RootState ) => state.user)
    console.log("store : "  , state)

      // const dialyGoals = useSelector((state : RootState) => state.user.diet.nutrients);
      // console.log(dialyGoals)
    
  return (
    <View>
      {/* {Object.entries(state?.nutrients)?.map(([key , value])=>{
        return(
          <Text key={key}>{key} : {value as string}</Text>

        )
      })} */}
      {/* <Text>{dialyGoals?.Calories}</Text> */}
    </View>
  )
}

export default store