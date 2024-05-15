import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from '@mui/material'
import {
    ChangeEvent,
    FC,
    useEffect,
    useState
} from 'react'
import { useTranslation } from 'react-i18next'
import {
    useNavigate,
    useParams
} from 'react-router-dom'
import { CarRequest } from '../../../api/types'
import { Car } from '../../../models/car'
import {
    carBrandId,
    carModelId
} from '../../../models/id'
import { useCars } from '../../../providers/CarsProvider'
import { useSnackbar } from '../../../providers/SnackbarProvider'
import { CarRepository } from '../../../repositories/car'
import CheckboxWithLabel from '../../common/CheckboxWithLabel/CheckboxWithLabel'
import NumberInput from '../../common/NumberInput/NumberInput'
import StandardDialogActions from '../../common/StandardDialogActions/StandardDialogActions'
import CarBodyTypesAutocomplete from '../CarBodyTypesAutocomplete/CarBodyTypesAutocomplete'
import CarBrandsAutocomplete from '../CarBrandsAutocomplete/CarBrandsAutocomplete'
import CarFuelAutocomplete from '../CarFuelAutocomplete/CarFuelAutocomplete'
import CarModelsAutocomplete from '../CarModelsAutocomplete/CarModelsAutocomplete'
import CarTransmissionAutocomplete from '../CarTransmissionAutocomplete/CarTransmissionAutocomplete'
import VinInput from '../VinInput/VinInput'
import './AddEditCar.css'

interface AddEditCarProps {
    handleClose?: () => void
}

const AddEditCar: FC<AddEditCarProps> = (props: AddEditCarProps) => {
    const snackbarContext = useSnackbar()
    const carContext = useCars()

    const navigate = useNavigate()
    const params = useParams<{
        id?: string
    }>()

    const { t } = useTranslation()

    const [brand, setBrand] = useState<carBrandId>('')
    const [model, setModel] = useState<carModelId>('')
    const [carBodyType, setCarBodyType] = useState<string>('')
    const [carFuelType, setCarFuelType] = useState<string>('')
    const [carTransmission, setCarTransmission] = useState<string>('')
    const [vin, setVin] = useState<string>('')
    const [year, setYear] = useState<string>('')
    const [km, setKm] = useState<string>('')
    const [registrationPlate, setRegistrationPlate] = useState<string>('')
    const [kw, setKw] = useState<string>('')
    const [ccm, setCcm] = useState<string>('')
    const [numberOfDoors, setNumberOfDoors] = useState<string>('')
    const [numberOfSeats, setNumberOfSeats] = useState<string>('')
    const [fourWheelDrive, setFourWheelDrive] = useState<boolean>(false)
    const [heatedSeatsFront, setHeatedSeatsFront] = useState<boolean>(false)
    const [heatedSeatsRear, setHeatedSeatsRear] = useState<boolean>(false)
    const [heatedSteeringWheel, setHeatedSteeringWheel] = useState<boolean>(false)
    const [airConditioning, setAirConditioning] = useState<boolean>(false)
    const [cruiseControl, setCruiseControl] = useState<boolean>(false)
    const [adaptiveCruiseControl, setAdaptiveCruiseControl] = useState<boolean>(false)
    const [webasto, setWebasto] = useState<boolean>(false)
    const [androidAuto, setAndroidAuto] = useState<boolean>(false)
    const [appleCarPlay, setAppleCarPlay] = useState<boolean>(false)
    const [dabRadio, setDabRadio] = useState<boolean>(false)
    const [isoFix, setIsoFix] = useState<boolean>(false)
    const [pdcFront, setPdcFront] = useState<boolean>(false)
    const [pdcBack, setPdcBack] = useState<boolean>(false)
    const [rearCamera, setRearCamera] = useState<boolean>(false)
    const [towHook, setTowHook] = useState<boolean>(false)
    const [laneAssist, setLaneAssist] = useState<boolean>(false)

    useEffect(() => {
        if (params.id) {
            console.log('Edit car')

            if (carContext.state.cars.length === 0) {
                CarRepository.loadCars().then((cars: Car[] | undefined) => {
                    if (!cars) {
                        console.error('Error loading cars')
                        return
                    }

                    carContext.dispatch({
                        type: 'SET_CARS',
                        data: {
                            cars: cars
                        }
                    })
                })

                return
            }

            const car: Car | undefined = carContext.state.cars.find((car: Car) => car.id === params.id)

            if (!car) {
                console.error('Car not found')
                return
            }

            console.log('car', car)

            setBrand(car.model.brand.id)
            setModel(car.model.id)
            setCarBodyType(car.bodyType)
            setCarFuelType(car.fuel)
            setCarTransmission(car.transmission)
            setVin(car.vin)
            setYear(car.year.toString())
            setKm(car.km.toString())
            setRegistrationPlate(car.registrationPlate)
            setKw(car.kw.toString())
            setCcm(car.ccm.toString())
            setNumberOfDoors(car.numberOfDoors.toString())
            setNumberOfSeats(car.numberOfSeats.toString())
            setFourWheelDrive(car.fourWheelDrive)
            setHeatedSeatsFront(car.heatedSeatsFront)
            setHeatedSeatsRear(car.heatedSeatsRear)
            setHeatedSteeringWheel(car.heatedSteeringWheel)
            setAirConditioning(car.airConditioning)
            setCruiseControl(car.cruiseControl)
            setAdaptiveCruiseControl(car.adaptiveCruiseControl)
            setWebasto(car.webasto)
            setAndroidAuto(car.androidAuto)
            setAppleCarPlay(car.appleCarPlay)
            setDabRadio(car.dabRadio)
            setIsoFix(car.isoFix)
            setPdcFront(car.pdcFront)
            setPdcBack(car.pdcBack)
            setRearCamera(car.rearCamera)
            setTowHook(car.towHook)
            setLaneAssist(car.laneAssist)
        }
    }, [carContext.state.cars, params])

    const handleClose = (): void => {
        if (props.handleClose) {
            props.handleClose()
            return
        }
        console.log('Close dialog')
        navigate('..')
    }

    const handleSave = (): void => {
        console.log('Save car')

        const carData: CarRequest = {
            adaptiveCruiseControl: adaptiveCruiseControl,
            airConditioning: airConditioning,
            androidAuto: androidAuto,
            appleCarPlay: appleCarPlay,
            bodyType: carBodyType,
            ccm: Number(ccm),
            cruiseControl: cruiseControl,
            dabRadio: dabRadio,
            description: '',
            fuel: carFuelType,
            fuelCapacity: 0,
            heatedSeatsFront: heatedSeatsFront,
            heatedSeatsRear: heatedSeatsRear,
            heatedSteeringWheel: heatedSteeringWheel,
            id: params.id || '',
            isoFix: isoFix,
            kw: Number(kw),
            laneAssist: laneAssist,
            model: model,
            numberOfDoors: Number(numberOfDoors),
            numberOfSeats: Number(numberOfSeats),
            pdcBack: pdcBack,
            pdcFront: pdcFront,
            rearCamera: rearCamera,
            registrationPlate: registrationPlate,
            vin: vin,
            webasto: webasto,
            year: Number(year),
            km: Number(km),
            fourWheelDrive: fourWheelDrive,
            towHook: towHook,
            transmission: carTransmission,
            colorExterior: '',
            colorInterior: '',
            isFree: false,
        }

        if (params.id) {
            CarRepository.updateCar(carData).then((response: Car | undefined) => {
                snackbarContext.dispatch({
                    type: 'SET_SNACKBAR_OK',
                    data: {
                        content: 'Car saved'
                    }
                })
                handleClose()
            }).catch((error: any) => {
                snackbarContext.dispatch({
                    type: 'SET_SNACKBAR_ERROR',
                    data: {
                        content: 'Error saving car'
                    }
                })
            })
            return
        }

        CarRepository.addCar(carData).then((response: Car | undefined) => {
            snackbarContext.dispatch({
                type: 'SET_SNACKBAR_OK',
                data: {
                    content: 'Car saved'
                }
            })
            handleClose()
        }).catch((error: any) => {
            snackbarContext.dispatch({
                type: 'SET_SNACKBAR_ERROR',
                data: {
                    content: 'Error saving car'
                }
            })
        })
    }

    const handleCarBrandChange = (carBrandId: carBrandId) => {
        setBrand(carBrandId)
    }

    const handleCarModelChange = (carModelId: carModelId) => {
        setModel(carModelId)
    }

    const handleVinChange = (value: string) => {
        setVin(value)
    }

    const handleYearChange = (value: string) => {
        setYear(value)
    }

    const handleKmChange = (value: string) => {
        setKm(value)
    }

    const handleRegistrationPlateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRegistrationPlate(event.target.value)
    }

    const handleKwChange = (value: string) => {
        setKw(value)
    }

    const handleCcmChange = (value: string) => {
        setCcm(value)
    }

    const handleNumberOfDoorsChange = (value: string) => {
        setNumberOfDoors(value)
    }

    const handleNumberOfSeatsChange = (value: string) => {
        setNumberOfSeats(value)
    }

    const handleForWheelDriveChange = (value: boolean) => {
        setFourWheelDrive(value)
    }

    const handleHeatedSeatsFrontChange = (value: boolean) => {
        setHeatedSeatsFront(value)
    }

    const handleHeatedSeatsRearChange = (value: boolean) => {
        setHeatedSeatsRear(value)
    }

    const handleHeatedSteeringWheelChange = (value: boolean) => {
        setHeatedSteeringWheel(value)
    }

    const handleAirConditioningChange = (value: boolean) => {
        setAirConditioning(value)
    }

    const handleCruiseControlChange = (value: boolean) => {
        setCruiseControl(value)
    }

    const handleAdaptiveCruiseControlChange = (value: boolean) => {
        setAdaptiveCruiseControl(value)
    }

    const handleWebastoChange = (value: boolean) => {
        setWebasto(value)
    }

    const handleAndroidAutoChange = (value: boolean) => {
        setAndroidAuto(value)
    }

    const handleAppleCarPlayChange = (value: boolean) => {
        setAppleCarPlay(value)
    }

    const handleDabRadioChange = (value: boolean) => {
        setDabRadio(value)
    }

    const handleIsoFixChange = (value: boolean) => {
        setIsoFix(value)
    }

    const handlePdcFrontChange = (value: boolean) => {
        setPdcFront(value)
    }

    const handlePdcBackChange = (value: boolean) => {
        setPdcBack(value)
    }

    const handleRearCameraChange = (value: boolean) => {
        setRearCamera(value)
    }

    const handleTowHookChange = (value: boolean) => {
        setTowHook(value)
    }

    const handleLaneAssistChange = (value: boolean) => {
        setLaneAssist(value)
    }

    const handleCarBodyTypeChange = (value: string): void => {
        setCarBodyType(value)
    }

    const handleCarFuelTypeChange = (value: string): void => {
        setCarFuelType(value)
    }

    const handleCarTransmissionChange = (value: string): void => {
        setCarTransmission(value)
    }

    const getDialogTitle = (): string => {
        if (params.id) {
            return 'editCar'
        }

        return 'addCar'
    }

    return (
        <Dialog
            onClose={handleClose}
            open={true}
        >
            <DialogTitle>
                {
                    t(getDialogTitle())
                }
            </DialogTitle>
            <DialogContent>
                <CarBrandsAutocomplete handleChange={handleCarBrandChange}
                    value={brand}
                />
                <CarModelsAutocomplete carBrandId={brand}
                    handleChange={handleCarModelChange}
                    value={model}
                />
                <CarBodyTypesAutocomplete handleChange={handleCarBodyTypeChange}
                    value={carBodyType}
                />
                <CarFuelAutocomplete handleChange={handleCarFuelTypeChange}
                    value={carFuelType}
                />
                <CarTransmissionAutocomplete value={carTransmission}
                    handleChange={handleCarTransmissionChange}
                />
                <VinInput handleChange={handleVinChange}
                    value={vin}
                />
                <TextField
                    value={registrationPlate}
                    onChange={handleRegistrationPlateChange}
                    fullWidth={true}
                    required={true}
                    label={t('registrationPlate')}
                    margin={'normal'}
                />
                <NumberInput label={'year'}
                    required={true}
                    value={year}
                    handleChange={handleYearChange}
                />
                <NumberInput label={'km'}
                    required={true}
                    value={km}
                    handleChange={handleKmChange}
                />
                <NumberInput label={'kw'}
                    required={true}
                    value={kw}
                    handleChange={handleKwChange}
                />
                <NumberInput label={'ccm'}
                    required={true}
                    value={ccm}
                    handleChange={handleCcmChange}
                />
                <NumberInput label={'numberOfDoors'}
                    required={true}
                    value={numberOfDoors}
                    handleChange={handleNumberOfDoorsChange}
                />
                <NumberInput label={'numberOfSeats'}
                    required={true}
                    value={numberOfSeats}
                    handleChange={handleNumberOfSeatsChange}
                />
                <Grid container={true}
                    spacing={2}
                >
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'fourWheelDrive'}
                            value={fourWheelDrive}
                            onChange={handleForWheelDriveChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'heatedSeatsFront'}
                            value={heatedSeatsFront}
                            onChange={handleHeatedSeatsFrontChange}
                        />

                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'heatedSeatsRear'}
                            value={heatedSeatsRear}
                            onChange={handleHeatedSeatsRearChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'heatedSteeringWheel'}
                            value={heatedSteeringWheel}
                            onChange={handleHeatedSteeringWheelChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'airConditioning'}
                            value={airConditioning}
                            onChange={handleAirConditioningChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'cruiseControl'}
                            value={cruiseControl}
                            onChange={handleCruiseControlChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'adaptiveCruiseControl'}
                            value={adaptiveCruiseControl}
                            onChange={handleAdaptiveCruiseControlChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'webasto'}
                            value={webasto}
                            onChange={handleWebastoChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'androidAuto'}
                            value={androidAuto}
                            onChange={handleAndroidAutoChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'appleCarPlay'}
                            value={appleCarPlay}
                            onChange={handleAppleCarPlayChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'dabRadio'}
                            value={dabRadio}
                            onChange={handleDabRadioChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'isoFix'}
                            value={isoFix}
                            onChange={handleIsoFixChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'pdcFront'}
                            value={pdcFront}
                            onChange={handlePdcFrontChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'pdcBack'}
                            value={pdcBack}
                            onChange={handlePdcBackChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'rearCamera'}
                            value={rearCamera}
                            onChange={handleRearCameraChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'towHook'}
                            value={towHook}
                            onChange={handleTowHookChange}
                        />
                    </Grid>
                    <Grid item={true}
                        xs={6}
                    >
                        <CheckboxWithLabel label={'laneAssist'}
                            value={laneAssist}
                            onChange={handleLaneAssistChange}
                        />
                    </Grid>

                </Grid>
            </DialogContent>
            <StandardDialogActions
                primaryButtonProps={{
                    label: "save",
                    onClick: handleSave,
                }}
                secondaryButtonProps={{
                    label: "cancel",
                    onClick: handleClose,
                }}
            />
        </Dialog>
    )
}

export default AddEditCar
