import {
    Autocomplete,
    AutocompleteRenderInputParams,
    CircularProgress,
    TextField
} from '@mui/material'
import React, {
    FC,
    useEffect,
    useState
} from 'react'
import { Customer } from '../../../models/customer'
import { CustomerRepository } from '../../../repositories/customer'
import './CustomerAutocomplete.css'
import { useTranslation } from 'react-i18next'

interface CustomerAutocompleteProps {
    setSelectedCustomer: (value: Customer) => void
    selectedCustomer: Customer | null
}

const CustomerAutocomplete: FC<CustomerAutocompleteProps> = (props: CustomerAutocompleteProps) => {
    const [options, setOptions] = useState<readonly Customer[]>([])
    //const [value, setValue] = useState<Customer | null>(null)
    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false)

    const { t } = useTranslation()

    useEffect(() => {
        const loadData = async (): Promise<void> => {
            setLoading(true)
            CustomerRepository.loadCustomers().then((response) => {
                if (response) {
                    setOptions(response.data)
                }
                setLoading(false)
            }).catch((error: any) => {
                setLoading(false)
                console.error('Error loading customers', error)
            })
        }

        loadData()
    }, [])

    const getOptionLabel = (option: Customer): string => {
        return option.name + ' ' + option.surname
    }

    const onChange = (event: any, value: Customer | null): void => {
        if (value) {
            //setValue(value)
            //props.setSelectedCar(value.id)
            props.setSelectedCustomer(value)
        }
    }

    const isOptionEqualToValue = (option: Customer, value: Customer): boolean => {
        return option.id === value.id
    }


    return (
        <Autocomplete
            value={props.selectedCustomer}
            open={open}
            onChange={onChange}
            isOptionEqualToValue={isOptionEqualToValue}
            noOptionsText={t('noData')}
            loadingText={t('loading')}
            renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                    {...params}
                    label={t('customer')}
                    margin={'normal'}
                    fullWidth={true}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit"
                                    size={20}
                                /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            options={options}
            onOpen={() => {
                setOpen(true)
            }}
            getOptionLabel={getOptionLabel}
            loading={loading}
            onClose={() => {
                setOpen(false)
            }}
        />
    )
}

export default CustomerAutocomplete
