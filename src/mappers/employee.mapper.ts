import { Employee } from "../models/employee";

class EmployeeMapper {
  public static fixEmployee = (employeeModel: any): Employee => {
    return {
      ...employeeModel,
      id: employeeModel._id,
      name: employeeModel.name,
      surname: employeeModel.surname,
      email: employeeModel.email,
      phoneNumber: employeeModel.phoneNumber,
      street: employeeModel.street,
      postalCode: employeeModel.postalCode,
      city: employeeModel.city,
      birthDate: employeeModel.birthDate
        ? new Date(employeeModel.birthDate)
        : undefined,
      birthPlace: employeeModel.birthPlace,
    } as Employee;
  };

  public static fixEmployees = (employees: any): Employee[] => {
    return employees.map(this.fixEmployee);
  };
}

export default EmployeeMapper;