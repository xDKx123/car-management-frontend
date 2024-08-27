import { Car } from "./car";
import { ChildSeatPriceHistory } from "./childSeatPriceHistory";
import { Customer } from "./customer";
import { GpsPriceHistory } from "./gpsPriceHistory";

interface Contract {
  id: string;
  name: string;
  car: Car;
  customer: Customer;
  returnDate: Date;
  leavingDate: Date;
  createdAt: string;
  gps: GpsPriceHistory | null;
  winterChains: boolean;
  childSeat: ChildSeatPriceHistory | null;
  additionalDriverId: Customer | null;
  carRoofBox: boolean;
  amount: number;
  updatedAt: string | null;
  deletedAt: string | null;
  discount: number | null;
}

export type { Contract };
