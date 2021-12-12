import React from "react";
import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import theme from "./src/global/styles/theme";
import { CategorySelect } from "./src/screens/CategorySelect";
import AppLoading from "expo-app-loading";

export default function App() {
  const [fontsLodaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLodaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CategorySelect />
    </ThemeProvider>
  );
}
