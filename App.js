import { StatusBar } from "expo-status-bar";
import React, { createContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { Navigator } from "./components/features/navigators/navigator";
// import themes from './components/theme/themes';
import { ThemeContextProvider } from "./components/theme/theme_context";
import { Provider } from "react-redux";
import store from './redux/store';
// export const ThemeContext= createContext()

export default function App() {
  const [fontsLoaded] = useFonts({
    heading2: require("./assets/fonts/Roboto/Roboto-Black.ttf"),
    heading3: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    heading1: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    body: require("./assets/fonts/Roboto/Roboto-Light.ttf"),
    bodyBold: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    bodyLight: require("./assets/fonts/Roboto/Roboto-Thin.ttf"),
  });

  // const [isLoaded] = useFonts(customFonts);
  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Navigator />
      </ThemeContextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
