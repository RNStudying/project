import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {AddFeedScreen} from '../screens/AddFeedScreen';
import {FeedListScreen} from '../screens/FeedListScreen';
import {BottomTabNavigation} from './BottomTabNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {FeedInfo} from '../@types/FeedInfo';

export type RootStackParamList = {
  BottomTab: undefined;
  FeedList: {
    list: FeedInfo[];
  };
  AddFeed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'containedModal',
      }}>
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      <Stack.Screen name="AddFeed" component={AddFeedScreen} />
      <Stack.Screen name="FeedList" component={FeedListScreen} />
    </Stack.Navigator>
  );
};

//navigation
//RootStackParamList에 작성된 key가 RootName으로 들어온다
export const useRootNavigation = <
  RouteName extends keyof RootStackParamList,
>() => {
  return useNavigation<
    NativeStackNavigationProp<RootStackParamList, RouteName>
  >();
};

//route
export const useRootRoute = <RouteName extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, RouteName>>();
};
