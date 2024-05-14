import { Contract } from "../models/contract"
import { CarMapper } from "./car"
import { CustomerMapper } from "./customer"

class ContractMapper {
    public static fixContracts = (contracts: any): Contract[] => {
        return contracts.map(this.fixContract)
    }
    
    public static fixContract = (contract: any): Contract => {
        return {
            id: contract._id,
            name: contract.name,
            car: CarMapper.fixCar(contract.car),
            customer: CustomerMapper.fixCustomer(contract.customer),
            leavingDate: new Date(contract.leavingDate),
            returnDate: new Date(contract.returnDate),
        }
    }
    
}

export { ContractMapper}