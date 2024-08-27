import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmailInput from '../../common/EmailInput/EmailInput';
import './AddEditEmployee.css';

interface AddEditEmployeeProps {}

const AddEditEmployee: FC<AddEditEmployeeProps> = () => {
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [postalCode, setPostalCode] = useState<number>(0)
  const [city, setCity] = useState<string>('')
  const [birthDate, setBirthDate] = useState<Date>(new Date())
  const [birthPlace, setBirthPlace] = useState<string>('')

  const params = useParams<{
    id?: string
  }>()

  const getDialogTitle = () => {
    if (params.id) {
      return 'Edit employee'
    } else {
      return 'Add employee'
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
  }

  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value)
  }

  const handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(parseInt(event.target.value))
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(new Date(event.target.value))
  }

  const handleBirthPlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthPlace(event.target.value)
  }


  return (
    <Dialog open={true}>
      <DialogTitle>{getDialogTitle()}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          label="Surname"
          value={surname}
          onChange={handleSurnameChange}
        />
        <EmailInput
          handleChange={handleEmailChange}
          value={email}
          error={emailError}
          setError={setEmailError}
          textFieldProps={{
            fullWidth: true,
            margin: "normal",
          }}
        />

      </DialogContent>
    </Dialog>
  )
}

export default AddEditEmployee;
