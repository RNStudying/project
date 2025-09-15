import Header from '../components/Header';
import {useRootNavigation} from '../navigations/RootStackNavigation';

const CommunityScreen = () => {
  const rootNavigation = useRootNavigation();

  return (
    <>
      <Header
        leftIcon={true}
        title="반갑습니다! CommunityScreen🎉"
        onPressLeft={() => rootNavigation.goBack()}
      />
    </>
  );
};

export default CommunityScreen;
