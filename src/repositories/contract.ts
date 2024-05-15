import { Api } from "../api/api"
import { ContractMapper } from "../mappers/contract"
import { Contract } from "../models/contract"

class ContractRepository {
    private static contractPath = '/contract'
    public static loadContractsLeavingToday = async(date: Date): Promise<any> => {
        const response = await Api.post(this.contractPath + '/loadLeavingToday', {
            date: date
        })
        const data = await response.json()
        const contracts = ContractMapper.fixContracts(data['contracts'])
        return contracts
    }

    public static loadContractsReturningToday = async(date: Date): Promise<any> => {
        const response = await Api.post(this.contractPath + '/loadReturningToday', {
            date: date
        })
        const data = await response.json()
        return ContractMapper.fixContracts(data['contracts'])
    }

    public static loadContracts = async(page?: number, rowsPerPage?: number): Promise<{
        data: Contract[],
        allData: number
    } | undefined> => {
        const response = await Api.post(this.contractPath + '/load', {
            page: page,
            rowsPerPage: rowsPerPage
        })
        const data = await response.json()
        return {
            ...data,
            data: ContractMapper.fixContracts(data['contracts']),
            allData: data['allData']
        }
    }

    public static addContract = async(contract: Contract): Promise<Contract | undefined> => {
        const response = await Api.post(this.contractPath + '/add', {
            contract: contract
        })
        const data = await response.json()
        return data['contract']
    }

    public static getContract = async(contractId: string): Promise<Contract | undefined> => {
        const response = await Api.post(this.contractPath + '/getContract', {
            contractId: contractId
        })
        const data = await response.json()
        return data['contract']
    }
}

export { ContractRepository }

