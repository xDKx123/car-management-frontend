import { Car } from "./car";
import { Employee } from "./employee";
import { travelOrderId } from "./id";
import { User } from "./user";

interface TravelOrder {
  id: travelOrderId;
  car: Car;
  user: User;
  employee: Employee;
  latStart: number;
  lngStart: number;
  latEnd: number;
  lngEnd: number;
  mileage: number;
  priceOfRefuel: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type { TravelOrder };