import { ChildSeatPriceHistory } from "../models/childSeatPriceHistory";

class ChildSeatPriceHistoryMapper {
  public static fixChildSeatPriceHistory = (childSeatPrice: any) => {
    return {
      ...childSeatPrice,
      id: childSeatPrice._id,
      amount: childSeatPrice.amount ?? 0,
      description: childSeatPrice.description ?? "",
      validFrom: new Date(childSeatPrice.validFrom),
      validTo: childSeatPrice.validTo && new Date(childSeatPrice.validTo),
      updatedAt: childSeatPrice.updatedAt && new Date(childSeatPrice.updatedAt),
      deletedAt: childSeatPrice.deletedAt && new Date(childSeatPrice.deletedAt),
      createdAt: new Date(childSeatPrice.createdAt),
    } as ChildSeatPriceHistory;
  };

  public static fixGpsPriceHistories = (childSeatPrices: any[]) => {
    return childSeatPrices.map((childSeat) =>
      ChildSeatPriceHistoryMapper.fixChildSeatPriceHistory(childSeat),
    );
  };
}

export default ChildSeatPriceHistoryMapper;
