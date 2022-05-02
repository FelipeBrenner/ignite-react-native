import { MarkedDateProps } from "../../components/Calendar";
import { CarDTO } from "../../dtos/CarDTO";
import { UserDTO } from "../../dtos/UserDTO";
import { Car as ModelCar } from "../../database/models/Car";

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: UserDTO };
  Home: undefined;
  Profile: undefined;
  CarDetails: { car: ModelCar };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: string[] };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: keyof RootStackParamList;
  };
  MyCars: undefined;
};
