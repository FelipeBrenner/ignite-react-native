import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React, { ReactElement } from "react";
import { ThemeProvider } from "styled-components/native";
import { Register } from ".";
import theme from "../../global/styles/theme";

jest.mock("expo-font");
jest.mock("expo-asset");

const Providers = ({ children }: { children: ReactElement }) => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </NavigationContainer>
);

describe("Register Screen", () => {
  it("should be open category modal when user click on button", async () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");
    fireEvent.press(buttonCategory);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
