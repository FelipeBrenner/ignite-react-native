import { CarDTO } from "../../dtos/CarDTO";

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: undefined;
  SchedulingDetails: undefined;
  SchedulingComplete: undefined;
};
