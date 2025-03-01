import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack>
        
        <Stack.Screen name='(tabs)' options={{headerShown : false}} /> 
      </Stack>
    </View>
  );
}
