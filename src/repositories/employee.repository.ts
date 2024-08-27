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
}

export { EmployeeRepository };