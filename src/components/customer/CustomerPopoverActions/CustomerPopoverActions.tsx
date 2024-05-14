import { Button } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { customerId } from '../../../models/id'
import './CustomerPopoverActions.css'

interface CustomerPopoverActionsProps {
    customerId: customerId;
}

const CustomerPopoverActions: FC<CustomerPopoverActionsProps> = (props: CustomerPopoverActionsProps) => {
    const navigate = useNavigate()

    const updateContractButtonClickHandler = (): void => {
        navigate('customer/' + props.customerId)
    }

    return <>
        <Button
            onClick={updateContractButtonClickHandler}
        >
            Update Customer
        </Button>
    </>
}

export default CustomerPopoverActions
