import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import normalize from '../../../utils/helpers/normalize'
import { Icons } from '../../../constants/icons'
import { Colors } from '../../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest, refreshTokenRequest } from '../../../redux/reducer/AuthReducer'
import {useIsFocused} from '@react-navigation/native';
import { userInfoRequest } from '../../../redux/reducer/UserReducer'
const Options=[
  {
    label:'Logout',
    icons: Icons.logout,
    action: "logout",
  }
]


const Account = ({navigation}) => {
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.AuthReducer);
  const userReducer  = useSelector(state => state.UserReducer);
  const isFocused =  useIsFocused();

  useEffect(()=>{
    if(userReducer?.status==="User/userInfoFailure" && authReducer?.status!=="Auth/refreshTokenFailure"){
       dispatch(refreshTokenRequest());
    }
  },[userReducer?.status]);

  useEffect(()=>{
    if(isFocused){
        dispatch(userInfoRequest());
    }
  },[isFocused]);
  const renderItem = ({item}) =>(
    <TouchableOpacity 
    onPress={()=>item.action==="logout"? dispatch(logoutRequest()):item.action}
    style={{flexDirection:'row',alignItems:'center',padding:normalize(15),paddingLeft: normalize(20)}}>
        <Image style={{width:normalize(12),height:normalize(12),marginRight:normalize(10)}} source={item.icons}/>
        <Text style={{color:Colors.white,fontSize:normalize(12)}}>{item.label}</Text>
    </TouchableOpacity>
)
  return (
    <SafeAreaView style={{ flex: 1}}>        
        <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={{flexDirection:'row',alignItems:'center', paddingVertical:normalize(15)}}>
            <Image source={Icons.arrowBack} style={{width:normalize(15),height:normalize(15), marginHorizontal:normalize(10)}}/>
            <Text style={{fontSize:normalize(15),color:Colors.white,fontWeight:'600'}}>User Profile</Text>
        </TouchableOpacity>
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