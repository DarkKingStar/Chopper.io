import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Colors } from '../constants/colors';

export default function Paginator({data, scrollX, viewstyle}) {
  const {width} = useWindowDimensions();

  return (
    <View style={[viewstyle, styles.conatiner]}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [80, 130, 80],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1, 0.8],
          extrapolate: 'clamp',
        });

        const bgColor = scrollX.interpolate({
          inputRange,
          outputRange: [Colors.maroon, Colors.red, Colors.maroon],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
                backgroundColor: bgColor,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
  },
  dot: {
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
