import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Customer } from "../../../models/customer";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import { CustomerRepository } from "../../../repositories/customer";
import CheckboxWithLabel from "../../common/CheckboxWithLabel/CheckboxWithLabel";
import EmailInput from "../../common/EmailInput/EmailInput";
import IdNumberInput from "../../common/IdNumberInput/IdNumberInput";
import NumberInput from "../../common/NumberInput/NumberInput";
import "./AddEditCustomer.css";
import StandardDialogActions from "../../common/StandardDialogActions/StandardDialogActions";

interface AddEditCustomerProps {
  handleClose?: () => void;
}

const AddEditCustomer: FC<AddEditCustomerProps> = (
  props: AddEditCustomerProps
) => {
  const snackbarContext = useSnackbar();

  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLegalPerson, setIsLegalPerson] = useState<boolean>(false);
  const [idNumber, setIdNumber] = useState<string>("");
  const [idNumberError, setIdNumberError] = useState<boolean>(false);

  const [idValidFrom, setIdValidFrom] = useState<Dayjs | null>(null);
  const [idValidTo, setIdValidTo] = useState<Dayjs | null>(null);
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState<string>("");
  const [drivingLicenseValidFrom, setDrivingLicenseValidFrom] =
    useState<Dayjs | null>(null);
  const [drivingLicenseValidTo, setDrivingLicenseValidTo] =
    useState<Dayjs | null>(null);
  const [street, setStreet] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [birthPlace, setBirthPlace] = useState<string>("");

  //url params for id
  const params = useParams<{
    id?: string;
  }>();

  useEffect(() => {
    if (params.id) {
      CustomerRepository.getCustomerById(params.id)
        .then((response: Customer | undefined) => {
          if (response) {
            setName(response.name);
            setSurname(response.surname);
            setEmail(response.email);
            setPhoneNumber(response.phoneNumber);
            setIsLegalPerson(response.isLegalPerson);
            setIdNumber(response.idNumber);
            setIdValidFrom(dayjs(response.idValidFrom));
            setIdValidTo(dayjs(response.idValidTo));
            setDrivingLicenseNumber(response.drivingLicenseNumber);
            setDrivingLicenseValidFrom(dayjs(response.drivingLicenseValidFrom));
            setDrivingLicenseValidTo(dayjs(response.drivingLicenseValidTo));
            setStreet(response.street);
            setPostalCode(response.postalCode.toString());
            setCity(response.city);
            setBirthDate(dayjs(response.birthDate));
            setBirthPlace(response.birthPlace);
          }
        })
        .catch((error: any) => {
          console.log(error);
          snackbarContext.dispatch({
            type: "SET_SNACKBAR_ERROR",
            data: {
              content: "Error loading customer",
            },
          });
        });
    }
  }, []);

  const handleClose = (): void => {
    if (props.handleClose) {
      props.handleClose();
      return;
    }
    navigate("..");
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);
  };

  const handleSurnameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (email: string): void => {
    setEmail(email);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPhoneNumber(event.target.value);
  };

  const handleIsLegalPersonChange = (value: boolean): void => {
    setIsLegalPerson(value);
  };

  const handleIdNumberChange = (value: string): void => {
    setIdNumber(value);
  };

  const handleIdValidFromChange = (date: Dayjs | null): void => {
    setIdValidFrom(date);
  };

  const handleIdValidToChange = (date: Dayjs | null): void => {
    setIdValidTo(date);
  };

  const handleDrivingLicenseNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDrivingLicenseNumber(event.target.value);
  };

  const handleDrivingLicenseValidFromChange = (date: Dayjs | null): void => {
    setDrivingLicenseValidFrom(date);
  };

  const handleDrivingLicenseValidToChange = (date: Dayjs | null): void => {
    setDrivingLicenseValidTo(date);
  };

  const handleStreetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setStreet(event.target.value);
  };

  const handlePostalCodeChange = (value: string): void => {
    setPostalCode(value);
  };

  const handleCityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCity(event.target.value);
  };

  const handleBirthDateChange = (date: Dayjs | null): void => {
    setBirthDate(date);
  };

  const handleBirthPlaceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setBirthPlace(event.target.value);
  };

  const validateSave = (): boolean => {
    if (!name) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Name is required",
        },
      });
      return false;
    }

    if (!surname) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Surname is required",
        },
      });
      return false;
    }

    if (!email) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Email is required",
        },
      });
      return false;
    }

    if (!phoneNumber) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Phone number is required",
        },
      });
      return false;
    }

    if (!idNumber) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "ID number is required",
        },
      });
      return false;
    }

    if (!idValidFrom) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "ID valid from is required",
        },
      });
      return false;
    }

    if (!idValidTo) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "ID valid to is required",
        },
      });
      return false;
    }

    if (!drivingLicenseNumber) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Driving license number is required",
        },
      });
      return false;
    }

    if (!drivingLicenseValidFrom) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Driving license valid from is required",
        },
      });
      return false;
    }

    if (!drivingLicenseValidTo) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Driving license valid to is required",
        },
      });
      return false;
    }

    if (!street) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Street is required",
        },
      });
      return false;
    }

    return true;
  };

  const handleSave = (): void => {
    if (!validateSave()) {
      return;
    }

    const customer: Customer = {
      id: params.id ?? "",
      name: name,
      surname: surname,
      email: email,
      phoneNumber: phoneNumber,
      isLegalPerson: isLegalPerson,
      idNumber: idNumber,
      idValidFrom: (idValidFrom as Dayjs).toDate(),
      idValidTo: (idValidTo as Dayjs).toDate(),
      drivingLicenseNumber: drivingLicenseNumber,
      drivingLicenseValidFrom: (drivingLicenseValidFrom as Dayjs).toDate(),
      drivingLicenseValidTo: (drivingLicenseValidTo as Dayjs).toDate(),
      street: street,
      postalCode: parseInt(postalCode),
      city: city,
      birthDate: (birthDate as Dayjs).toDate(),
      birthPlace: birthPlace,
    };

    CustomerRepository.saveCustomer(customer)
      .then((response: Customer | undefined) => {
        if (response) {
          snackbarContext.dispatch({
            type: "SET_SNACKBAR_OK",
            data: {
              content: "Customer saved",
            },
          });

          navigate("..");
          return;
        }

        snackbarContext.dispatch({
          type: "SET_SNACKBAR_ERROR",
          data: {
            content: "Error saving customer",
          },
        });
      })
      .catch((error: any) => {
        snackbarContext.dispatch({
          type: "SET_SNACKBAR_ERROR",
          data: {
            content: "Error saving customer",
          },
        });
      });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Add/Edit Customer</DialogTitle>
      <DialogContent>
        <Box className={"flex items-center"}>
          <TextField
            className={"!mr-2"}
            value={name}
            label={"Name"}
            onChange={handleNameChange}
            margin={"normal"}
            fullWidth={true}
          ></TextField>
          <TextField
            className={"!ml-2"}
            value={surname}
            label={"Surname"}
            onChange={handleSurnameChange}
            margin={"normal"}
            fullWidth={true}
          ></TextField>
        </Box>
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
        <Box className={"flex items-center"}>
          <TextField
            className={"!mr-2"}
            value={phoneNumber}
            label={"Phone Number"}
            onChange={handlePhoneNumberChange}
            fullWidth={true}
            margin={"normal"}
          ></TextField>
          <CheckboxWithLabel
            label={"Is Legal Person"}
            value={isLegalPerson}
            onChange={handleIsLegalPersonChange}
            boxClassName={"!w-full !ml-2"}
          />
        </Box>
        <IdNumberInput
          value={idNumber}
          handleChange={handleIdNumberChange}
          error={idNumberError}
          setError={setIdNumberError}
        />

        <Box className={"flex items-center"}>
          <DatePicker
            className={"!w-full !mr-2"}
            label={"ID Valid from"}
            onChange={handleIdValidFromChange}
            value={idValidFrom}
          ></DatePicker>
          <DatePicker
            className={"!w-full !ml-2"}
            label={"ID Valid to"}
            onChange={handleIdValidFromChange}
            value={idValidFrom}
          ></DatePicker>
        </Box>
        <DatePicker
          className={"!w-full"}
          label={"leaving date"}
          onChange={handleIdValidToChange}
          value={idValidTo}
        ></DatePicker>

        <TextField
          className={"!w-full"}
          value={drivingLicenseNumber}
          label={"Driving License Number"}
          onChange={handleDrivingLicenseNumberChange}
        ></TextField>

        <Box className={"flex items-center"}>
          <DatePicker
            className={"!w-full !mr-2"}
            label={"Driving License Valid from"}
            onChange={handleDrivingLicenseValidFromChange}
            value={drivingLicenseValidFrom}
          ></DatePicker>
          <DatePicker
            className={"!w-full !ml-2"}
            label={"Driving License Valid to"}
            onChange={handleDrivingLicenseValidToChange}
            value={drivingLicenseValidTo}
          ></DatePicker>
        </Box>

        <TextField
          value={street}
          label={"Street"}
          onChange={handleStreetChange}
          fullWidth={true}
          margin={"normal"}
        ></TextField>
        <NumberInput
          label={"Postal Code"}
          required={true}
          value={postalCode}
          handleChange={handlePostalCodeChange}
        />
        <TextField
          value={city}
          label={"City"}
          onChange={handleCityChange}
          fullWidth={true}
          margin={"normal"}
        ></TextField>

        <Box className={"!flex !items-center"}>
          <FormControl fullWidth={true} margin={"normal"} className={"!mr-2"}>
            <DatePicker
              className={"!w-full "}
              label={"Birth Date"}
              onChange={handleBirthDateChange}
              value={birthDate}
            ></DatePicker>
          </FormControl>
          <TextField
            className={"!ml-2"}
            value={birthPlace}
            label={"Birth Place"}
            onChange={handleBirthPlaceChange}
            fullWidth={true}
            margin={"normal"}
          ></TextField>
        </Box>
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
  );
};
export default AddEditCustomer;
