import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Button from '../../component/Button'
import React, { useEffect, useState } from 'react'
import { Images } from '../../constants/image'
import { Colors } from '../../constants/colors'
import { TextInput } from 'react-native-gesture-handler'
import GoBackButton from '../../component/GoBackButton'
import normalize from '../../utils/helpers/normalize'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest, signupRequest } from '../../redux/reducer/AuthReducer'

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  useEffect(() => {
    if(AuthReducer?.status === 'Auth/signupSuccess'){
      handleLogin();
    }
  },[AuthReducer?.status])

  const handleLogin = () =>{
    dispatch(loginRequest({
      email: email,
      password: password,
    }))
  }
  const handleSignUp = () =>{
    console.log("sign up cred data=========>", email, password, name);
    dispatch(signupRequest({
      name: name,
      email: email,
      password: password,
    }));
  }
  return (
    <View style={{flex:1}}>
      <GoBackButton navigation={navigation}/>
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
          fontSize: 28,
          marginLeft:20,
          marginBottom: 20,
        }}>Sign Up</Text>
        <TextInput style={styles.input} 
        placeholder='Enter Name'
        value={name}
        onChange={(e) => setName(e.nativeEvent.text)}
        placeholderTextColor= {Colors.grey}
        />
        <TextInput style={styles.input} 
        placeholder='Enter Email'
        value={email}
        onChange={(e)=>setEmail(e.nativeEvent.text)}
        placeholderTextColor= {Colors.grey}
        />
        <TextInput style={styles.input}
        placeholder='Enter Password'
        value={password}
        onChange={(e)=>setPassword(e.nativeEvent.text)}
        placeholderTextColor={Colors.grey}
        />
        <Button
        title='Sign In'
        buttonStyle={styles.SignUpbtnStyle}
        textStyle={styles.btntextStyle}
        onClick={()=>handleSignUp()}/>
      </View>
      </View>
    </View>
  )
}
export default SignUp;
const styles = StyleSheet.create({
  SignUpbtnStyle:{
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