import { Customer } from "../models/customer"

class CustomerMapper {
    public static fixCustomers = (customers: any): Customer[] => {
        return customers.map(this.fixCustomer)
    }
    
    public static fixCustomer = (customer: any): Customer => {
        return {
            id: customer._id,
            name: customer.name,
            surname: customer.surname,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            isLegalPerson: customer.isLegalPerson,
            idNumber: customer.idNumber,
            idValidFrom: new Date(customer.idValidFrom),
            idValidTo: new Date(customer.idValidTo),
            drivingLicenseNumber: customer.drivingLicenseNumber,
            drivingLicenseValidFrom: new Date(customer.drivingLicenseValidFrom),
            drivingLicenseValidTo: new Date(customer.drivingLicenseValidTo),
            street: customer.street,
            postalCode: customer.postalCode,
            city: customer.city,
            birthDate: new Date(customer.birthDate),
            birthPlace: customer.birthPlace
        }
    }
}

export { CustomerMapper }