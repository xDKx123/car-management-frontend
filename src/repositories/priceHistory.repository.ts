import { Api } from "../api/api";
import GpsPriceHistoryMapper from "../mappers/gpsPriceHistory.mapper";
import { GpsPriceHistory } from "../models/gpsPriceHistory";
import { ChildSeatPriceHistory } from "../models/childSeatPriceHistory";
import ChildSeatPriceHistoryMapper from "../mappers/childSeatPriceHistory.mapper";
import RoofStoragePriceHistoryMapper from "../mappers/roofStoragePriceHistory.mapper";
import { RoofStoragePriceHistory } from "../models/roofStoragePriceHistory";
import { CarPriceList } from "../models/carPriceList";
import CarPriceMapper from "../mappers/carPrice.mapper";
import { carId } from "../models/id";

class PriceHistoryRepository {
  private static price = "/price";

  public static getGpsLatestPrice = async (): Promise<
    GpsPriceHistory | undefined
  > => {
    const response: Response = await Api.get(this.price + "/getGpsLatestPrice");
    const data = await response.json();

    return GpsPriceHistoryMapper.fixGpsPriceHistory(data["gpsLatestPrice"]);
  };

  public static getChildSeatLatestPrice = async (): Promise<
    ChildSeatPriceHistory | undefined
  > => {
    const response: Response = await Api.get(
      this.price + "/getChildSeatLatestPrice",
    );
    const data = await response.json();

    return ChildSeatPriceHistoryMapper.fixChildSeatPriceHistory(
      data["childSeatLatestPrice"],
    );
  };

  public static getRoofStorageLatestPrice = async (): Promise<
    RoofStoragePriceHistory | undefined
  > => {
    const response: Response = await Api.get(
      this.price + "/getRoofStorageLatestPrice",
    );

    const data = await response.json();

    return RoofStoragePriceHistoryMapper.fixRoofStoragePriceHistory(
      data["roofStorageLatestPrice"],
    );
  };

  public static loadCarPrice = async (carId: carId): Promise<CarPriceList> => {
    const requestData = {
      carId: carId,
    };
    const response: Response = await Api.post(
      this.price + "/loadCarPrice/",
      requestData,
    );
    const data = await response.json();

    return CarPriceMapper.fixCarPrice(data["price"]);
  };
}

export { PriceHistoryRepository };