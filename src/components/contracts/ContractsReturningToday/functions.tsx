import {
    CellContext,
    ColumnDef,
    createColumnHelper,
    HeaderContext
} from '@tanstack/react-table'
import { Contract } from '../../../models/contract'
import { contractId } from '../../../models/id'
import TableCell from '../../common/TableCell/TableCell'
import TableCellDate from '../../common/TableCellDate/TableCellDate'
import TableHeader from '../../common/TableHeader/TableHeader'

interface ContractReturningToday {
    id: contractId,
    name: string,
    customerNameSurname: string,
    carBrand: string,
    carModel: string,
    carRegistrationPlate: string,
    returnDate: Date,
    leavingDate: Date
}

const columnHelper = createColumnHelper<ContractReturningToday>()
const getColumns = (): ColumnDef<ContractReturningToday>[] => {
    const columns = [
        columnHelper.accessor('id', {
            header: (headerContext: HeaderContext<ContractReturningToday, contractId | any>) =>
                <TableHeader header={headerContext}
                    label={'id'}
                />,
            cell: (cellContext: CellContext<ContractReturningToday, contractId | any>) => <TableCell cell={cellContext} />
        }),
        columnHelper.accessor('name', {
            header: (headerContext: HeaderContext<ContractReturningToday, string | any>) =>
                <TableHeader header={headerContext}
                    label={'name'}
                />,
            cell: (cellContext: CellContext<ContractReturningToday, string | any>) => <TableCell cell={cellContext} />
        }),
        columnHelper.accessor('carBrand', {
            header: (headerContext: HeaderContext<ContractReturningToday, string | any>) =>
                <TableHeader header={headerContext}
                    label={'carBrand'}
                />,
            cell: (cellContext: CellContext<ContractReturningToday, string | any>) => <TableCell cell={cellContext} />
        }),
        columnHelper.accessor('carModel', {
            header: (headerContext: HeaderContext<ContractReturningToday, string | any>) =>
                <TableHeader header={headerContext}
                    label={'carModel'}
                />,
            cell: (cellContext: CellContext<ContractReturningToday, string | any>) => <TableCell cell={cellContext} />
        }),
        columnHelper.accessor('carRegistrationPlate', {
            header: (headerContext: HeaderContext<ContractReturningToday, string | any>) =>
                <TableHeader header={headerContext}
                    label={'carRegistrationPlate'}
                />,
            cell: (cellContext: CellContext<ContractReturningToday, string | any>) => <TableCell cell={cellContext} />
        }),
        columnHelper.accessor('customerNameSurname', {
            header: (headerContext: HeaderContext<ContractReturningToday, string | any>) =>
                <TableHeader header={headerContext}
                    label={'customerNameSurname'}
                />,
            cell: (cellContext: CellContext<ContractReturningToday, string | any>) => <TableCell cell={cellContext} />
        }),
        columnHelper.accessor('returnDate', {
            header: (headerContext: HeaderContext<ContractReturningToday, Date | any>) => <TableHeader header={headerContext}
                label={'returnDate'}
            />,
            cell: (cellContext: CellContext<ContractReturningToday, Date | any>) => <TableCellDate cell={cellContext} />
        }),
        columnHelper.accessor('leavingDate', {
            header: (headerContext: HeaderContext<ContractReturningToday, Date | any>) => <TableHeader header={headerContext}
                label={'leavingDate'}
            />,
            cell: (cellContext: CellContext<ContractReturningToday, Date | any>) => <TableCellDate cell={cellContext} />
        }),
    ]

    return columns
}


const getData = (data: Contract[]): ContractReturningToday[] => {
    return data.map((contract: Contract) => {
        return {
            id: contract.id,
            name: contract.customer.name,
            customerNameSurname: contract.customer.name + ' ' + contract.customer.surname,
            carBrand: contract.car.model?.brand.name ?? '',
            carModel: contract.car.model?.name ?? '',
            carRegistrationPlate: contract.car.registrationPlate,
            leavingDate: contract.leavingDate,
            returnDate: contract.returnDate
        }
    })
}

export {
    getColumns,
    getData
}
