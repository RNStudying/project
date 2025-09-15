import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {RootStackNavigation} from './navigations/RootStackNavigation';
import {SplashView} from './SplashView';
import {SafeAreaView} from 'react-native-safe-area-context';

export const RootApp: React.FC = () => {
  const [initialize, setInitialize] = useState(false);

  if (!initialize) {
    return <SplashView onFinishLoad={() => setInitialize(true)} />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}} edges={['top']}>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};
