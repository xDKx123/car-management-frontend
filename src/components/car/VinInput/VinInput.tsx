import { TextField } from '@mui/material'
import React, {
    FC,
    useDeferredValue,
    useEffect,
    useState
} from 'react'
import { CarRepository } from '../../../repositories/car'
import './VinInput.css'
import { useTranslation } from 'react-i18next'

interface VinInputProps {
    handleChange: (vin: string) => void
    value: string
}

const VinInput: FC<VinInputProps> = (props: VinInputProps) => {
    const [vin, setVin] = useState<string>(props.value || '')
    const vinDeferred = useDeferredValue(vin)
    const [isValidVin, setIsValidVin] = useState<boolean>(false)

    const { t } = useTranslation()

    useEffect(() => {
        setVin(props.value)
    }, [props.value])

    useEffect(() => {
        const checkIsValidVin = async (value: string): Promise<void> => {
            CarRepository.isValidVin(value).then((result: boolean | undefined) => {
                if (!result) {
                    setIsValidVin(false)
                    props.handleChange('')
                    return
                }

                setIsValidVin(true)
                props.handleChange(value)
            }).catch((error: any) => {
                console.error('Error checking VIN', error)
                props.handleChange('')
                setIsValidVin(false)
            })
        }

        if (props.value !== vin) {
            checkIsValidVin(vinDeferred)
        }

    }, [vinDeferred])

    const handleVinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVin(event.target.value)
    }

    return (
        <TextField
            value={vin}
            onChange={handleVinChange}
            label={t('vin')}
            margin={'normal'}
            fullWidth={true}
            required={true}
            error={!isValidVin}
        />
    )
}

export default VinInput
