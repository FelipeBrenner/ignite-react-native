import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center

  margin-right: 2px

  background-color: ${({ theme }) => theme.colors.background_secundary};
`;

export const InputText = styled.TextInput`
  flex: 1
  background-color: ${({ theme }) => theme.colors.background_secundary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)``;
