import { Popover } from '@mui/material'
import {
    CellContext,
    HeaderContext,
    Row,
    RowData,
    createColumnHelper
} from '@tanstack/react-table'
import React, {
    FC,
    useMemo,
    useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import { Car } from '../../../models/car'
import { useCars } from '../../../providers/CarsProvider'
import Table from '../../common/Table/Table'
import CarListPopoverActions from '../CarListPopoverActions/CarListPopoverActions'
import './CarsList.css'

interface CarsListProps {
//    cars: Car[];
}

interface CarTableMode {
    id: string;
    carModelBrand: string;
    brand: string;
    model: string;
    registrationPlate: string;
    description: string;
    fuel: string;
    bodyType: string;
}

const getCarsTableData = (cars: Car[]): CarTableMode[] => {
    if (!cars) {
        return []
    }

    console.log('cars', cars)

    return cars.map((car: Car) => {
        return {
            ...car,
            id: car.id,
            carModelBrand: car.model.brand?.name + ' ' + car.model.name,
            brand: car.model.brand?.name ?? '',
            model: car.model.name,
            registrationPlate: car.registrationPlate,
            description: car.description,
            fuel: car.fuel,
            bodyType: car.bodyType
        }
    })
}


const columnHelper = createColumnHelper<CarTableMode>()

const getColumns = () => {
    const columns = [
        columnHelper.accessor('registrationPlate', {
            header: (headerContext: HeaderContext<CarTableMode, any>) => <Header header={headerContext}
                label={'registrationPlate'}
            />,
            cell: (cellContext: CellContext<CarTableMode, any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('carModelBrand', {
            header: (headerContext: HeaderContext<CarTableMode, any>) => <Header header={headerContext}
                label={'brand'}
            />,
            cell: (cellContext: CellContext<CarTableMode, any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('registrationPlate', {
            header: (headerContext: HeaderContext<CarTableMode, any>) => <Header header={headerContext}
                label={'registrationPlate'}
            />,
            cell: (cellContext: CellContext<CarTableMode, any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('fuel', {
            header: (headerContext: HeaderContext<CarTableMode, any>) => <Header header={headerContext}
                label={'fuel'}
            />,
            cell: (cellContext: CellContext<CarTableMode, any>) => <Cell cell={cellContext}/>
        }),
        columnHelper.accessor('bodyType', {
            header: (headerContext: HeaderContext<CarTableMode, any>) => <Header header={headerContext}
                label={'bodyType'}
            />,
            cell: (cellContext: CellContext<CarTableMode, any>) => <Cell cell={cellContext}/>
        })
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

interface ContextMenuProps {
    visible: boolean
    top: number
    left: number
    row: Row<RowData> | null
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

const CarsList: FC<CarsListProps> = () => {
    const carsContext = useCars()
    const navigate = useNavigate()

    const data = useMemo(() => getCarsTableData(carsContext.state.cars), [carsContext.state.cars])
    const columns = useMemo(() => getColumns(), [])

    const [contextMenu, setContextMenu] = useState<ContextMenuProps>({
        visible: false,
        top: 0,
        left: 0,
        row: null
    })

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
                    <CarListPopoverActions carId={(contextMenu.row.original as any).id}/>
                </Popover>
            }
            <Table
                columns={columns}
                data={data}
                onContextMenu={onContextMenu}
            ></Table>
        </>
    )
}

export default CarsList
