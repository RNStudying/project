import React, {useEffect} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {RootApp} from './src/RootApp';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import 'react-native-gesture-handler';
import mobileAds, {
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import {
  // Platform,
  useWindowDimensions,
} from 'react-native';
const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId:
      '1049024038006-ckd6sr8i1ntdr7ct16avr9l8id4fnlsi.apps.googleusercontent.com',
  });
};
const unitID = 'ca-app-pub-3940256099942544/9214589741';
// const unitID =
//   Platform.OS === 'android'
//     ? 'ca-app-pub-6066778698509308/6434174698'
//     : 'ca-app-pub-6066778698509308/8689367590';

mobileAds()
  .initialize()
  .then(res => {
    console.log('Google Mobile Ads initialized:', res);
  })
  .catch(error => {
    console.log('Google Mobile Ads initialization error:', error);
  });

function App(): React.JSX.Element {
  useEffect(() => {
    console.log('App useEffect');
    googleSigninConfigure();
  }, []);
  const {width} = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootApp />
        <SafeAreaView
          edges={['bottom']}
          style={{
            alignItems: 'center',
            width: width,
          }}>
          <BannerAd unitId={unitID} size={BannerAdSize.FULL_BANNER} />
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
