import {
    CellContext,
    ColumnDef,
    createColumnHelper,
    HeaderContext
} from '@tanstack/react-table'
import { FC } from 'react'
import { Contract } from '../../../models/contract'
import { contractId } from '../../../models/id'

interface ContractLeavingToday {
    id: contractId,
    name: string,
    customerNameSurname: string,
    carBrand: string,
    carModel: string,
    carRegistrationPlate: string,
    returnDate: Date,
    leavingDate: Date
}

const columnHelper = createColumnHelper<ContractLeavingToday>()
const getColumns = (): ColumnDef<ContractLeavingToday>[] => {
    const columns = [
        columnHelper.accessor('id', {
            header: (headerContext: HeaderContext<ContractLeavingToday, contractId | any>) =>
                <Header header={headerContext}
                    label={'id'}
                />,
            cell: (cellContext: CellContext<ContractLeavingToday, contractId | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('name', {
            header: (headerContext: HeaderContext<ContractLeavingToday, string | any>) => <Header header={headerContext}
                label={'name'}
            />,
            cell: (cellContext: CellContext<ContractLeavingToday, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('carBrand', {
            header: (headerContext: HeaderContext<ContractLeavingToday, string | any>) => <Header header={headerContext}
                label={'carBrand'}
            />,
            cell: (cellContext: CellContext<ContractLeavingToday, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('carModel', {
            header: (headerContext: HeaderContext<ContractLeavingToday, string | any>) => <Header header={headerContext}
                label={'carModel'}
            />,
            cell: (cellContext: CellContext<ContractLeavingToday, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('carRegistrationPlate', {
            header: (headerContext: HeaderContext<ContractLeavingToday, string | any>) => <Header header={headerContext}
                label={'carRegistrationPlate'}
            />,
            cell: (cellContext: CellContext<ContractLeavingToday, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('customerNameSurname', {
            header: (headerContext: HeaderContext<ContractLeavingToday, string | any>) => <Header header={headerContext}
                label={'customerNameSurname'}
            />,
            cell: (cellContext: CellContext<ContractLeavingToday, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('returnDate', {
            header: (headerContext: HeaderContext<ContractLeavingToday, Date | any>) => <Header header={headerContext}
                label={'returnDate'}
            />,
            cell: (cellContext: CellContext<ContractLeavingToday, Date | any>) => <CellDate cell={cellContext}/>
        }),
        columnHelper.accessor('leavingDate', {
            header: (headerContext: HeaderContext<ContractLeavingToday, Date | any>) => <Header header={headerContext}
                label={'leavingDate'}
            />,
            cell: (cellContext: CellContext<ContractLeavingToday, Date | any>) => <CellDate cell={cellContext}/>
        }),
    ]

    return columns
}

interface HeaderProps {
    header: HeaderContext<any, any>
    label: string
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
    return (
        <div>
            {
                props.label
            }
        </div>
    )
}

interface CellProps {
    cell: CellContext<any, any>
}

const Cell: FC<CellProps> = (props: CellProps) => {
    return (
        <div>
            {
                props.cell.getValue()
            }
        </div>
    )
}


interface CellDateProps {
    cell: CellContext<any, Date>
}

const CellDate: FC<CellDateProps> = (props: CellDateProps) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return (
        <div>
            {
                (props.cell.getValue() as Date).toLocaleString('sl-SI', options as any)
            }
        </div>
    )
}


const getData = (data: Contract[]): ContractLeavingToday[] => {
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
        } as ContractLeavingToday
    })
}

export {
    getColumns,
    getData
}
