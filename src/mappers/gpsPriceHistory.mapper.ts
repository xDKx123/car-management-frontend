import { GpsPriceHistory } from "../models/gpsPriceHistory";

class GpsPriceHistoryMapper {
  public static fixGpsPriceHistory = (gpsPriceHistory: any) => {
    return {
      ...gpsPriceHistory,
      id: gpsPriceHistory._id,
      amount: gpsPriceHistory.amount ?? 0,
      description: gpsPriceHistory.description ?? "",
      validFrom: new Date(gpsPriceHistory.validFrom),
      validTo: gpsPriceHistory.validTo && new Date(gpsPriceHistory.validTo),
      updatedAt:
        gpsPriceHistory.updatedAt && new Date(gpsPriceHistory.updatedAt),
      deletedAt:
        gpsPriceHistory.deletedAt && new Date(gpsPriceHistory.deletedAt),
      createdAt: new Date(gpsPriceHistory.createdAt),
    } as GpsPriceHistory;
  };

  public static fixGpsPriceHistories = (gpsPriceHistories: any[]) => {
    return gpsPriceHistories.map((gpsPriceHistory) =>
      GpsPriceHistoryMapper.fixGpsPriceHistory(gpsPriceHistory),
    );
  };
}

export default GpsPriceHistoryMapper;