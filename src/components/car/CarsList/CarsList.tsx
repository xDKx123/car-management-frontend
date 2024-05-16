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
import { getCarsTableData, getColumns } from './functions'

interface CarsListProps {
//    cars: Car[];
}

interface ContextMenuProps {
    visible: boolean
    top: number
    left: number
    row: Row<RowData> | null
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
