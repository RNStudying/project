import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {RootStackNavigation} from './navigations/RootStackNavigation';
import {SplashView} from './SplashView';
import {SafeAreaView} from 'react-native';

export const RootApp: React.FC = () => {
  const [initialize, setInitialize] = useState(false);

  if (!initialize) {
    return <SplashView onFinishLoad={() => setInitialize(true)} />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};
