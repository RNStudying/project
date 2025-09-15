import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useCallback, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {TypeUserDispatch, signIn} from './actions/user';
import {Spacer} from './components/Spacer';
import {SafeAreaView} from 'react-native-safe-area-context';

export const SplashView: React.FC<{onFinishLoad: () => void}> = props => {
  const [showLoginButton, setShowLoginButton] = useState(false);
  const dispatch = useDispatch<TypeUserDispatch>();
  console.log('showLoginButton', showLoginButton);
  const appInit = useCallback(async () => {
    console.log('appInit');
    try {
      const {idToken} = await GoogleSignin.signInSilently();
      if (idToken) {
        await dispatch(signIn(idToken));
      } else {
        console.log('No idToken received');
      }
      props.onFinishLoad();
    } catch (error) {
      console.log('error', error);
    } finally {
      setShowLoginButton(true);
    }
  }, [dispatch, props]);

  const onPressSignin = async () => {
    // Google Play 서비스 확인
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    // Google Sign-In 수행
    const {idToken} = await GoogleSignin.signIn();
    if (idToken) {
      await dispatch(signIn(idToken));
      props.onFinishLoad();
    } else {
      console.log('No idToken received');
    }
  };
  useEffect(() => {
    console.log('useEffect');
    appInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        MyApp: All My Favorite 🎁
      </Text>
      <Spacer margin={10} />
      <Text style={{fontSize: 12}}>내가 자주 쓰는 기능은 다 모여있다</Text>
      <Spacer margin={50} />
      <Text>소셜 계정 연동을 통해 쉽게 사용해보세요!</Text>
      <Spacer margin={50} />
      {showLoginButton && <GoogleSigninButton onPress={onPressSignin} />}
    </SafeAreaView>
  );
};
