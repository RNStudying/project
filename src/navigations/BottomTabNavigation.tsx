import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HomeScreen} from '../screens/HomeScreen';
import {MyPageScreen} from '../screens/MyPageScreen';
import {faHome, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export type BottomTabPramList = {
  Home: undefined;
  MyPage: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabPramList>();

export const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => {
        const getIconName = () => {
          if (route.name === 'MyPage') {
            return faUser;
          }
          return faHome;
        };
        const routeIconName = getIconName();

        return {
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <FontAwesomeIcon icon={routeIconName} color={color} />;
          },
        };
      }}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="MyPage" component={MyPageScreen} />
    </BottomTab.Navigator>
  );
};
