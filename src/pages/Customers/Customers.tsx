import { Add } from '@mui/icons-material'
import {
    Box,
    IconButton,
    Popover
} from '@mui/material'
import {
    PaginationState,
    Row,
    RowData
} from '@tanstack/react-table'
import React, {
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
import CustomerPopoverActions from '../../components/customer/CustomerPopoverActions/CustomerPopoverActions'
import { Customer } from '../../models/customer'
import { CustomerRepository } from '../../repositories/customer'
import './Customers.css'
import {
    getColumns,
    getData
} from './functions'

interface CustomersProps {
}

interface CustomerData {
    data: Customer[],
    allData: number
}

interface ContextMenuProps {
    visible: boolean
    top: number
    left: number
    row: Row<RowData> | null
}

const Customers: FC<CustomersProps> = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const page = queryParameters.get('page')
    const rowsPerPage = queryParameters.get('rowsPerPage')

    const { t } = useTranslation()

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: page ? parseInt(page) : 0,
        pageSize: rowsPerPage ? parseInt(rowsPerPage) : 5
    })
    const [customers, setCustomers] = useState<CustomerData>({
        data: [],
        allData: 0
    })
    const [contextMenu, setContextMenu] = useState<ContextMenuProps>({
        visible: false,
        top: 0,
        left: 0,
        row: null
    })

    const tableData = useMemo(() => getData(customers.data, customers.allData), [customers])
    const columns = useMemo(() => getColumns(), [])


    const navigate = useNavigate()
    const location = useLocation()

    const newContractButtonClickHandler = () => {
        navigate('customer/new')
    }

    useEffect(() => {
        const loadCustomer = async (): Promise<void> => {
            const customers: CustomerData | undefined = await CustomerRepository.loadCustomers(pagination.pageIndex,
                pagination.pageSize)

            if (!customers) {
                return
            }

            setCustomers(customers)

        }

        loadCustomer()
    }, [pagination, setPagination])

    useEffect(() => {
        if (location.pathname !== '/customers') {
            // This is for the case when the user navigates to /customers/new or /customers/edit or /customers/:id
            return
        }

        console.log('pagination changed', pagination)
        //set to url parameters
        navigate(`/customers?page=${pagination.pageIndex}&rowsPerPage=${pagination.pageSize}`)
    }, [pagination, setPagination])

    const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, row: Row<RowData>) => {
        event.preventDefault()

        setContextMenu({
            visible: true,
            top: event.clientY,
            left: event.clientX,
            row: row
        })
    }

    const handleCloseContextMenu = (): void => {
        setContextMenu((prevState: ContextMenuProps) => {
            return {
                ...prevState,
                visible: false,
                left: 0,
                top: 0,
                row: null,
            }
        })
    }


    return (
        <>
            {
                contextMenu.row &&
                <Popover
                    open={contextMenu.visible}
                    onClose={handleCloseContextMenu}
                    anchorReference={'anchorPosition'}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    anchorPosition={{
                        top: contextMenu.top,
                        left: contextMenu.left
                    }}
                >
                    <CustomerPopoverActions customerId={(contextMenu.row.original as Customer).id} />
                </Popover>
            }

            <Box className={'flex w-full flex-grow flex-col'}
            >
                <Box id={'customer-actions'}>
                    <IconButton id={'add-customer'}
                        onClick={newContractButtonClickHandler}
                    >
                        <Add /> {
                            t('addCustomer')
                        }
                    </IconButton>
                </Box>
                <TableControlledPagination data={tableData.data}
                    columns={columns}
                    setPagination={setPagination}
                    pagination={pagination}
                    dataCount={tableData.allData}
                    onContextMenu={onContextMenu}
                />
            </Box>
        </>
    )
}

export default Customers
