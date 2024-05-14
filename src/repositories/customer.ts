import { Api } from "../api/api"
import { CustomerMapper } from "../mappers/customer"
import { Customer } from "../models/customer"
import { customerId } from "../models/id"

class CustomerRepository {
    public static loadCustomers = async (page?: number, rowsPerPage?: number): Promise<{
        data: Customer[],
        allData: number
    } | undefined> => {
        const response = await Api.post('/customer/load', {
            page: page,
            rowsPerPage: rowsPerPage
        })
        const data = await response.json()
        return {
            ...data,
            data: CustomerMapper.fixCustomers(data['customers']),
            allData: data['allData']
        }
    }

    public static saveCustomer = async(customer: Customer): Promise<Customer | undefined> => {
        const response = await Api.post('/customer/save', {
            customer: customer
        })
        const data = await response.json()
        return data['customer']
    }

    public static getCustomerById = async(id: customerId): Promise<Customer | undefined> => {
        const response = await Api.post('/customer/getById', {
            id: id
        })
        const data = await response.json()
        return data['customer']
    }
}

export { CustomerRepository }

