import React, { FC } from "react";
import { ThemeProvider } from "styled-components/native";
import { render } from "@testing-library/react-native";

import theme from "../../../global/styles/theme";
import { Input } from ".";

const Providers: FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Input Component", () => {
  it("must have specific border color and width when active", () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active={true}
      />,
      {
        wrapper: Providers,
      }
    );

    const inputComponent = getByTestId("input-email");
    expect(inputComponent.props.style[0].borderColor).toEqual(
      theme.colors.attention
    );
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
