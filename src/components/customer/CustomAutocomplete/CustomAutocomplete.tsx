import {
    Autocomplete,
    AutocompleteRenderInputParams,
    TextField
} from '@mui/material'
import React, {
    FC,
    useEffect,
    useState
} from 'react'
import { Car } from '../../../models/car'
import { useCars } from '../../../providers/CarsProvider'
import './CustomAutocomplete.css'

interface CustomAutocompleteProps {
    selectedCar: string,
    setSelectedCar: (value: string) => void
}

const CustomAutocomplete: FC<CustomAutocompleteProps> = (props: CustomAutocompleteProps) => {
    const carsContext = useCars()

    //const [options, setOptions] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedCar, setSelectedCar] = useState<Car | undefined>(
        props.selectedCar ? carsContext.state.cars.find((car: Car) => car.id === props.selectedCar) : undefined)
    const [inputValue, setInputValue] = React.useState('')
    //const [defaultValue, setDefaultValue] = useState<Car | undefined>(undefined)


    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            console.log('car', carsContext.state.cars.find((car: Car) => car.id === props.selectedCar))
            setSelectedCar(carsContext.state.cars.find((car: Car) => car.id === props.selectedCar))
        }

        if (props.selectedCar) {
            fetchData()
        }
    }, [props.selectedCar])

    const getOptionLabel = (option: Car): string => {
        return option.registrationPlate + ' - ' + option.model.brand?.name + ' ' +
               option.model.name
    }

    const groupBy = (option: Car): string => {
        return option.model.brand?.name ?? ''
    }

    const isOptionEqualToValue = (option: Car, value: Car): boolean => {
        return option.id === value.id
    }

    const onChange = (event: any, value: Car | null): void => {
        if (value) {
            setSelectedCar(value)
            props.setSelectedCar(value.id)
        }
    }

    return (
        <Autocomplete
            style={{
                width: '100% !important',
            }}
            options={carsContext.state.cars}
            open={open}
            //defaultValue={defaultValue}
            onChange={onChange}
            isOptionEqualToValue={isOptionEqualToValue}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            groupBy={groupBy}
            getOptionLabel={getOptionLabel}
            value={selectedCar}
            renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField {...params} label="Car"/>
            )}
        />
    )

}
export default CustomAutocomplete
