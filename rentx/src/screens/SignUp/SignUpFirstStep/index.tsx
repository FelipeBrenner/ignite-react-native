import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { RootStackParamList } from "../../../@types/navigation";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

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
  "SignUpFirstStep"
>;

export function SignUpFirstStep() {
  const navigation = useNavigation<SchedulingCompleteNavigationProp>();

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
            <FormTitle>1. Dados</FormTitle>
            <Input iconName="user" placeholder="Nome" />
            <Input iconName="mail" placeholder="E-mail" />
            <Input iconName="credit-card" placeholder="CNH" />
          </Form>

          <Button title="Próximo" />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
