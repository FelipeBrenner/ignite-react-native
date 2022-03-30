import { MarkedDateProps } from "../../components/Calendar";
import { CarDTO } from "../../dtos/CarDTO";
import { UserDTO } from "../../dtos/UserDTO";

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: UserDTO };
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: string[] };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: keyof RootStackParamList;
  };
  MyCars: undefined;
};
