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
import { CarBrand } from '../../../models/carBrand'
import { carBrandId } from '../../../models/id'
import { CarRepository } from '../../../repositories/car'
import './CarBrandsAutocomplete.css'
import CarBrandRepository from '../../../repositories/carBrand'

interface CarBrandsAutocompleteProps {
    handleChange: (carBrandId: carBrandId) => void
    value: carBrandId
}

const CarBrandsAutocomplete: FC<CarBrandsAutocompleteProps> = (props: CarBrandsAutocompleteProps) => {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<CarBrand[]>([])
    const [selectedCarBrand, setSelectedCarBrand] = useState<CarBrand | null>(
        () => props.value ? (options.find((carBrand: CarBrand) => carBrand.id === props.value) ?? null) : null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (props.value === '') {
            return
        }

        CarBrandRepository.loadCarBrands().then((carBrands: CarBrand[] | undefined) => {
            if (carBrands) {
                setOptions(carBrands)
                setLoading(false)
                setSelectedCarBrand(
                    props.value ? (carBrands.find((carBrand: CarBrand) => carBrand.id === props.value) ?? null) : null)
            }
        }).catch((error: any) => {
            console.error('Error loading car brands', error)
            setLoading(false)
        })
    }, [props.value])

    useEffect(() => {
        if (open) {
            setLoading(true)
            CarBrandRepository.loadCarBrands().then((carBrands: CarBrand[] | undefined) => {
                if (carBrands) {
                    setOptions(carBrands)
                    setLoading(false)
                }
            }).catch((error: any) => {
                console.error('Error loading car brands', error)
                setLoading(false)
            })
        }
    }, [open])

    const isOptionEqualToValue = (option: CarBrand, value: CarBrand) => option.id === value.id

    const getOptionLabel = (option: CarBrand) => option.name

    const handleChange = (event: any, value: CarBrand | null) => {
        if (value) {
            setSelectedCarBrand(value)
            props.handleChange(value.id)
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
            noOptionsText={'No car brands found'}
            loadingText={'Loading car brands'}
            renderInput={(params) => (
                <TextField
                    margin="dense"
                    {...params}
                    label="Car Brand"
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

export default CarBrandsAutocomplete
