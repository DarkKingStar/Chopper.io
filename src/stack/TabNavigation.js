import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Colors } from '../constants/colors';
import { Text } from 'react-native';
import Home from '../screen/main/dashboard/Home';
import Search from '../screen/main/search/Search';
import ListHome from '../screen/main/list/ListHome';
import AccountOptions from '../screen/main/account/AccountOptions';

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
  const Tabs = [HomeScreen, SearchScreen, ListScreen, AccountScreen];
  const Title = ['Home', 'Search', 'Anime List', 'My Profile'];
  const Icon = [
    'home',
    'search',
    'archive',
    'user-alt'
  ];
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        backgroundColor: Colors.maroon,
        position: 'absolute',
        paddingTop: 3,
        height: 53,
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
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
                <FontAwesome5
                name={Icon[index]}
                size={size}
                color={focused?Colors.red:Colors.grey}/>
              ),
              tabBarLabel: ({focused})=>(
                <Text 
                style={{
                  color: focused?Colors.red:Colors.grey,
                  fontWeight: '900',
                  fontSize: 12,
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
  );
}

export default TabNavigation;

const HomeScreenStack = {
  Home: Home,
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

const ListScreenStack = {
  ListHome:ListHome
}
const ListScreen = () =>{
  return(
    <TabStackScreen initialRouteName={'ListHome'} screenStack={ListScreenStack}/>
  )
}

const AccountScreenStack = {
  AccountOptions: AccountOptions
}
const AccountScreen = () =>{
  return(
    <TabStackScreen initialRouteName={'AccountOptions'} screenStack={AccountScreenStack}/>
  )
}

const TabStackScreen = ({initialRouteName, screenStack}) =>{
  return(
    <Stack.Navigator
      screenOptions={{headerShown: false,
        cardStyle: { backgroundColor: Colors.navy },
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