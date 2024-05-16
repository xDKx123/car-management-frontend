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
import './ContractsLeavingToday.css'
import {
    getColumns,
    getData
} from './functions'

interface ContractsLeavingTodayProps {
}

const fetchData = async (): Promise<any> => {
    const response = await ContractRepository.loadContractsLeavingToday(new Date())

    return response ?? []
}
const ContractsLeavingToday: FC<ContractsLeavingTodayProps> = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [contracts, setContracts] = useState<any[]>([])

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
    }, [])

    return (
        <>
            {
                loading && <LoadingAnimation />
            }
            <Table data={tableData}
                columns={columns}
            />

        </>
    )
}

export default ContractsLeavingToday
