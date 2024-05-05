import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import { Colors } from '../constants/colors';
import normalize from '../utils/helpers/normalize';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);


const AnimeDetailsLoader = () => {
  return (
    <>
          <ShimmerPlaceholder
          style={styles.poster}
          shimmerColors={['#222222', '#333333', '#222222']}
          />
          <ShimmerPlaceholder
            style={styles.itemname}
            shimmerColors={['#222222', '#333333', '#222222']}
          />
          <ShimmerPlaceholder
            style={[styles.desc,{width:"50%",marginBottom:normalize(10)}]}
            shimmerColors={['#222222', '#333333', '#222222']}
          />
          <ShimmerPlaceholder
            style={[styles.desc,{width:"50%",marginBottom:normalize(10)}]}
            shimmerColors={['#222222', '#333333', '#222222']}
          />
          <ShimmerPlaceholder
            style={[styles.desc,{width:"90%"}]}
            shimmerColors={['#222222', '#333333', '#222222']}
          />
          <ShimmerPlaceholder
            style={[styles.desc,{width:"90%"}]}
            shimmerColors={['#222222', '#333333', '#222222']}
          />
          <ShimmerPlaceholder
            style={[styles.desc,{width:"70%"}]}
            shimmerColors={['#222222', '#333333', '#222222']}
          />
          <ShimmerPlaceholder
            style={[styles.desc,{width:"50%",marginTop: normalize(10) ,marginVertical:normalize(10)}]}
            shimmerColors={['#222222', '#333333', '#222222']}
          />
          {[1,2].map((item,index) => (
            <View key={index}>
              <View style={{flexDirection:'row', alignItems:'center',alignSelf:'center'}}>
                {[1,2,3,4].map((item,index) => (
                  <ShimmerPlaceholder key={index}
                    style={styles.button}
                    shimmerColors={['#222222', '#333333', '#222222']}
                  />
                ))}
              </View>
            </View>
          ))}
        </>
  )
}

export default AnimeDetailsLoader

const styles = StyleSheet.create({
    poster:{
      height:normalize(300),
      width:"80%",
      alignSelf: 'center',
      borderTopLeftRadius:normalize(5),
      borderTopRightRadius:normalize(5)
    },
    itemname:{
      textAlign:'center',
      fontSize: normalize(11),
      marginVertical: normalize(10),
      alignSelf: 'center',
      width:"80%",
      fontWeight: '700',
      color:Colors.white,
    },
    button:{
      width: normalize(65),
      height: normalize(30),
      marginHorizontal: normalize(5),
      marginBottom: normalize(10),
    },
    desc:{
      fontSize: normalize(10),
      alignSelf: 'center',
      textAlign:'center',
      marginTop: normalize(3),
      fontWeight: '900',
      color: Colors.yellow
    }
  })