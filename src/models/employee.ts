import { employeeId } from "./id";

interface Employee {
  id: employeeId;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  street: string;
  postalCode: number;
  city: string;
  birthDate: Date;
  birthPlace: string;
}

export type { Employee };
