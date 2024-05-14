import React, {FC} from 'react'
import './CarListPopoverActions.css'
import {useNavigate} from 'react-router-dom'
import {
    Button,
    Divider
} from '@mui/material'

interface CarListPopoverActionsProps {
    carId: string
}

const CarListPopoverActions: FC<CarListPopoverActionsProps> = (props: CarListPopoverActionsProps) => {
    const navigate = useNavigate()

    const editCarDataButtonClickHandler = (): void => {
        navigate('car/' + props.carId)
    }
    const newContractButtonClickHandler = (): void => {
        navigate('contracts/new?carId=' + props.carId)
    }

    return (
        <div className={'car-list-popover-actions'}>
            <Button
                onClick={editCarDataButtonClickHandler}
            >
                Edit Car Data
            </Button>
            <Divider variant="middle"
                orientation={'horizontal'}
                style={{
                    width: '100%'
                }}
            />
            <Button
                onClick={newContractButtonClickHandler}
            >
                New Contract
            </Button>
        </div>
    )
}

export default CarListPopoverActions
