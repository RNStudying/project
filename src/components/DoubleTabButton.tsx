import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {
  GestureHandlerRootView,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

export const DoubleTapButton: React.FC<{
  children: ReactElement;
  onPressDoubleTab: () => void;
}> = props => {
  return (
    <GestureHandlerRootView>
      <TapGestureHandler
        numberOfTaps={2}
        onHandlerStateChange={({nativeEvent}) => {
          if (nativeEvent.state === State.ACTIVE) {
            props.onPressDoubleTab();
          }
        }}>
        <View>{props.children}</View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};
