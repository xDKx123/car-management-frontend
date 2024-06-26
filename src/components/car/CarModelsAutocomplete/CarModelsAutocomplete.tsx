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
import { CarModel } from '../../../models/carModel'
import {
    carBrandId,
    carModelId
} from '../../../models/id'
import { CarRepository } from '../../../repositories/car'
import './CarModelsAutocomplete.css'
import { CarModelRepository } from '../../../repositories/carModel'
import { useTranslation } from 'react-i18next'

interface CarBrandsAutocompleteProps {
    handleChange: (carModelId: carModelId) => void
    value: carModelId
    carBrandId: carBrandId
}

const CarBrandsAutocomplete: FC<CarBrandsAutocompleteProps> = (props: CarBrandsAutocompleteProps) => {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<CarModel[]>([])
    const [selectedCarModel, setSelectedCarModel] = useState<CarModel | null>(
        () => props.value ? (options.find((carModel: CarModel) => carModel.id === props.value) ?? null) : null)
    const [loading, setLoading] = useState<boolean>(false)

    const {t} = useTranslation()

    useEffect(() => {
        if (props.value === '') {
            return
        }

        CarModelRepository.loadCarModels(props.carBrandId).then((carBrands: CarModel[] | undefined) => {
            if (carBrands) {
                setOptions(carBrands)
                setLoading(false)
                setSelectedCarModel(
                    props.value ? (carBrands.find((carBrand: CarModel) => carBrand.id === props.value) ?? null) : null)
            }
        }).catch((error: any) => {
            console.error('Error loading car models', error)
            setLoading(false)
        })
    }, [props.value])

    useEffect(() => {
        if (open) {
            setLoading(true)
            CarModelRepository.loadCarModels(props.carBrandId).then((carBrands: CarModel[] | undefined) => {
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

    useEffect(() => {
        setSelectedCarModel(null)
        setOptions([])
    }, [props.carBrandId])

    const isOptionEqualToValue = (option: CarModel, value: CarModel) => option.id === value.id

    const getOptionLabel = (option: CarModel) => option.name

    const handleChange = (event: any, value: CarModel | null) => {
        if (value) {
            setSelectedCarModel(value)
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
            value={selectedCarModel}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            options={options}
            loading={loading}
            onChange={handleChange}
            fullWidth={true}
            noOptionsText={t('noData')}
            loadingText={t('loading')}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        label={t('carModel')}
                        margin={'normal'}
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
                )
            }}
        />
    )
}

export default CarBrandsAutocomplete
