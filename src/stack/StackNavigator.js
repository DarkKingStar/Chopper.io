import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from '../screen/auth/Login';
import SignUp from '../screen/auth/SignUp';
import TabNavigation from './TabNavigation';
import OnBoarding from '../screen/OnBoarding';
import ForgotPassword from '../screen/auth/ForgotPassword';
import { Colors } from '../constants/colors';
import { useSelector } from 'react-redux';
import Splash from '../screen/Splash';

const Stack = createStackNavigator();

export default function StackNavigation() {
    const AuthReducer = useSelector(state => state.AuthReducer)
    const OnBoard = {
        OnBoarding: OnBoarding,
    };
    const Auth = {
        Login: Login,
        ForgotPassword: ForgotPassword,
        SignUp: SignUp,
      };
    
      const Main = {
        TabNavigation: TabNavigation,
      };

      // const Screens = {...OnBoard,...Auth,...Main}
      const Screens =
        AuthReducer?.isStart == null
          ? OnBoard
          : (AuthReducer?.token == null 
          ? Auth
          : Main);
      if (AuthReducer.isLoading) {
        return <Splash />;
      } else {
        return (
            <Stack.Navigator
              screenOptions={{headerShown: false, gestureEnabled: false,
                ...TransitionPresets.SlideFromRightIOS,
                cardStyle: { backgroundColor: Colors.black, color: Colors.white }
              }}>
              {Object.entries({
                ...Screens,
              }).map(([name, component], index) => {
                return (
                  <Stack.Screen key={index} name={name} component={component} />
                );
              })}
            </Stack.Navigator>
        );
      }
    };
  