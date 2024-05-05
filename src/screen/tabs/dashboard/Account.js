import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import normalize from '../../../utils/helpers/normalize'
import { Icons } from '../../../constants/icons'
import { Colors } from '../../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest, refreshTokenRequest } from '../../../redux/reducer/AuthReducer'
import {useIsFocused} from '@react-navigation/native';
import { userInfoRequest } from '../../../redux/reducer/UserReducer'
import { Images } from '../../../constants/image'
import NavigationGoBack from '../../../component/NavigationGoBack'
const Options=[
  {
    label: 'Edit Profile',
    icons: Icons.edit,
    action: ()=>{},
  },
  {
    label:'Logout',
    icons: Icons.logout,
    action: 'logout',
  },
]



const Account = ({navigation}) => {
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.AuthReducer);
  const userReducer  = useSelector(state => state.UserReducer);
  const isFocused =  useIsFocused();
  const userInfo  = userReducer?.user_details;

  // useEffect(()=>{
  //   if(userReducer?.status==="User/userInfoFailure"){
  //      dispatch(refreshTokenRequest());
  //   }
  // },[userReducer?.status]);

  // useEffect(()=>{
  //   if(authReducer?.status==="Auth/refreshTokenSuccess"){
  //     dispatch(userInfoRequest());
  //   }
  //   if(authReducer?.status==="Auth/refreshTokenFailure"){
  //     dispatch(logoutRequest());
  //   }
  // },[authReducer?.status]);

  useEffect(()=>{
    if(isFocused && authReducer.token !== "guest"){
        dispatch(userInfoRequest());
    }
  },[isFocused]);

  const handleLogout = () =>{
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => dispatch(logoutRequest()),
          style: 'default'
        },
      ],
    );
  }

  const renderItem = ({item}) =>(
    <TouchableOpacity 
    onPress={()=>handleLogout()}
    style={{flexDirection:'row',alignItems:'center',padding:normalize(15),paddingLeft: normalize(20)}}>
        <Image style={{width:normalize(12),height:normalize(12),marginRight:normalize(10)}} source={item.icons}/>
        <Text style={{color:Colors.white,fontSize:normalize(12)}}>{item.label}</Text>
    </TouchableOpacity>
)
  return (
    <SafeAreaView style={{ flex: 1}}>        
        <NavigationGoBack navigation={navigation} pagename={"User Profile"}/>
        <View style={{flexDirection:'coloum',alignItems:'center',justifyContent:  'center'}}>
            <Image source={userInfo?.avatar ? {uri:userInfo?.profile_image} :Images.avatar} 
            style={{width:normalize(60),height:normalize(60), borderRadius: 100}}/>
            <Text style={{color: Colors.red, fontWeight: "400", fontSize: normalize(11), marginVertical: normalize(2.5)}}>{userInfo?.email || "Guest account"}</Text>
            <Text style={{color: Colors.grey, fontSize: normalize(12), fontWeight: "800"}}>{userInfo?.name || "Otaku Sama"}</Text>
        </View>
        <View style={styles.container}>
            <FlatList
                data={Options}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginBottom:126,
}
})