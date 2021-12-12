import React from "react";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/felipebrenner.png" }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Felipe</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
}
