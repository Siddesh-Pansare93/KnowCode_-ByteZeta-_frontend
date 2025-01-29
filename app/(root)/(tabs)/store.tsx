import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { persistor } from '@/store/store';

const StoreScreen = () => {
  const store = useSelector((state : any )=> state.user.dailyIntake)
  console.log("daily Intake : " , store)

  const dispatch = useDispatch();
  const router = useRouter();

  const handleStoreReset =async () => {
    console.log("Resetting store...");
    
    dispatch({ type: 'RESET_STORE' }); // Reset Redux state
    persistor.purge(); // Clear persisted storage
  };

  return (
    <View>
      <Pressable onPress={handleStoreReset}>
        <Text>Click here to Reset Store</Text>
      </Pressable>
    </View>
  );
};

export default StoreScreen;
