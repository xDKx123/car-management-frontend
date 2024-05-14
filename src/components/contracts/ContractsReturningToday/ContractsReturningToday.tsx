import {
    FC,
    useEffect,
    useMemo,
    useState
} from 'react'
import { Contract } from '../../../models/contract'
import { ContractRepository } from '../../../repositories/contract'
import LoadingAnimation from '../../common/LoadingAnimation/LoadingAnimation'
import Table from '../../common/Table/Table'
import './ContractsReturningToday.css'
import {
    getColumns,
    getData
} from './functions'

interface ContractsReturningTodayProps {

}

const fetchData = async (): Promise<any> => {
    //backend.addContract()

    const response = await ContractRepository.loadContractsReturningToday(new Date())

    if (response) {
        return response
    }

    return []
}

const ContractsReturningToday: FC<ContractsReturningTodayProps> = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [contracts, setContracts] = useState<Contract[]>([])

    const tableData = useMemo(() => getData(contracts), [contracts])
    const columns = useMemo(() => getColumns(), [])

    useEffect(() => {
        fetchData().then((data: Contract[] | undefined) => {
            if (!data) {
                setLoading(false)
                return
            }
            setContracts(data)
            setLoading(false)
        }).catch((error: any) => {
            console.log(error)
            setLoading(false)
        })
    },
    [])

    return (
        <>
            {
                loading && <LoadingAnimation/>
            }
            <Table data={tableData}
                columns={columns}
            />

        </>
    )
}

export default ContractsReturningToday
