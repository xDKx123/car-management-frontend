import React, {FC} from 'react'
import {
    CellContext,
    ColumnDef,
    createColumnHelper,
    HeaderContext
} from '@tanstack/react-table'
import {
    contractId,
    customerId
} from '../../models/id'
import {Customer} from '../../models/customer'


interface CustomerTable {
    id: customerId,
    name: string,
    surname: string,
    email: string,
    phone: string,
}

const columnHelper = createColumnHelper<CustomerTable>()
const getColumns = (): ColumnDef<CustomerTable>[] => {
    const columns = [
        columnHelper.accessor('id', {
            header: (headerContext: HeaderContext<CustomerTable, contractId | any>) =>
                <Header header={headerContext}
                    label={'id'}
                />,
            cell: (cellContext: CellContext<CustomerTable, contractId | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('name', {
            header: (headerContext: HeaderContext<CustomerTable, string | any>) => <Header header={headerContext}
                label={'name'}
            />,
            cell: (cellContext: CellContext<CustomerTable, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('surname', {
            header: (headerContext: HeaderContext<CustomerTable, string | any>) => <Header header={headerContext}
                label={'surname'}
            />,
            cell: (cellContext: CellContext<CustomerTable, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('email', {
            header: (headerContext: HeaderContext<CustomerTable, string | any>) => <Header header={headerContext}
                label={'email'}
            />,
            cell: (cellContext: CellContext<CustomerTable, string | any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('phone', {
            header: (headerContext: HeaderContext<CustomerTable, string | any>) => <Header header={headerContext}
                label={'phone'}
            />,
            cell: (cellContext: CellContext<CustomerTable, string | any>) => <Cell cell={cellContext}/>
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


const generateData = (data: Customer[]): CustomerTable[] => {
    return data.map((customer: Customer) => {
        return {
            id: customer.id,
            name: customer.name,
            surname: customer.surname,
            email: customer.email,
            phone: customer.phoneNumber
        } as CustomerTable
    })
}
const getData = (data: Customer[], allData: number): TableData => {
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
    CustomerTable
}