import { jest } from '@jest/globals';
import "@testing-library/jest-native/extend-expect";

jest.spyOn(console, "warn").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  router: { push: jest.fn(), replace: jest.fn(), back: jest.fn() },
  Link: ({ children }: any) => children,
}));

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

jest.mock("react-native-svg", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    SvgUri: ({ uri }: { uri: string }) =>
      React.createElement(View, { testID: "mock-svg", accessibilityLabel: uri }),
  };
});

jest.mock("expo-image", () => {
  const { Image } = require("react-native");
  return { Image };
});

jest.mock("react-native-safe-area-context", () => {
  const actual = jest.requireActual("react-native-safe-area-context") as object;
  return {
    ...(actual as object),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});