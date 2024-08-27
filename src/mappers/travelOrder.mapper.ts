import { TravelOrder } from "../models/travelOrder";
import { CarMapper } from "./car";
import EmployeeMapper from "./employee.mapper";

class TravelOrderMapper {
  public static fixTravelOrder = (travelOrderModel: any): TravelOrder => {
    return {
      ...travelOrderModel,
      id: travelOrderModel._id,
      car: travelOrderModel.car && CarMapper.fixCar(travelOrderModel.car),
      user: travelOrderModel.user,
      employee:
        travelOrderModel.employee &&
        EmployeeMapper.fixEmployee(travelOrderModel.employee),
      latStart: travelOrderModel.latStart,
      lngStart: travelOrderModel.lngStart,
      latEnd: travelOrderModel.latEnd,
      lngEnd: travelOrderModel.lngEnd,
      mileage: travelOrderModel.mileage,
      priceOfRefuel: travelOrderModel.priceOfRefuel,
      createdAt: new Date(travelOrderModel.createdAt),
      updatedAt:
        travelOrderModel.updatedAt && new Date(travelOrderModel.updatedAt),
      deletedAt:
        travelOrderModel.deletedAt && new Date(travelOrderModel.deletedAt),
    };
  };

  public static fixTravelOrders = (travelOrders: any): TravelOrder[] => {
    return travelOrders.map(this.fixTravelOrder);
  };
}

export default TravelOrderMapper;