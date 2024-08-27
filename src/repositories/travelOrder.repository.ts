import { Api } from "../api/api";
import TravelOrderMapper from "../mappers/travelOrder.mapper";

class TravelOrderRepository {
  private static travelOrderRepository = "/travelOrder";

  public static add = async (requestData: any): Promise<number> => {
    const response = await Api.post(
      this.travelOrderRepository + "/add",
      requestData,
    );
    const data = await response.json();
    return data;
  };

  public static load = async (
    page?: number,
    rowsPerPage?: number,
  ): Promise<any> => {
    const response = await Api.post(this.travelOrderRepository + "/load", {
      page: page,
      rowsPerPage: rowsPerPage,
    });
    const data = await response.json();
    return {
      data: TravelOrderMapper.fixTravelOrders(data.travelOrders),
      allData: data.allData,
    };
  };
}

export default TravelOrderRepository;