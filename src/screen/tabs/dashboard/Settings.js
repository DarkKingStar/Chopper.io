import { SafeAreaView, StyleSheet,Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants/colors'
import { Icons } from '../../../constants/icons'
import normalize from '../../../utils/helpers/normalize'
import { FlatList } from 'react-native-gesture-handler'
import NavigationGoBack from '../../../component/NavigationGoBack'

const Options=[
    {
        label:'Account',
        route:'Profile',
        icons: Icons.user,
    },
    {
        label:'Contact Us',
        route:'ContactUs',
        icons: Icons.envlope,
    },
    {
        label:'Rate Us',
        route:'RateUs',
        icons: Icons.rating,
    },
    {
        label:'Help',
        route:'Help',
        icons: Icons.support,
    },
    {
        label:'About',
        route:'About',
        icons: Icons.info,
    },
    {
        label:'Privacy Policy',
        route:'PrivacyPolicy',
        icons: Icons.insurance,
    }
]


const Settings = ({navigation}) => {



    const renderItem = ({item}) =>(
        <TouchableOpacity onPress={() => navigation.navigate(item.route)} style={{flexDirection:'row',alignItems:'center',padding:normalize(15),paddingLeft: normalize(20)}}>
            <Image style={{width:normalize(12),height:normalize(12),marginRight:normalize(10)}} source={item.icons}/>
            <Text style={{color:Colors.white,fontSize:normalize(12)}}>{item.label}</Text>
        </TouchableOpacity>
    )
  return (
    <SafeAreaView style={{ flex: 1}}>        
        <NavigationGoBack navigation={navigation} pagename={"Settings"}/>
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

export default Settings

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:126,
    }
})