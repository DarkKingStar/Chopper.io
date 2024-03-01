import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Button from '../../component/Button'
import React, { useState } from 'react'
import { Images } from '../../constants/image'
import { Colors } from '../../constants/colors'
import { TextInput } from 'react-native-gesture-handler'
import normalize from '../../utils/helpers/normalize'
import Separator from '../../component/Separator'
import { useDispatch } from 'react-redux'
import { guestLoginRequest, loginRequest, setUserToken } from '../../redux/reducer/AuthReducer'

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email,setEmail] =  useState('');
  const [password,setPassword] =  useState('');


  const handleLoginasUser = () =>{
    dispatch(
      loginRequest({email: email , password: password}),
    )
      
  }
  const handleLoginasGuest = () =>{
    dispatch(
      guestLoginRequest({
        token:'guest',
        user_id:'guest',
        refresh_token:'guest'
      }
      )
    )
  }

  return (
    <View style={{ flex:1}}>
      <Image
            style={{
              width:normalize(150),
              height:normalize(120),
              marginTop: normalize(50),
              alignSelf: 'center',
            }}
            source={Images.brandImg}
        />
        <Image
          style={{
            width:normalize(180),
            height:normalize(35),
            marginBottom: normalize(10),
            alignSelf: 'center',
          }}
          source={Images.headingImg}
        />
      <View style={{flex:1, justifyContent: 'space-between'}}>
        <View>
        <Text style={{
          color: Colors.white,
          fontSize: normalize(12),
          textAlign: 'center',
          marginBottom: normalize(20),
          fontWeight: '700',
        }}>For Better User Experience Please Login</Text>
        <TextInput style={styles.input} 
        placeholder='Enter Email'
        placeholderTextColor= {Colors.grey}
        value={email}
        onChange={(e)=>setEmail(e.nativeEvent.text)}
        />
        <TextInput style={styles.input}
        placeholder='Enter Password'
        placeholderTextColor={Colors.grey}
        value={password}
        onChange={(e)=>setPassword(e.nativeEvent.text)}
        />
        <Button
        title='Login'
        buttonStyle={styles.LoginbtnStyle}
        textStyle={styles.btntextStyle}
        onClick={()=>handleLoginasUser()}/>
        <Button
        title='Forgot Password?'
        textStyle={styles.btntextStyle}
        onClick={()=>navigation.navigate('ForgotPassword')}/>
      </View>
      <Separator/>
      <View>
      <Button 
      title='Create an Account'
      buttonStyle={styles.SignUpbtnStyle}
      textStyle={styles.btntextStyle}
      onClick={()=>navigation.navigate('SignUp')}/>
      <Button
      title='Login as a guest'
      buttonStyle={styles.GuestbtnStyle}
      textStyle={styles.btntextStyle}
      onClick={()=>handleLoginasGuest()}/>
      </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  SignUpbtnStyle:{
    width: '90%',
    height: 50,
    marginVertical: 10,
    borderColor: Colors.red,
    borderWidth: 2,
    borderRadius: 5
},
GuestbtnStyle:{
  width: '90%',
  height: 50,
  marginVertical: 10,
  backgroundColor: Colors.maroon,
  borderRadius: 5
},
LoginbtnStyle:{
  width: '90%',
  height: 50,
  marginVertical: 10,
  backgroundColor: Colors.red,
  borderRadius: 5
},
btntextStyle:{
    color: Colors.white,
    fontSize: 17,
},
input:{
  color: Colors.white,
  alignSelf: 'center',
  marginBottom: 20,
  fontSize: 16,
  width: '90%',
  borderColor: Colors.grey,
  borderWidth: 1.5,
  paddingHorizontal: 20,
  borderRadius: 5,
}
})