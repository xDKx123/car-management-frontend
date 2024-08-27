import { carId } from "./id";

interface CarPriceList {
  car: carId;
  amount: number;
  description: string;
  validFrom: Date;
  validTo: Date;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type { CarPriceList };