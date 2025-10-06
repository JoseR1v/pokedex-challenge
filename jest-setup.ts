import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

const maybeMock = (id: string) => {
  try {
    jest.mock(id as any);
  } catch {}
};

[
  'react-native/Libraries/Animated/NativeAnimatedHelper',
  'react-native/Libraries/Animated/NativeAnimated/NativeAnimatedHelper',
  'react-native/Libraries/Animated/NativeAnimatedHelper'
].forEach(maybeMock);

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');

  const Base = (props: any) => React.createElement(View, props);
  Base.displayName = 'Svg';

  const SvgUri = (props: any) =>
    React.createElement(View, { ...props, testID: 'mock-svg' });
  SvgUri.displayName = 'SvgUri';

  return {
    __esModule: true,
    default: Base,
    Svg: Base,
    SvgUri,
    Path: Base,
    G: Base,
  };
});

jest.mock('expo-image', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    Image: (props: any) => React.createElement(View, props),
  };
});

jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    LinearGradient: (props: any) => React.createElement(View, props),
  };
});

jest.mock('expo-router', () => ({
  __esModule: true,
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  useLocalSearchParams: () => ({}),
  Redirect: ({ href }: any) => null,
}));

jest.mock('react-native-safe-area-context', () => {
  return {
    __esModule: true,
    SafeAreaProvider: ({ children }: any) => children,
    SafeAreaView: ({ children }: any) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});
