import React from "react";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import theme from "./src/global/styles/theme";
import { Register } from "./src/screens/Register";
import { AppRoutes } from "./src/routes/app.routes";

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
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
