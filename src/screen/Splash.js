import {
    Image,
    Text,
    ImageBackground,
    StatusBar,
    StyleSheet,
  } from 'react-native';
  import React, {useEffect} from 'react';
  import { Images } from '../constants/image';
  import { Icons } from '../constants/icons';
  import normalize from '../utils/helpers/normalize';
  import { Colors } from '../constants/colors';
  import constants from '../constants/constants';
  import { getData } from '../redux/LocalStore';
  import {useDispatch} from 'react-redux';
  import { setStart, setUserToken } from '../redux/reducer/AuthReducer';
  
  const Splash = ({navigation}) => {
    const dispatch = useDispatch();
    useEffect(() => {
      setTimeout(() => {
        getInfo();
      }, 2500);
    }, []);
  
    function getInfo() {
      getData(constants.STARTING, res => {
        if (res !== '') {
          getData(constants.TOKEN, res1 => {
            if (res1 !== '') {
                getData(constants.USER_ID, res3 => {
                  getData(constants.REFRESH_TOKEN,res4 =>{
                    if(res3 !== '' && res4 !== ''){
                      dispatch(
                        setUserToken({
                          token: res1, 
                          user_id: res3,
                          refresh_token: res4,
                          }),
                        );
                      dispatch(setStart(1));
                    }
                    else{
                      dispatch(setStart(1));
                    }
                  })
                });
            } else {
              dispatch(setStart(1));
            }
          });
          
        } else {
          dispatch(setStart(null));
        }
      });
    }
  
    return (
      <ImageBackground source={Images.onbroadBg} style={styles.container}>
      <ImageBackground source={Images.overlayer} style={styles.container}>
      <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'light-content'}
        />
        <Image
          source={Images.brandImg}
          style={styles.logo}
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
        <Text style={styles.title}>Build version 1.0.1.1</Text>
      </ImageBackground>
      </ImageBackground>
    );
  };
  
  export default Splash;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: normalize(160),
      width: normalize(160),
      resizeMode: 'contain',
    },
    title: {
      color: Colors.white,
      fontSize: normalize(14),
      position: 'absolute',
      bottom: normalize(30),
    },
  });
  