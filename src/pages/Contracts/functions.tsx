import React, {FC} from 'react'
import {
    CellContext,
    ColumnDef,
    createColumnHelper,
    HeaderContext
} from '@tanstack/react-table'
import {contractId} from '../../models/id'
import {Contract} from '../../models/contract'


interface ContractTable {
    id: contractId,
    name: string,
    customerNameSurname: string,
    carBrand: string,
    carModel: string,
    carRegistrationPlate: string,
    returnDate: Date,
    leavingDate: Date
}

const columnHelper = createColumnHelper<ContractTable>()
const getColumns = (): ColumnDef<ContractTable>[] => {
    const columns = [
        columnHelper.accessor('id', {
            header: (headerContext: HeaderContext<ContractTable, contractId | any>) =>
                <Header header={headerContext}
                    label={'id'}
                />,
            cell: (cellContext: CellContext<ContractTable, contractId | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('name', {
            header: (headerContext: HeaderContext<ContractTable, string | any>) => <Header header={headerContext}
                label={'name'}
            />,
            cell: (cellContext: CellContext<ContractTable, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('carBrand', {
            header: (headerContext: HeaderContext<ContractTable, string | any>) => <Header header={headerContext}
                label={'carBrand'}
            />,
            cell: (cellContext: CellContext<ContractTable, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('carModel', {
            header: (headerContext: HeaderContext<ContractTable, string | any>) => <Header header={headerContext}
                label={'carModel'}
            />,
            cell: (cellContext: CellContext<ContractTable, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('carRegistrationPlate', {
            header: (headerContext: HeaderContext<ContractTable, string | any>) => <Header header={headerContext}
                label={'carRegistrationPlate'}
            />,
            cell: (cellContext: CellContext<ContractTable, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('customerNameSurname', {
            header: (headerContext: HeaderContext<ContractTable, string | any>) => <Header header={headerContext}
                label={'customerNameSurname'}
            />,
            cell: (cellContext: CellContext<ContractTable, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('returnDate', {
            header: (headerContext: HeaderContext<ContractTable, Date | any>) => <Header header={headerContext}
                label={'returnDate'}
            />,
            cell: (cellContext: CellContext<ContractTable, Date | any>) => <CellDate cell={cellContext}/>
        }),
        columnHelper.accessor('leavingDate', {
            header: (headerContext: HeaderContext<ContractTable, Date | any>) => <Header header={headerContext}
                label={'leavingDate'}
            />,
            cell: (cellContext: CellContext<ContractTable, Date | any>) => <CellDate cell={cellContext}/>
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


type TableData = {
    data: any,
    allData: number
}


const generateData = (data: Contract[]): ContractTable[] => {
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
        } as ContractTable
    })
}
const getData = (data: Contract[], allData: number): TableData => {
    if (!data || data.length === 0) {
        return {
            data: [],
            allData: 0
        }
    }

    return {
        data: generateData(data),
        allData: allData
    }
}

export {
    getColumns,
    getData
}

export type {
    TableData,
    ContractTable
}