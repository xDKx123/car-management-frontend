import { CarPriceList } from "../models/carPriceList";

class CarPriceMapper {
  public static fixCarPrice = (data: any): CarPriceList => {
    return {
      car: data["car"],
      amount: data["amount"],
      description: data["description"],
      validFrom: data["validFrom"] && new Date(data["validFrom"]),
      validTo: data["validTo"] && new Date(data["validTo"]),
      createdAt: new Date(data["createdAt"]),
      updatedAt: data["updatedAt"] && new Date(data["updatedAt"]),
      deletedAt: data["deletedAt"] && new Date(data["deletedAt"]),
    } as CarPriceList;
  };
}

export default CarPriceMapper;