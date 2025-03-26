import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {TypeUserDispatch, signIn} from './actions/user';

export const SplashView: React.FC<{onFinishLoad: () => void}> = props => {
  const [showLoginButton, setShowLoginButton] = useState(false);
  const dispatch = useDispatch<TypeUserDispatch>();

  const appInit = useCallback(async () => {
    try {
      console.log('11');
      const {idToken} = await GoogleSignin.signInSilently();
      if (idToken !== null) {
        console.log('22');

        // await
        // 로그인에 대한 어떠한 처리
        await dispatch(signIn(idToken));
        props.onFinishLoad();
      }
      setShowLoginButton(true);
      console.log('44');
    } catch (ex) {
      console.log('33', ex);

      setShowLoginButton(true);
    }
  }, []);

  const onPressSignin = useCallback(async () => {
    try {
      // Google Play 서비스 확인
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Google Sign-In 수행
      const {idToken} = await GoogleSignin.signIn();
      if (idToken) {
        console.log('User signed in with idToken:', idToken);
        // signin 처리
        await dispatch(signIn(idToken));
        props.onFinishLoad();
      } else {
        console.log('No idToken received');
      }
    } catch (error) {
      console.warn('Error during sign in:', error);
    }
  }, []);

  useEffect(() => {
    appInit();
    // setTimeout(() => {
    //   props.onFinishLoad();
    // }, 1000);
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {showLoginButton && <GoogleSigninButton onPress={onPressSignin} />}
      {/* <GoogleSigninButton onPress={onPressSignin} /> */}
    </View>
  );
};
