import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Colors } from '../constants/colors';
import normalize from '../utils/helpers/normalize';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const HorizontalFlatListLoader = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return(
            <View style={styles.item} key={item}>
                <ShimmerPlaceholder
                    style={styles.poster}
                    shimmerColors={['#222222', '#333333', '#222222']}
                />
                <ShimmerPlaceholder
                    style={styles.itemname}
                    shimmerColors={['#222222', '#333333', '#222222']}
                />
                <ShimmerPlaceholder
                    style={styles.itemSE}
                    shimmerColors={['#222222', '#333333', '#222222']}                    
                />
            </View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    backgroundColor: Colors.black,
    alignItems:'center',
    borderWidth: normalize(0.45),
    borderRadius: normalize(5),
    width: normalize(105),
    borderColor: Colors.darkGrey,
    marginHorizontal: normalize(3),
    paddingBottom: normalize(10)
  },
  poster:{
    height:normalize(135),
    width:"100%",
    borderTopLeftRadius:normalize(5),
    borderTopRightRadius:normalize(5)
  },
  itemname:{
    textAlign:'center',
    fontSize: normalize(11),
    width:"65%",
    fontWeight: '700',
    marginTop: normalize(3),
    color:Colors.white,
  },
  itemSE:{
    fontSize: normalize(10),
    marginTop: normalize(3),
    textAlign:'center',
    width:"45%",
    fontWeight: '900',
    color: Colors.yellow
  }
});

export default HorizontalFlatListLoader;
