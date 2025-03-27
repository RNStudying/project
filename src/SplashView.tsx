import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {TypeUserDispatch, signIn} from './actions/user';
import {Spacer} from './components/Spacer';

export const SplashView: React.FC<{onFinishLoad: () => void}> = props => {
  const [showLoginButton, setShowLoginButton] = useState(false);
  const dispatch = useDispatch<TypeUserDispatch>();

  const appInit = async () => {
    const {idToken} = await GoogleSignin.signInSilently();
    if (idToken !== null) {
      await dispatch(signIn(idToken));
      props.onFinishLoad();
    }
    setShowLoginButton(true);
  };

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
    appInit();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        MyApp: All My Favorite 🎁
      </Text>
      <Spacer margin={10} />
      <Text style={{fontSize: 12}}>내가 자주 쓰는 기능은 다 모여있다</Text>
      <Spacer margin={50} />
      <Text>소셜 계정 연동을 통해 쉽게 사용해보세요!</Text>
      <Spacer margin={50} />
      {showLoginButton && <GoogleSigninButton onPress={onPressSignin} />}
    </View>
  );
};
