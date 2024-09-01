import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmailInput from "../../common/EmailInput/EmailInput";
import "./AddEditEmployee.css";
import StandardDialogActions from "../../common/StandardDialogActions/StandardDialogActions";
import { Employee } from "../../../models/employee";
import { EmployeeRepository } from "../../../repositories/employee.repository";
import { useSnackbar } from "../../../providers/SnackbarProvider";

interface AddEditEmployeeProps {}

const AddEditEmployee: FC<AddEditEmployeeProps> = () => {
  const snackbarContext = useSnackbar();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [birthPlace, setBirthPlace] = useState<string>("");

  const navigate = useNavigate();

  const params = useParams<{
    id?: string;
  }>();

  useEffect(() => {
    if (params.id) {
      EmployeeRepository.getById(params.id)
        .then((value: Employee) => {
          if (!value) {
            snackbarContext.dispatch({
              type: "ERROR",
              data: {
                content: "errorLoadingEmployee",
              },
            });
            return;
          }

          setName(value.name);
          setSurname(value.surname);
          setEmail(value.email);
          setPhoneNumber(value.phoneNumber);
          setStreet(value.street);
          setPostalCode(value.postalCode.toString());
          setCity(value.city);
          setBirthDate(value.birthDate);
          setBirthPlace(value.birthPlace);
        })
        .catch((error: any) => {
          snackbarContext.dispatch({
            type: "ERROR",
            data: {
              content: "errorLoadingEmployee",
            },
          });
        });
    }
  }, []);

  const getDialogTitle = () => {
    if (params.id) {
      return "Edit employee";
    } else {
      return "Add employee";
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
  };

  const handlePostalCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPostalCode(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBirthDate(new Date(event.target.value));
  };

  const handleBirthPlaceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBirthPlace(event.target.value);
  };

  const handleSave = async (): Promise<void> => {
    const parsedPostalCode = postalCode ? parseInt(postalCode) : undefined;

    if (
      !name ||
      !surname ||
      !email ||
      !phoneNumber ||
      !street ||
      !parsedPostalCode ||
      !city ||
      !birthDate ||
      !birthPlace
    ) {
      return;
    }

    const employee: Partial<Employee> = {
      id: params.id,
      city: city,
      birthDate: birthDate,
      birthPlace: birthPlace,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      postalCode: parsedPostalCode,
      street: street,
      surname: surname,
    };

    if (params.id) {
      // edit employee

      EmployeeRepository.update(employee)
        .then((value: Employee) => {
          if (!value) {
            snackbarContext.dispatch({
              type: "ERROR",
              data: {
                content: "errorUpdatingEmployee",
              },
            });
            return;
          }
          snackbarContext.dispatch({
            type: "OK",
            data: {
              content: "employeeUpdated",
            },
          });
          handleClose();
        })
        .catch((error: any) => {
          snackbarContext.dispatch({
            type: "ERROR",
            data: {
              content: "errorUpdatingEmployee",
            },
          });
        });

      return;
    }

    EmployeeRepository.add(employee)
      .then((value: Employee) => {
        if (!value) {
          snackbarContext.dispatch({
            type: "ERROR",
            data: {
              content: "errorAddingEmployee",
            },
          });
          return;
        }
        snackbarContext.dispatch({
          type: "OK",
          data: {
            content: "employeeAdded",
          },
        });
        handleClose();
      })
      .catch((error: any) => {
        snackbarContext.dispatch({
          type: "ERROR",
          data: {
            content: "errorAddingEmployee",
          },
        });
      });
  };

  const handleClose = () => {
    navigate("..");
  };

  return (
    <Dialog open={true}>
      <DialogTitle>{getDialogTitle()}</DialogTitle>
      <DialogContent>
        <Box className={"flex flex-row"}>
          <TextField
            label="Name"
            fullWidth={true}
            value={name}
            margin={"normal"}
            onChange={handleNameChange}
            className={"!mr-2"}
          />
          <TextField
            label="Surname"
            value={surname}
            fullWidth={true}
            margin={"normal"}
            onChange={handleSurnameChange}
            className={"!ml-2"}
          />
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
        <TextField
          label="Phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          fullWidth={true}
          margin={"normal"}
        />
        <TextField
          label="Street"
          value={street}
          onChange={handleStreetChange}
          fullWidth={true}
          margin={"normal"}
        />
        <Box className={"flex flex-row"}>
          <TextField
            label="Postal code"
            value={postalCode}
            onChange={handlePostalCodeChange}
            fullWidth={true}
            margin={"normal"}
            className={"!mr-2"}
          />
          <TextField
            label="City"
            value={city}
            onChange={handleCityChange}
            fullWidth={true}
            margin={"normal"}
            className={"!ml-2"}
          />
        </Box>
        <TextField
          label="Birth date"
          type="date"
          value={birthDate.toISOString().split("T")[0]}
          onChange={handleBirthDateChange}
          fullWidth={true}
          margin={"normal"}
        />
        <TextField
          label="Birth place"
          value={birthPlace}
          onChange={handleBirthPlaceChange}
          fullWidth={true}
          margin={"normal"}
        />
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
      </DialogContent>
    </Dialog>
  );
};

export default AddEditEmployee;
