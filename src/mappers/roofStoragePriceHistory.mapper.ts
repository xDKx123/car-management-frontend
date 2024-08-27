import { RoofStoragePriceHistory } from "../models/roofStoragePriceHistory";

class RoofStoragePriceHistoryMapper {
  public static fixRoofStoragePriceHistory = (roofStorage: any) => {
    return {
      ...roofStorage,
      id: roofStorage._id,
      amount: roofStorage.amount ?? 0,
      description: roofStorage.description ?? "",
      validFrom: new Date(roofStorage.validFrom),
      validTo: roofStorage.validTo && new Date(roofStorage.validTo),
      updatedAt: roofStorage.updatedAt && new Date(roofStorage.updatedAt),
      deletedAt: roofStorage.deletedAt && new Date(roofStorage.deletedAt),
      createdAt: new Date(roofStorage.createdAt),
    } as RoofStoragePriceHistory;
  };

  public static fixRoofStoragePriceHistories = (roofStorages: any[]) => {
    return roofStorages.map((roofStorage) =>
      RoofStoragePriceHistoryMapper.fixRoofStoragePriceHistory(roofStorage),
    );
  };
}

export default RoofStoragePriceHistoryMapper;