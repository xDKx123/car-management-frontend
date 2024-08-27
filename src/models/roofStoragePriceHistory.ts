import { roofStorageId } from "./id";

interface RoofStoragePriceHistory {
  id: roofStorageId;
  amount: number;
  description: string;
  validFrom: Date;
  validTo: Date;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type { RoofStoragePriceHistory };