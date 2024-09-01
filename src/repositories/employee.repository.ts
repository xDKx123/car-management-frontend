import { Api } from "../api/api";
import { Employee } from "../models/employee";
import EmployeeMapper from "../mappers/employee.mapper";

class EmployeeRepository {
  private static employeePath = "/employee";

  public static load = async (): Promise<Employee[]> => {
    const response: Response = await Api.get(this.employeePath + "/load");
    const data = await response.json();

    return EmployeeMapper.fixEmployees(data["employees"]);
  };

  public static add = async (
    employee: Partial<Employee>,
  ): Promise<Employee> => {
    const response: Response = await Api.post(
      this.employeePath + "/add",
      employee,
    );
    const data = await response.json();

    return EmployeeMapper.fixEmployee(data["employee"]);
  };

  public static update = async (
    employee: Partial<Employee>,
  ): Promise<Employee> => {
    const response: Response = await Api.post(
      this.employeePath + "/update",
      employee,
    );
    const data = await response.json();

    return EmployeeMapper.fixEmployee(data["employee"]);
  };

  public static getById = async (id: string): Promise<Employee> => {
    const requestData = {
      id: id,
    };
    const response: Response = await Api.post(
      this.employeePath + "/getById",
      requestData,
    );
    const data = await response.json();

    return EmployeeMapper.fixEmployee(data["employee"]);
  };
}

export { EmployeeRepository };