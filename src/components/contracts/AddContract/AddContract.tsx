import { Add } from '@mui/icons-material'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import React, {
    FC,
    useEffect,
    useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { Contract } from '../../../models/contract'
import { Customer } from '../../../models/customer'
import { useSnackbar } from '../../../providers/SnackbarProvider'
import { ContractRepository } from '../../../repositories/contract'
import AddEditCar from '../../car/AddEditCar/AddEditCar'
import AddEditCustomer from '../../customer/AddEditCustomer/AddEditCustomer'
import CustomAutocomplete from '../../customer/CustomAutocomplete/CustomAutocomplete'
import CustomerAutocomplete from '../../customer/CustomerAutocomplete/CustomerAutocomplete'
import './AddContract.css'
import StandardDialogActions from '../../common/StandardDialogActions/StandardDialogActions'

interface AddContractProps {
}

const AddContract: FC<AddContractProps> = () => {
    const snackbarContext = useSnackbar()
    const navigate = useNavigate()
    const queryParameters = new URLSearchParams(window.location.search)
    const contractId = queryParameters.get('id')
    const carId = queryParameters.get('carId')

    const [customer, setCustomer] = useState<Customer | null>(null)
    const [description, setDescription] = useState('')
    const [car, setCar] = useState<string>(carId ?? '')
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null)
    const [leavingDate, setLeavingDate] = useState<Dayjs | null>(null)

    const [showAddEditCustomer, setShowAddEditCustomer] = useState(false)
    const [showAddEditCar, setShowAddEditCar] = useState(false)


    useEffect(() => {
        const getContract = (contractIdParam: string) => {
            ContractRepository.getContract(contractIdParam).then((value: Contract | undefined) => {
                if (!value) {
                    snackbarContext.dispatch({
                        type: 'SET_SNACKBAR_ERROR',
                        data: {
                            content: 'No contract data'
                        }
                    })
                    return
                }
                console.log(value)
            }).catch((error: any) => {
                snackbarContext.dispatch({
                    type: 'SET_SNACKBAR_ERROR',
                    data: {
                        content: 'Error getting contract data'
                    }
                })
            })
        }

        if (carId) {
            console.log('carId', carId)
            setCar(carId)
        }
        if (contractId) {
            getContract(contractId)
        }

    }, [])
    const handleClose = () => {
        navigate('..')
    }


    const getDialogContent = () => {
        if (contractId) {
            return 'Edit Contract'
        }
        return 'Add Contract'
    }

    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const onCarChange = (value: string): void => {
        setCar(value)
    }

    const onReturnDateChange = (date: Dayjs | null) => {
        setReturnDate(date)
    }

    const onLeavingDateChange = (date: Dayjs | null) => {
        setLeavingDate(date)
    }

    const handleSave = () => {
        if (!leavingDate) {
            snackbarContext.dispatch({
                type: 'SET_SNACKBAR_ERROR',
                data: {
                    content: 'Leaving date is required'
                }
            })
            return
        }

        if (!returnDate) {
            snackbarContext.dispatch({
                type: 'SET_SNACKBAR_ERROR',
                data: {
                    content: 'Return date is required'
                }
            })
            return
        }

        if (!customer) {
            snackbarContext.dispatch({
                type: 'SET_SNACKBAR_ERROR',
                data: {
                    content: 'Customer is required'
                }
            })
            return
        }

        const contract: any = {
            name: 'test',
            id: contractId ?? '',
            carId: car,
            customerId: customer.id,
            leavingDate: leavingDate.toDate(),
            returnDate: returnDate.toDate(),
        }

        ContractRepository.addContract(contract).then((value: Contract | undefined) => {
            if (!value) {
                snackbarContext.dispatch({
                    type: 'SET_SNACKBAR_ERROR',
                    data: {
                        content: 'Error adding contract'
                    }
                })
                return
            }
            snackbarContext.dispatch({
                type: 'SET_SNACKBAR_OK',
                data: {
                    content: 'Contract added'
                }
            })
            handleClose()
        }).catch((error: any) => {
            snackbarContext.dispatch({
                type: 'SET_SNACKBAR_ERROR',
                data: {
                    content: 'Error adding contract'
                }
            })
        })
    }

    const setSelectedCustomer = (value: Customer): void => {
        console.log('setSelectedCustomer', value)
        setCustomer(value)
    }

    const handleAddCustomer = (): void => {
        setShowAddEditCustomer(true)
    }

    const handleAddCar = (): void => {
        setShowAddEditCar(true)
    }

    const handleAddEditCustomerClose = (): void => {
        setShowAddEditCustomer(false)
    }

    const handleAddEditCarClose = (): void => {
        setShowAddEditCar(false)
    }

    return (
        <>
            {
                showAddEditCustomer && <AddEditCustomer handleClose={handleAddEditCustomerClose}/>
            }
            {
                showAddEditCar && <AddEditCar handleClose={handleAddEditCarClose}/>
            }
            <Dialog open={true}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'md'}
                scroll={'paper'}
            >
                <DialogTitle>
                    {
                        getDialogContent()
                    }
                </DialogTitle>
                <DialogContent>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                    >
                        <CustomerAutocomplete selectedCustomer={customer}
                            setSelectedCustomer={setSelectedCustomer}
                        />
                        <IconButton
                            onClick={handleAddCustomer}
                        >
                            <Add/>
                        </IconButton>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                    >
                        <CustomAutocomplete selectedCar={car}
                            setSelectedCar={onCarChange}
                        />
                        <IconButton
                            onClick={handleAddCar}
                        >
                            <Add/>
                        </IconButton>
                    </div>


                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                    >

                        <DateTimePicker
                            label={'return date'}
                            onChange={onReturnDateChange}
                            value={returnDate}
                        ></DateTimePicker>
                        <DateTimePicker
                            label={'leaving date'}
                            onChange={onLeavingDateChange}
                            value={leavingDate}
                        ></DateTimePicker>

                    </div>
                    <TextField
                        fullWidth={true}
                        value={description}
                        onChange={onDescriptionChange}
                        label={'description'}
                    ></TextField>
                </DialogContent>
                <StandardDialogActions
                    primaryButtonProps={{
                        label: "Save",
                        onClick: handleSave,
                    }}
                    secondaryButtonProps={{
                        label: "Cancel",
                        onClick: handleClose,
                    }}
                />
            </Dialog>
        </>
    )
}

export default AddContract
