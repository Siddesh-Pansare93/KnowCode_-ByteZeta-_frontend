import { View, Text, Image, ScrollView, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/customButton'
import { Link } from 'expo-router'
import OAuth from '@/components/OAuth'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import Modal from "react-native-modal";


const signin = () => {

  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [verification, setVerification] = React.useState({
    status : 'default' , 
    error : '' , 
    code : ''
  })
  const [form, setForm] = useState({
    name: "",
    email: '',
    password: '',

  })

// Handle submission of sign-up form
const onSignUpPress = async () => {
  if (!isLoaded) return

  // Start sign-up process using email and password provided
  try {
    await signUp.create({
      emailAddress : form.email,
      password:form.password,
    })

    // Send user an email with verification code
    await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

    // Set 'pendingVerification' to true to display second form
    // and capture OTP code
    // setPendingVerification(true)
    setVerification({
      ...verification , 
      status : 'pending'
    })
  } catch (err : any ) {
    console.log(err)
    Alert.alert("Error : " , err.errors[0].message)
  }
}

// Handle submission of verification form
const onVerifyPress = async () => {
  if (!isLoaded) return

  try {
    // Use the code the user provided to attempt verification
    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code : verification.code,
    })

    console.log(signUpAttempt.status)
    // If verification was completed, set the session to active
    // and redirect the user
    if (signUpAttempt.status === 'complete') {
      //TODO : Create a User in database

      await setActive({ session: signUpAttempt.createdSessionId })
      setVerification({
        ...verification ,
        status : 'success'
      })
    } else {
      // If the status is not complete, check why. User may need to
      // complete further steps.
        setVerification({
          ...verification ,
          status : 'failed',
          error : 'Verification Falied'
        })
    }
  } catch (err:any) {
    setVerification({
      ...verification ,
      status : 'failed',
      error : err.errors[0].longmessage
    })
    console.log(err)
    // Alert.alert("Error : " , err.erros[0].message)
  }
}




  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>

        <View className=' w-full h-[250px] '>
          <Image
            source={images.authImage}
            className=' w-full h-full object-cover z-0'
          />
          <Text className='text-2xl font-JakartaSemiBold absolute bottom-5 left-5 '>Create Your Account</Text>
        </View>

        <View className='p-5'>

        <InputField
            label="Name"
            icon={icons.person}
            placeholder='Enter your Name'
            value={form.name}
            onChangeText={(value) => { setForm({ ...form, name: value }) }}
          />

          <InputField
            label="Email"
            icon={icons.email}
            placeholder='Enter your Email'
            value={form.email}
            onChangeText={(value) => { setForm({ ...form, email: value }) }}
          />

         


          <InputField
            label="PassWord"
            icon={icons.lock}
            placeholder='Enter your password'
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => { setForm({ ...form, password: value }) }}
          />

          <View className='flex  justify-center w-full  items-center'>
            <CustomButton
              title="Sign Up"
              onPress={onSignUpPress}
              className="mt-6 w-11/12"
            />

            <OAuth/>
            <Link
              href="/signin"
              className='mt-10 text-lg text-center text-general-200 '
            >
              <Text className=''>Already have an account?  </Text>
              <Text className='text-primary-500 font-semibold '>Sign In</Text>
            </Link>
          </View>
        </View>

      </View>

    <Modal isVisible={verification.status === 'success'}>
      <View className='min-h-[250px] bg-white rounded-2xl px-7 py-9 flex items-center'>
        <Image 
          source ={images.check}
          className="w-30 h-30 mx-auto mb-5"
        /> 
        <Text className='text-3xl font-JakartaBold text-center'>Verified</Text>
        <Text className='text-base text-center text-gray-400 mb-6'>Your account has been successfully verified</Text>
        <CustomButton 
        title="Continue"
        bgVariant='success'
        onPress={() => { router.push('/(boarding)/(tabs)/UserDataform') }}
        />
      </View>
    </Modal>


      <Modal 
      isVisible={verification.status === 'pending'}
      onModalHide={()=> setVerification({...verification , status : 'success'})}
      >
        <View className='min-h-[300px] bg-white rounded-2xl p-8 '>
            <Text className='text-3xl font-JakartaBold'> Verification </Text>
            <Text className='text-base font-Jakarta text-gray-400 mb-6'>We've send the verification code to {form.email} </Text>

            <InputField 
              label='Code' 
              value={verification.code}
              onChangeText={(code) => setVerification({...verification , code})}
              icon={icons.lock}
              keyboardType='numeric'
              placeholder='enter code here'
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton 
              title='Verify Email'
              bgVariant='success'
              onPress={() => { onVerifyPress() }}
              className='mt-10'
            />
        </View>
        
      </Modal>
    </ScrollView>
  )
}

export default signin