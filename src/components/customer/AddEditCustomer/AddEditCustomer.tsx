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
import { useTranslation } from "react-i18next";
import { ApiError } from "../../../api/errors";

interface AddEditCustomerProps {
  handleClose?: () => void;
}

const AddEditCustomer: FC<AddEditCustomerProps> = (
  props: AddEditCustomerProps
) => {
  const snackbarContext = useSnackbar();

  const { t } = useTranslation();

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
            type: "ERROR",
            data: {
              content: "errorLoadingCustomer",
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
        type: "ERROR",
        data: {
          content: "nameRequired",
        },
      });
      return false;
    }

    if (!surname) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "surnameRequired",
        },
      });
      return false;
    }

    if (!email) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "emailRequired",
        },
      });
      return false;
    }

    if (!phoneNumber) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "phoneNumberRequired",
        },
      });
      return false;
    }

    if (!idNumber) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "idNumberRequired",
        },
      });
      return false;
    }

    if (!idValidFrom) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "idValidFromRequired",
        },
      });
      return false;
    }

    if (!idValidTo) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "idValidToRequired",
        },
      });
      return false;
    }

    if (!drivingLicenseNumber) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "drivingLicenceNumberRequired",
        },
      });
      return false;
    }

    if (!drivingLicenseValidFrom) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "Driving license valid from is required",
        },
      });
      return false;
    }

    if (!drivingLicenseValidTo) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "drivingLicenceValidFromRequired",
        },
      });
      return false;
    }

    if (!street) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "streetRequired",
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
      postalCode: Number(postalCode),
      city: city,
      birthDate: (birthDate as Dayjs).toDate(),
      birthPlace: birthPlace,
    };

    if (params.id) {
      CustomerRepository.updateCustomer(customer)
        .then((response: Customer | undefined) => {
          if (response) {
            snackbarContext.dispatch({
              type: "OK",
              data: {
                content: "customerUpdated",
              },
            });

            navigate("..");
            return;
          }

          snackbarContext.dispatch({
            type: "ERROR",
            data: {
              content: "errorUpdatingCustomer",
            },
          });
        })
        .catch((error: ApiError) => {
          snackbarContext.dispatch({
            type: "ERROR",
            data: {
              content: "errorUpdatingCustomer",
            },
          });
        });
      return;
    }

    CustomerRepository.addCustomer(customer)
      .then((response: Customer | undefined) => {
        if (response) {
          snackbarContext.dispatch({
            type: "OK",
            data: {
              content: "customerCreated",
            },
          });

          navigate("..");
          return;
        }

        snackbarContext.dispatch({
          type: "ERROR",
          data: {
            content: "errorCreatingCustomer",
          },
        });
      })
      .catch((error: any) => {
        snackbarContext.dispatch({
          type: "ERROR",
          data: {
            content: "errorCreatingCustomer",
          },
        });
      });
  };

  const getDialogTitle = (): string => {
    return params.id ? "editCustomer" : "addCustomer";
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>
        {
          t(getDialogTitle())
        }
      </DialogTitle>
      <DialogContent>
        <Box className={"flex items-center"}>
          <TextField
            className={"!mr-2"}
            value={name}
            label={t("name")}
            onChange={handleNameChange}
            margin={"normal"}
            fullWidth={true}
          ></TextField>
          <TextField
            className={"!ml-2"}
            value={surname}
            label={t("surname")}
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
            label={t("phoneNumber")}
            onChange={handlePhoneNumberChange}
            fullWidth={true}
            margin={"normal"}
          ></TextField>
          <CheckboxWithLabel
            label={"isLegalPerson"}
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
          <FormControl fullWidth={true} margin={'normal'}>
            <DatePicker
              className={"!w-full !mr-2"}
              label={t("idValidFrom")}
              onChange={handleIdValidFromChange}
              value={idValidFrom}
            ></DatePicker>
          </FormControl>
          <FormControl fullWidth={true} margin={'normal'}>
            <DatePicker
              className={"!w-full !ml-2"}
              label={t("idValidTo")}
              onChange={handleIdValidFromChange}
              value={idValidFrom}
            ></DatePicker>
          </FormControl>
        </Box>
        <FormControl fullWidth={true} margin={'normal'}>
          <DatePicker
            className={"!w-full"}
            label={t("leavingDate")}
            onChange={handleIdValidToChange}
            value={idValidTo}
          ></DatePicker>
        </FormControl>


        <TextField
          className={"!w-full"}
          value={drivingLicenseNumber}
          label={t("drivingLicenseNumber")}
          onChange={handleDrivingLicenseNumberChange}
          margin={"normal"}
        ></TextField>

        <Box className={"flex items-center"} margin={"normal"}>
          <FormControl fullWidth={true} margin={'normal'}>

            <DatePicker
              className={"!w-full !mr-2"}
              label={t("drivingLicenseValidFrom")}
              onChange={handleDrivingLicenseValidFromChange}
              value={drivingLicenseValidFrom}
            ></DatePicker>
          </FormControl>
          <FormControl fullWidth={true} margin={'normal'}>

            <DatePicker
              className={"!w-full !ml-2"}
              label={t("drivingLicenseValidTo")}
              onChange={handleDrivingLicenseValidToChange}
              value={drivingLicenseValidTo}
            ></DatePicker>
          </FormControl>

        </Box>

        <TextField
          value={street}
          label={t("street")}
          onChange={handleStreetChange}
          fullWidth={true}
          margin={"normal"}
        ></TextField>
        <NumberInput
          label={t("postalCode")}
          required={true}
          value={postalCode}
          handleChange={handlePostalCodeChange}
        />
        <TextField
          value={city}
          label={t("city")}
          onChange={handleCityChange}
          fullWidth={true}
          margin={"normal"}
        ></TextField>

        <Box className={"!flex !items-center"}>
          <FormControl fullWidth={true} margin={"normal"} className={"!mr-2"}>
            <DatePicker
              className={"!w-full "}
              label={t("birthDate")}
              onChange={handleBirthDateChange}
              value={birthDate}
            ></DatePicker>
          </FormControl>
          <TextField
            className={"!ml-2"}
            value={birthPlace}
            label={t("birthPlace")}
            onChange={handleBirthPlaceChange}
            fullWidth={true}
            margin={"normal"}
          ></TextField>
        </Box>
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
  );
};
export default AddEditCustomer;
