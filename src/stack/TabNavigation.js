import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../constants/colors';
import { Image, Text, View } from 'react-native';
import Home from '../screen/tabs/dashboard/Home';
import Search from '../screen/tabs/search/Search';
import normalize from '../utils/helpers/normalize';
import { Icons } from '../constants/icons';
import Archeive from '../screen/tabs/archieve/Archieve';
import ListHome from '../screen/tabs/dashboard/ListHome';
import PlayTab from '../component/PlayTab';
import Account from '../screen/tabs/dashboard/Account';
import Settings from '../screen/tabs/dashboard/Settings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const fadeAnimation = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const fadeAnimation2 = ({ focused, state, routes }) => ({
  tabBarStyle: {
    opacity: (focused|| state|| routes) ? 1 : 0.5,
    
  },
});



const TabNavigation = () => {
  const Tabs = [HomeScreen, SearchScreen, ArchieveScreen];
  const Title = ['Home', 'Search', 'Achieve'];
  const Icon = [
    {
      default:Icons.home,
      active:Icons.homeActive,
    },
    {
      default:Icons.search,
      active:Icons.searchActive,
    },
    {
      default:Icons.box,
      active:Icons.boxActive,
    },
    {
      default:Icons.user,
      active:Icons.userActive,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
    <PlayTab/>
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        backgroundColor: 'black',
        position: 'absolute',
        paddingTop: 3,
        height: 53,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth:0
      },
      tabBarStyleInterpolator: fadeAnimation2,
      
    }}
>
  {Tabs.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item}
            options={{
              tabBarIcon: ({focused, size}) => (
                <Image
                source={focused?Icon[index].active:Icon[index].default}
                style={{width:size, height: size}}/>
              ),
              tabBarLabel: ({focused})=>(
                <Text 
                style={{
                  color: focused?Colors.red:Colors.grey,
                  fontWeight: '900',
                  fontSize: normalize(8),
                  marginBottom: 2,
                  textTransform: 'uppercase'
                }}>
                  {Title[index]}
                </Text>
              )
            }}
          />
        );
      })}
    </Tab.Navigator>
    </View>
  );
}

export default TabNavigation;

const HomeScreenStack = {
  Home: Home,
  List: ListHome,
  Profile: Account,
  Settings: Settings,
}
const HomeScreen = () =>{
 return(
  <TabStackScreen initialRouteName={'Home'} screenStack={HomeScreenStack}/>
 )
}

const SearchScreenStack= {
  Search: Search
}
const SearchScreen = () =>{
  return(
    <TabStackScreen initialRouteName={'Search'} screenStack={SearchScreenStack}/>
  )
}

const ArchieveScreenStack = {
  Archieve:Archeive
}
const ArchieveScreen = () =>{
  return(
    <TabStackScreen initialRouteName={'Archieve'} screenStack={ArchieveScreenStack}/>
  )
}


const TabStackScreen = ({initialRouteName, screenStack}) =>{
  return(
    <Stack.Navigator
      screenOptions={{headerShown: false,
        cardStyle: { backgroundColor: Colors.black },
        cardStyleInterpolator: fadeAnimation,
      }}
      initialRouteName={initialRouteName}>
      {Object.entries({
        ...screenStack,
      }).map(([name, component], index) => {
        return <Stack.Screen key={index} name={name} component={component} />;
      })}
    </Stack.Navigator>
  )
}