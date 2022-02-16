import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
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
  HighlightCards,
  Transactions,
  TransactionsList,
  Title,
  LogoutButton,
  LoadContainer,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

export interface TransactionListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HightlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HightlightData>(
    {} as HightlightData
  );

  const theme = useTheme();
  const { user, signOut } = useAuth();

  function getLastTransactionDate(
    collection: TransactionListProps[],
    type: "positive" | "negative"
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((item) => item.type === type)
          .map((item) => new Date(item.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      {
        month: "long",
      }
    )}`;
  }

  async function loadTransactions() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: TransactionListProps[] = transactions.map(
      (item: TransactionListProps) => {
        if (item.type === "negative") {
          expensiveTotal += Number(item.amount);
        } else {
          entriesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );

    const lastTransactionExpensive = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval = `01 a ${lastTransactionExpensive}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: entriesTotal
          ? `Última entrada dia ${lastTransactionEntries}`
          : "Ainda não houve nenhuma entrada",
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: expensiveTotal
          ? `Última saída dia ${lastTransactionExpensive}`
          : "Ainda não houve nenhuma saída",
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: expensiveTotal ? totalInterval : "",
      },
    });

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
