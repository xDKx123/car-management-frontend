import { Api } from "../api/api";
import { CarRequest } from "../api/types";
import { CarMapper } from "../mappers/car";
import { Car } from "../models/car";

class CarRepository {
  private static carPath = "/car";

  public static loadCars = async (
    page?: number,
    rowsPerPage?: number,
  ): Promise<any> => {
    const response: Response = await Api.post(this.carPath + "/load", {
      page: page,
      rowsPerPage: rowsPerPage,
    });

    const data = await response.json();

    return CarMapper.fixCars(data["cars"]);
  };

  public static addCar = async (car: CarRequest): Promise<Car | undefined> => {
    const response = await Api.post(this.carPath + "/add", car);
    const data = await response.json();
    return data["user"];
  };

  public static updateCar = async (
    car: CarRequest,
  ): Promise<Car | undefined> => {
    const response = await Api.post(this.carPath + "/update", car);
    const data = await response.json();
    return data["user"];
  };

  public static isValidVin = async (
    vin: string,
  ): Promise<boolean | undefined> => {
    const response = await Api.post(this.carPath + "/isValidVin", {
      vin: vin,
    });
    const data = await response.json();
    return data["isValid"];
  };

  public static loadCarBodyTypes = async (): Promise<string[] | undefined> => {
    const response = await Api.post(this.carPath + "/loadBodyTypes", {});
    const data = await response.json();
    return data["carBodyTypes"];
  };

  public static loadCarFuelTypes = async (): Promise<string[] | undefined> => {
    const response = await Api.post(this.carPath + "/loadFuelTypes", {});
    const data = await response.json();
    return data["carFuelTypes"];
  };

  public static loadCarTransmissionTypes = async (): Promise<
    string[] | undefined
  > => {
    const response = await Api.post(
      this.carPath + "/loadTransmissionTypes",
      {},
    );
    const data = await response.json();
    return data["carTransmissionTypes"];
  };

  public static calculateDrivingPrice = async (
    carId: string,
    distance: number,
    fuelPrice?: number,
  ): Promise<number | undefined> => {
    const response: Response = await Api.post(
      this.carPath + "/calculateDrivingPrice",
      {
        carId: carId,
        distance: distance,
        fuelPrice: fuelPrice,
      },
    );
    const data = await response.json();
    return data["price"];
  };
}

export { CarRepository };
