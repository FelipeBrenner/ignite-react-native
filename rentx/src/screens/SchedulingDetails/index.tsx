import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../@types/navigation";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import api from "../../services/api";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { CarDTO } from "../../dtos/CarDTO";

type SchedulingDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SchedulingDetails"
>;

type SchedulingRouteProp = RouteProp<RootStackParamList, "SchedulingDetails">;

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const netInfo = useNetInfo();
  const theme = useTheme();
  const navigation = useNavigation<SchedulingDetailsNavigationProp>();
  const route = useRoute<SchedulingRouteProp>();
  const { car, dates } = route.params;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    try {
      setLoading(true);

      await api.post("rentals", {
        user_id: 1,
        car_id: car,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      });

      navigation.navigate("Confirmation", {
        title: "Carro alugado!",
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        nextScreenRoute: "Home",
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível confirmar o agendamento.");
      setLoading(false);
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected) {
      fetchCarUpdated;
    }

    fetchCarUpdated();
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider
          images={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {car.accessories && (
          <Accessories>
            {car.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.price} x{dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
