import {
    Box,
    Button,
    Divider
} from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import './CarListPopoverActions.css'

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
        <Box className={'flex flex-col items-center content-center w-screen'}>
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
        </Box>
    )
}

export default CarListPopoverActions
