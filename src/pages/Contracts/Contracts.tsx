import { Add } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { PaginationState } from '@tanstack/react-table'
import {
    FC,
    useEffect,
    useMemo,
    useState
} from 'react'
import { useTranslation } from 'react-i18next'
import {
    useLocation,
    useNavigate
} from 'react-router-dom'
import TableControlledPagination from '../../components/common/TableControlledPagination/TableControlledPagination'
import { Contract } from '../../models/contract'
import { ContractRepository } from '../../repositories/contract'
import './Contracts.css'
import {
    getColumns,
    getData
} from './functions'

interface ContractsProps {
}

interface ContractsData {
    data: Contract[],
    allData: number
}

const Contracts: FC<ContractsProps> = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const page = queryParameters.get('page')
    const rowsPerPage = queryParameters.get('rowsPerPage')

    const { t } = useTranslation()

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: page ? parseInt(page) : 0,
        pageSize: rowsPerPage ? parseInt(rowsPerPage) : 5
    })
    const [contracts, setContracts] = useState<ContractsData>({
        data: [],
        allData: 0
    })

    const tableData = useMemo(() => getData(contracts.data, contracts.allData), [contracts])
    const columns = useMemo(() => getColumns(), [])


    const navigate = useNavigate()
    const location = useLocation()

    const newContractButtonClickHandler = () => {
        navigate('contracts/new')
    }

    useEffect(() => {
        const loadContracts = async (): Promise<void> => {
            const contracts: ContractsData | undefined = await ContractRepository.loadContracts(pagination.pageIndex,
                pagination.pageSize)

            if (!contracts) {
                return
            }

            setContracts(contracts)

        }

        loadContracts()
    }, [pagination, setPagination])

    useEffect(() => {
        if (location.pathname !== '/contracts') {
            return
        }
        //set to url parameters
        navigate(`/contracts?page=${pagination.pageIndex}&rowsPerPage=${pagination.pageSize}`)
    }, [pagination, setPagination])


    return (

        <Box
            className={'flex w-full flex-grow flex-col'}
        >
            <Box id={'contract-actions'}>
                <IconButton id={'add-contract'}
                    onClick={newContractButtonClickHandler}
                >
                    <Add />
                    {
                        t('addContract')
                    }
                </IconButton>
            </Box>
            <TableControlledPagination data={tableData.data}
                columns={columns}
                setPagination={setPagination}
                pagination={pagination}
                dataCount={tableData.allData}
            />
        </Box>

    )
}

export default Contracts
