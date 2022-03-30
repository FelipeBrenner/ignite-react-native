import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components";
import { RootStackParamList } from "../../../@types/navigation";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";

type SchedulingCompleteNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUpSecondStep"
>;

export function SignUpSecondStep() {
  const navigation = useNavigation<SchedulingCompleteNavigationProp>();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active={true} />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{"\n"}
            conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput iconName="lock" placeholder="Senha" />
            <PasswordInput iconName="lock" placeholder="Repetir senha" />
          </Form>

          <Button title="Cadastrar" color={theme.colors.success} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
