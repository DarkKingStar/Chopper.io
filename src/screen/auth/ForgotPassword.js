import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../../component/Button'
import React from 'react'
import { Images } from '../../constants/image'
import { Colors } from '../../constants/colors'
import { TextInput } from 'react-native-gesture-handler'
import GoBackButton from '../../component/GoBackButton'

const ForgotPassword = ({navigation}) => {
  return (
    <View style={{ flex:1}}>
      <GoBackButton navigation={navigation}/>
      <Image
            style={{
              width:180,
              height:150,
              marginTop: 50,
              alignSelf: 'center',
            }}
            source={Images.brandImg}
        />
        <Image
          style={{
            width:200,
            height:40,
            marginBottom: 50,
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
          fontWeight: '700',
        }}>Reset Password</Text>
        <TextInput style={styles.input} 
        placeholder='Enter Email'
        placeholderTextColor= {Colors.grey}
        />
        <Button
        title='Send Email'
        buttonStyle={styles.ForgotPasswordbtnStyle}
        textStyle={styles.btntextStyle}
        onClick={()=>navigation.navigate('TabNavigation')}/>
      </View>
      </View>
    </View>
  )
}
export default ForgotPassword;
const styles = StyleSheet.create({
  ForgotPasswordbtnStyle:{
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