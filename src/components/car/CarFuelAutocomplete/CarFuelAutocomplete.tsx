import {
    Autocomplete,
    CircularProgress,
    TextField
} from '@mui/material'
import {
    FC,
    useEffect,
    useState
} from 'react'
import { CarRepository } from '../../../repositories/car'
import './CarFuelAutocomplete.css'

interface CarFuelAutocompleteProps {
    handleChange: (carFuel: string) => void
    value: string
}

const CarFuelAutocomplete: FC<CarFuelAutocompleteProps> = (props: CarFuelAutocompleteProps) => {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<string[]>([])
    const [selectedCarBrand, setSelectedCarBrand] = useState<string | null>(
        () => props.value ? (options.find((carBodyType: string) => carBodyType === props.value) ?? null) : null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setSelectedCarBrand(props.value)
    }, [props.value])

    useEffect(() => {
        if (open) {
            setLoading(true)
            CarRepository.loadCarFuelTypes().then((carBodyTypes: string[] | undefined) => {
                if (carBodyTypes) {
                    setOptions(carBodyTypes)
                    setLoading(false)
                }
            }).catch((error: any) => {
                console.error('Error loading car brands', error)
                setLoading(false)
            })
        }
    }, [open])

    const isOptionEqualToValue = (option: string, value: string) => option === value

    const getOptionLabel = (option: string) => option

    const handleChange = (event: any, value: string | null) => {
        if (value) {
            setSelectedCarBrand(value)
            props.handleChange(value)
        }
    }

    return (
        <Autocomplete
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            value={selectedCarBrand}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            options={options}
            loading={loading}
            onChange={handleChange}
            fullWidth={true}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Car Fuel Type"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit"
                                    size={20}
                                /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    )
}

export default CarFuelAutocomplete
